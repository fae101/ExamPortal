using ExamPortalApis.DTOs;
using ExamPortalApis.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExamPortalApis.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class TeacherController : ControllerBase
  {
    ExamPortalDBContext db;
    public TeacherController(ExamPortalDBContext db)
    {
      this.db = db;
    }
 
      [HttpGet("students")]
      public IActionResult GetAllStudents()
      {
        var students = db.Users
            .Where(u => u.Role == "Student") // or role ID / enum
            .Select(u => new {
              u.Id,
              u.MyUserName,
              u.Email
            })
            .ToList();

        return Ok(students);
      }
    }
  }
