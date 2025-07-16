using ExamPortalApis.DTOs;
using ExamPortalApis.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExamPortalApis.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class ExamController : ControllerBase
  {
    private readonly ExamPortalDBContext db;

    public ExamController(ExamPortalDBContext db)
    {
      this.db = db;
    }

    [HttpGet]
    public IActionResult getAll()
    {
      var exams = db.Exams.ToList();
      return Ok(exams);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(Guid id)
    {
      var x = db.Exams
          .Include(e => e.Questions)
          .FirstOrDefault(e => e.Id == id);

      if (x == null || !x.IsPublished == true)
        return NotFound();

      var examDto = new ExamDto()
      {
        Id = x.Id,
        Title = x.Title,
        DurationMinutes = x.DurationMinutes,
        Questions = x.Questions.Select(q => new QuestionsDTO
        {
          Id = q.Id,
          ExamId = q.ExamId,
          Text = q.Text,
          Options = q.Options.Split(',').ToList()
        }).ToList()
      };

      return Ok(examDto);
    }

    [HttpPut]
    public IActionResult updateExam(Guid id, UpdateExamDTO dto)
    {
      var x = db.Exams.Find(id);
      if (x == null)
        return NotFound();

      x.Title = dto.Title;
      x.DurationMinutes = dto.DurationMinutes;
      x.IsPublished = dto.IsPublished;
      db.SaveChanges();
      return Ok(dto);
    }

    [HttpDelete("{id}")]
    public IActionResult deleteExam(Guid id)
    {
      var x = db.Exams.Find(id);
      if (x == null)
        return NotFound();

      db.Exams.Remove(x);
      db.SaveChanges();
      return Ok(x);
    }

    [HttpPost]
    public IActionResult AddExam(CreateExamDTO dto)
    {
      var exam = new Exam
      {
        Title = dto.Title,
        Description = dto.Description,
        DurationMinutes = dto.DurationMinutes,
        IsPublished = dto.IsPublished,
        Questions = dto.Questions.Select(q => new Question
        {
          Text = q.Text,
          Options = string.Join(",", q.Options),
          CorrectIndex = q.CorrectIndex
        }).ToList()
      };

      db.Exams.Add(exam);
      db.SaveChanges();
      return Ok(dto);
    }
  }
}
