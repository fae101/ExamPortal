using ExamPortalApis.DTOs.Student;
using ExamPortalApis.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExamPortalApis.Controllers
{
  [Authorize(Roles = "Student")]
  [Route("api/[controller]")]
  [ApiController]
  public class StudentController : ControllerBase
  {
    private readonly ExamPortalDBContext db;

    public StudentController(ExamPortalDBContext db)
    {
      this.db = db;
    }

    [HttpGet("exams")]
    public IActionResult GetPublishedExams()
    {
      var exams = db.Exams
        .Where(e => e.IsPublished == true)
        .Select(e => new ExamOverviewDTO
        {
          Id = e.Id,
          Title = e.Title,
          Description = e.Description,
          DurationMinutes = (int)e.DurationMinutes
        })
        .ToList();

      return Ok(exams);
    }

    [HttpGet("exam/{id}")]
    public IActionResult GetExamDetails(Guid id)
    {
      var exam = db.Exams
        .Include(e => e.Questions)
        .FirstOrDefault(e => e.Id == id && e.IsPublished == true);

      if (exam == null)
        return NotFound(new { Message = "Exam not found or not published." });

      var examDto = new ExamDetailDTO
      {
        Id = exam.Id,
        Title = exam.Title,
        Description = exam.Description,
        DurationMinutes = exam.DurationMinutes,
        Questions = exam.Questions.Select(q => new QuestionDTO
        {
          Id = q.Id,
          Text = q.Text,
          Options = q.Options.Split(',').ToList()
        }).ToList()
      };

      return Ok(examDto);
    }

    [HttpPost("exam/{id}/submit")]
    public IActionResult SubmitAnswers(Guid id, [FromBody] SubmissionDTO submission)
    {
      var examExists = db.Exams.Any(e => e.Id == id && e.IsPublished == true);
      if (!examExists)
        return NotFound(new { Message = "Exam not found or not published." });

      var newSubmission = new Submission
      {
        Id = Guid.NewGuid(),
        ExamId = id,
        StudentId = submission.UserId,
        Answers = submission.Answers
          .Select(a => new Answer
          {
            QuestionId = a.Key,
            SelectedIndex = a.Value
          })
          .ToList(),
        SubmittedAt = DateTime.UtcNow
      };

      db.Submissions.Add(newSubmission);
      db.SaveChanges();

      return Ok(new
      {
        Message = "Submission recorded successfully.",
        SubmissionId = newSubmission.Id
      });
    }
  }
}
