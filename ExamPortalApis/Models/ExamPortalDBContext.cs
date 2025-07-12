using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ExamPortalApis.Models;

public partial class ExamPortalDBContext : DbContext
{
    public ExamPortalDBContext()
    {
    }

    public ExamPortalDBContext(DbContextOptions<ExamPortalDBContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Answer> Answers { get; set; }

    public virtual DbSet<Exam> Exams { get; set; }

    public virtual DbSet<Question> Questions { get; set; }

    public virtual DbSet<Submission> Submissions { get; set; }

    public virtual DbSet<User> Users { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Answer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Answers__3213E83FFF231609");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

            entity.HasOne(d => d.Question).WithMany(p => p.Answers)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Answers__questio__75A278F5");

            entity.HasOne(d => d.Submission).WithMany(p => p.Answers)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Answers__submiss__74AE54BC");
        });

        modelBuilder.Entity<Exam>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Exams__3213E83F130B1F63");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.IsPublished).HasDefaultValue(false);

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.Exams)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Exams__createdBy__52593CB8");
        });

        modelBuilder.Entity<Question>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Question__3213E83F16DEE060");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

            entity.HasOne(d => d.Exam).WithMany(p => p.Questions)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Questions__examI__5629CD9C");
        });

        modelBuilder.Entity<Submission>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Submissi__3213E83F9F10949F");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.SubmittedAt).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.Exam).WithMany(p => p.Submissions).HasConstraintName("FK__Submissio__examI__6EF57B66");

            entity.HasOne(d => d.Student).WithMany(p => p.Submissions).HasConstraintName("FK__Submissio__stude__6FE99F9F");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3213E83FBEB37B39");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.AccessFailedCount).HasDefaultValue(0);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.EmailConfirmed).HasDefaultValue(false);
            entity.Property(e => e.LockoutEnabled).HasDefaultValue(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
