namespace ExamPortalApis.DTOs.Student
{
  public class ExamOverviewDTO
  {
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public int DurationMinutes { get; set; }
  }

}
