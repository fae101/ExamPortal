using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ExamPortalApis.Models;

public partial class Exam
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("title")]
    [StringLength(100)]
    public string Title { get; set; } = null!;

    [Column("description")]
    public string? Description { get; set; }

    [Column("durationMinutes")]
    public int? DurationMinutes { get; set; }

    [Column("isPublished")]
    public bool? IsPublished { get; set; }

    [Column("createdBy")]
    public Guid? CreatedBy { get; set; }

    [ForeignKey("CreatedBy")]
    [InverseProperty("Exams")]
    public virtual User? CreatedByNavigation { get; set; }

    [InverseProperty("Exam")]
    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();

    [InverseProperty("Exam")]
    public virtual ICollection<Submission> Submissions { get; set; } = new List<Submission>();
}
