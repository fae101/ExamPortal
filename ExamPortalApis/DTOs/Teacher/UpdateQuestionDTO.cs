namespace ExamPortalApis.DTOs
{
    public class UpdateQuestionDTO
    {
        public string Text { get; set; }
    public List<string> Options { get; set; }
    public int CorrectIndex { get; set; }

    }
}
