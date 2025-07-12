using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ExamPortalApis.Models;

public partial class Answer
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("submissionId")]
    public Guid? SubmissionId { get; set; }

    [Column("questionId")]
    public Guid? QuestionId { get; set; }

    [Column("selectedIndex")]
    public int SelectedIndex { get; set; }

    [ForeignKey("QuestionId")]
    [InverseProperty("Answers")]
    public virtual Question? Question { get; set; }

    [ForeignKey("SubmissionId")]
    [InverseProperty("Answers")]
    public virtual Submission? Submission { get; set; }
}
