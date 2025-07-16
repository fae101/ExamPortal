  using ExamPortalApis.Models;
  using Microsoft.AspNetCore.Authorization;
  using Microsoft.AspNetCore.Identity;
  using Microsoft.AspNetCore.Mvc;
  using Microsoft.IdentityModel.Tokens;
  using System;
  using System.Data;
  using System.IdentityModel.Tokens.Jwt;
  using System.Security.Claims;
  using System.Text;
  using System.Threading.Tasks;
  using Microsoft.Extensions.Configuration;

  namespace ExamPortalApis.Controllers
  {
  [ApiController]
  [Route("api/[controller]")]
  public class AuthController : ControllerBase
  {
  private readonly UserManager<User> _userManager;
  private readonly IConfiguration _config;

  public AuthController(UserManager<User> userManager, IConfiguration config)
  {
    _userManager = userManager;
    _config = config;
  }

  [HttpPost("register")]
  public async Task<IActionResult> Register([FromBody] RegisterDTO dto)
  {
 
      if (!ModelState.IsValid)
      {
        var errors = ModelState.Values.SelectMany(v => v.Errors)
                                      .Select(e => e.ErrorMessage);
        return BadRequest(new { message = "Invalid input", errors });
      }

      var existingUser = await _userManager.FindByNameAsync(dto.Username);
    var existingEmail = await _userManager.FindByEmailAsync(dto.Email);

    if (existingUser != null)
      return BadRequest("Username is already taken.");

    if (existingEmail != null)
      return BadRequest("Email is already registered.");

    var role = string.IsNullOrEmpty(dto.Role) ||
                (dto.Role.ToLower() != "admin" && dto.Role.ToLower() != "student")
                ? "student"
                : dto.Role.ToLower();

    var user = new User
    {
      UserName = dto.Username,
      Email = dto.Email,
      MyUserName = dto.YourUserName,
      FullName = dto.FullName,
      CreatedAt = DateTime.UtcNow,
      Role = role
    };

    var result = await _userManager.CreateAsync(user, dto.Password);

    if (!result.Succeeded)
      return BadRequest(result.Errors);

    var token = GenerateJwtToken(user);

    var response = new UserResponseDTO
    {
      FullName = user.FullName,
      User_name = user.MyUserName,
      Email = user.Email,
      Password = "", // Avoid exposing password
      Role = user.Role,
      Token = token
    };

    return Ok(response);
  }

  [HttpPost("login")]
  public async Task<IActionResult> Login([FromBody] LoginDTO dto)
  {
    var user = await _userManager.FindByNameAsync(dto.Username);

    if (user == null || !await _userManager.CheckPasswordAsync(user, dto.Password))
      return Unauthorized("Invalid credentials.");

    var token = GenerateJwtToken(user);

    var response = new UserResponseDTO
    {
      FullName = user.FullName,
      User_name = user.MyUserName,
      Email = user.Email,
      Password = "", // Hide password
      Role = user.Role,
      Token = token
    };

    return Ok(response);
  }

  private string GenerateJwtToken(User user)
  {
    var jwtConfig = _config.GetSection("Jwt");
    var claims = new[]
    {
      new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
      new Claim(ClaimTypes.Name, user.MyUserName ?? user.UserName),
      new Claim(ClaimTypes.Role, user.Role ?? "student")
    };

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfig["Key"]));
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        issuer: jwtConfig["Issuer"],
        audience: jwtConfig["Audience"],
        claims: claims,
        expires: DateTime.UtcNow.AddHours(Convert.ToDouble(jwtConfig["ExpireHours"])),
        signingCredentials: creds);

    return new JwtSecurityTokenHandler().WriteToken(token);
  }

  //[Authorize(Roles = "admin")]
  //[HttpGet("admin-only")]
  //public IActionResult AdminAccess() => Ok("Welcome, Admin!");
  }
  }
