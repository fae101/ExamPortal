using System.ComponentModel.DataAnnotations;

namespace ExamPortalApis.DTOs
{
    public class QuestionsDTO
    {
        public Guid Id { get; set; }

        public Guid? ExamId { get; set; }

        [Required]
        public string Text { get; set; }

        [Required]
    public List<string> Options { get; set; }
  }
}
