using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ExamPortalApis.Models;

public partial class Question
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("examId")]
    public Guid? ExamId { get; set; }

    [Column("text")]
    public string Text { get; set; } = null!;

    [Column("options")]
    public string Options { get; set; } = null!;

    [Column("correctIndex")]
    public int CorrectIndex { get; set; }

    [InverseProperty("Question")]
    public virtual ICollection<Answer> Answers { get; set; } = new List<Answer>();

    [ForeignKey("ExamId")]
    [InverseProperty("Questions")]
    public virtual Exam? Exam { get; set; }
}
