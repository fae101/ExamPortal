using ExamPortalApis.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ExamPortalApis
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var builder = WebApplication.CreateBuilder(args);
      var configuration = builder.Configuration;

      // Add services to the container
      builder.Services.AddControllers();

      // Register DbContext for SQL Server
      builder.Services.AddDbContext<ExamPortalDBContext>(options =>
          options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
      //include identity and ef configuration
      builder.Services.AddIdentity<User, IdentityRole<Guid>>()
    .AddEntityFrameworkStores<ExamPortalDBContext>()
    .AddDefaultTokenProviders();

      // JWT Authentication Setup
      var jwtConfig = builder.Configuration.GetSection("Jwt");
      var key = jwtConfig["Key"];

      builder.Services.AddAuthentication(options =>
      {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      })
    .AddJwtBearer(options =>
    {
      options.TokenValidationParameters = new TokenValidationParameters
      {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtConfig["Issuer"],
        ValidAudience = jwtConfig["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
      };
    });

      // CORS Policy for Angular Frontend
      builder.Services.AddCors(options =>
      {
        options.AddPolicy("AllowAngularApp",
                  policy =>
                  {
                    policy.WithOrigins("http://localhost:4200")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                  });
      });

      // Swagger/OpenAPI Support
      builder.Services.AddEndpointsApiExplorer();
      builder.Services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
        {
          Title = "Exam Portal API",
          Version = "v1"
        });
      });

      var app = builder.Build();

      // Configure Middleware
      if (app.Environment.IsDevelopment())
      {
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
          c.SwaggerEndpoint("/swagger/v1/swagger.json", "Exam Portal API v1");
          c.RoutePrefix = "swagger";
        });
      }

      app.UseCors("AllowAngularApp");
      app.UseAuthentication();
      app.UseAuthorization();
      app.MapControllers();

      app.Run();
    }
  }
}
