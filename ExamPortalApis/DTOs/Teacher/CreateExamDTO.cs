namespace ExamPortalApis.DTOs
{
    public class CreateExamDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int DurationMinutes { get; set; }
        public bool IsPublished { get; set; }

        public List<CreateQuestionDTO> Questions { get; set; } 

    }
}
