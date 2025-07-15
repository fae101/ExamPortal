namespace ExamPortalApis.DTOs.Student
{
  public class SubmissionDTO
  {
    public Guid UserId { get; set; }

    public Guid ExamId { get; set; }

    public Dictionary<Guid, int> Answers{ get; set; }
    // Guid = Question ID, int = Selected Index
  }
}
