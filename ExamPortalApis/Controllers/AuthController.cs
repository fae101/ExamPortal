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

namespace ExamPortalApis.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AuthController : ControllerBase
  {
    private readonly UserManager<User> _userManager;

    public AuthController(UserManager<User> userManager)
    {
      _userManager = userManager;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDTO dto)
    {
      // Basic input validation
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      // Check if username or email already exists
      var existingUser = await _userManager.FindByNameAsync(dto.Username);
      var existingEmail = await _userManager.FindByEmailAsync(dto.Email);

      if (existingUser != null)
        return BadRequest("Username is already taken.");

      if (existingEmail != null)
        return BadRequest("Email is already registered.");

      // Decide the role value before creating the user
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

      // Register user with hashed password
      var result = await _userManager.CreateAsync(user, dto.Password);

      if (!result.Succeeded)
        return BadRequest(result.Errors);

      // Success response
      return Ok(new
      {
        message = "User registered successfully.",
        userId = user.Id,
        username = user.MyUserName,
        role = user.Role
      });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO dto)
    {
      var user = await _userManager.FindByNameAsync(dto.Username);

      if (user == null || !await _userManager.CheckPasswordAsync(user, dto.Password))
        return Unauthorized("Invalid credentials.");

      var jwtConfig = new ConfigurationBuilder()
          .SetBasePath(AppContext.BaseDirectory)
          .AddJsonFile("appsettings.json")
          .Build()
          .GetSection("Jwt");

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

      return Ok(new
      {
        message = "Login successful",
        token = new JwtSecurityTokenHandler().WriteToken(token),
        expiresAt = token.ValidTo,
        role = user.Role,
        username = user.MyUserName
      });
    }

    //[Authorize(Roles = "admin")]
    //[HttpGet("admin-only")]
    //public IActionResult AdminAccess() => Ok("Welcome, Admin!");

  }
}
