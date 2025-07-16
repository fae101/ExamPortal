using ExamPortalApis.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExamPortalApis.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class SubmissionController : ControllerBase
  {
    private readonly ExamPortalDBContext db;

    public SubmissionController(ExamPortalDBContext db)
    {
      this.db = db;
    }

    // GET: /api/submissions/user/{userId}
    [Authorize]
    [HttpGet("user/{userId}")]
    public IActionResult GetUserSubmissions(Guid userId)
    {
      var submissions = db.Submissions
        .Where(s => s.StudentId == userId)
        .Select(s => new
        {
          s.Id,
          s.ExamId,
          s.SubmittedAt,
          s.Result
        })
        .ToList();

      return Ok(submissions);
    }

    // GET: /api/submissions/exam/{examId}
    [Authorize]
    [HttpGet("exam/{examId}")]
    public IActionResult GetExamSubmissions(Guid examId)
    {
      var submissions = db.Submissions
        .Include(s => s.Student)
        .Where(s => s.ExamId == examId)
        .Select(s => new
        {
          SubmissionId = s.Id,
          StudentId = s.StudentId,
          StudentName = s.Student.MyUserName,
          SubmittedAt = s.SubmittedAt,
          Answers = s.Answers.Select(a => new
          {
            QuestionId = a.QuestionId,
            SelectedIndex = a.SelectedIndex
          }),
          s.Result
        })
        .ToList();

      return Ok(submissions);
    }
  }
}
