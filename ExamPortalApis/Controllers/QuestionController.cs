using ExamPortalApis.DTOs;
using ExamPortalApis.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExamPortal.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class QuestionController : ControllerBase
  {
    private readonly ExamPortalDBContext db;

    public QuestionController(ExamPortalDBContext db)
    {
      this.db = db;
    }

    [HttpGet]
    public IActionResult GetAllQuestions()
    {
      var questions = db.Questions.ToList();
      return Ok(questions);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateQuestion(Guid id, UpdateQuestionDTO dto)
    {
      var q = db.Questions.Find(id);
      if (q == null)
        return NotFound();

      q.Text = dto.Text;
      q.Options = string.Join(",", dto.Options);
      q.CorrectIndex = dto.CorrectIndex;
      db.SaveChanges();
      return Ok(dto);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteQuestion(Guid id)
    {
      var q = db.Questions.Find(id);
      if (q == null)
      {
        return NotFound(new
        {
          Message = "Question not found.",
          QuestionId = id
        });
      }

      db.Questions.Remove(q);
      db.SaveChanges();

      return Ok(new
      {
        Message = "Question deleted successfully.",
        QuestionId = q.Id
      });
    }
  }
}
