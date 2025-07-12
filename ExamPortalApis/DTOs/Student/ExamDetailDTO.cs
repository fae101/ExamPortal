namespace ExamPortalApis.DTOs.Student
{
  public class ExamDetailDTO
  {
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public int DurationMinutes { get; set; }
    public List<QuestionDTO> Questions { get; set; }
  }

}
