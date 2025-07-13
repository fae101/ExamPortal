namespace ExamPortalApis.DTOs
{
    public class CreateQuestionDTO
    {
        public string Text { get; set; }
        public List<string> Options { get; set; }
        public int CorrectIndex { get; set; }

    }
}
