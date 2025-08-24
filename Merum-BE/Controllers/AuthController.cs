using Merum_BE.BL;
using Merum_BE.Data.Models;
using Merum_BE.DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Merum_BE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly ILogger<AuthController> _logger;
        private readonly AuthService _authService;

        public AuthController(ILogger<AuthController> logger, AuthService authService)
        {
            _logger = logger;
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            var userDTO = await _authService.LoginUserAsync(loginDTO);
            if (userDTO == null)
            {
                Response.StatusCode = 401;
                return Unauthorized("Hibás bejelentkezés");
            }
            var token = _authService.GenerateJwtToken(userDTO);
            return Ok(new
            {
                token,
                expiresIn = Convert.ToInt32(_authService.GetExpireMinutes() * 60),
                user = userDTO
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
        {
            var user = await _authService.RegisterUserAsync(registerDTO);
            if (user == null)
            {
                Response.StatusCode = 400;
                return BadRequest("Sikertelen regisztráció");
            }
            return Ok("Sikeres regisztráció");
        }
    }
}
