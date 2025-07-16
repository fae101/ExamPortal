using System;
using System.ComponentModel.DataAnnotations;

/// <summary>
/// Summary description for Class1
/// </summary>
public class RegisterDTO
{
  [Required]
  public string Username { get; set; }
  [Required]
  public string YourUserName { get; set; }
  public string Email { get; set; }
  public string FullName { get; set; }
  public string Password { get; set; }
  public string Role { get; set; }
}
