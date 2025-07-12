using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExamPortalApis.Models;

[Index("Email", Name = "UQ__Users__AB6E6164A1A75397", IsUnique = true)]
public partial class User : IdentityUser<Guid>
{
  [Column("fullName")]
  [StringLength(100)]
  public string? FullName { get; set; }

  [Column("role")]
  [StringLength(10)]
  public string? Role { get; set; }

  [Column("createdAt", TypeName = "datetime")]
  public DateTime? CreatedAt { get; set; }

  [Column("my_user_name")]
  [StringLength(50)]
  public string? MyUserName { get; set; }

  [InverseProperty("CreatedByNavigation")]
  public virtual ICollection<Exam> Exams { get; set; } = new List<Exam>();

  [InverseProperty("Student")]
  public virtual ICollection<Submission> Submissions { get; set; } = new List<Submission>();
}

