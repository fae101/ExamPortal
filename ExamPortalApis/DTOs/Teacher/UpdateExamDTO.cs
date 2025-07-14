namespace ExamPortalApis.DTOs
{
    public class UpdateExamDTO
    {
        public string Title { get; set; }
        public int DurationMinutes { get; set; }
        public bool IsPublished { get; set; }

        public List<UpdateQuestionDTO> Questions { get; set; }
    }
}
