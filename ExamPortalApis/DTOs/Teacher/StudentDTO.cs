namespace ExamPortalApis.DTOs.Teacher
{
  public class StudentDTO
  {
    public Guid Id { get; set; }
    public string MyUserName { get; set; }
    public string Email { get; set; }
    public DateTime CreatedAt { get; set; } // Optional
  }

}
