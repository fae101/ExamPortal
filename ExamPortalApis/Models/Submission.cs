using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ExamPortalApis.Models;

public partial class Submission
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("examId")]
    public Guid? ExamId { get; set; }

    [Column("studentId")]
    public Guid? StudentId { get; set; }

    [Column("submittedAt", TypeName = "datetime")]
    public DateTime? SubmittedAt { get; set; }

    [Column("result")]
    public double? Result { get; set; }

    [InverseProperty("Submission")]
    public virtual ICollection<Answer> Answers { get; set; } = new List<Answer>();

    [ForeignKey("ExamId")]
    [InverseProperty("Submissions")]
    public virtual Exam? Exam { get; set; }

    [ForeignKey("StudentId")]
    [InverseProperty("Submissions")]
    public virtual User? Student { get; set; }
}
