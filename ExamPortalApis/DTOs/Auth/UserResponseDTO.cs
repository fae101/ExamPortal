using System;

/// <summary>
/// Summary description for Class1
/// </summary>
public class UserResponseDTO
{
    public string FullName { get; set; }
    public string User_name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Role { get; set; } // Optional: default to "student"
    public string Token { get; set; }
}
