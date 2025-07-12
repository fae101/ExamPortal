namespace ExamPortalApis.DTOs.Student
{
  public class SubmissionDTO
  {
    public Guid ExamId { get; set; }
    public string AnswersJson { get; set; } // Store answers as a serialized JSON blob
  }

}
