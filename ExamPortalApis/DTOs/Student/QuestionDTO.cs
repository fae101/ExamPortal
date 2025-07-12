namespace ExamPortalApis.DTOs.Student
{
  public class QuestionDTO
  {
    public Guid Id { get; set; }
    public string Text { get; set; }
    public List<string> Options { get; set; }
  }

}
