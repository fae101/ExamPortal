using System.ComponentModel.DataAnnotations;

namespace ExamPortalApis.DTOs
{
    public class ExamDto
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }
        public int? DurationMinutes { get; set; }
        public  List<QuestionsDTO> Questions { get; set; }

    }
}
