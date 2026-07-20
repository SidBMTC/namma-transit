using Microsoft.AspNetCore.Mvc;
using bmtc_backend.DTOs;
using bmtc_backend.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace bmtc_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            var result = await _userService.RegisterUserAsync(request);

            if (result)
            {
                return Ok(new
                {
                    Message = "User Registered Successfully"
                });
            }

            return BadRequest(new
            {
                Message = "Email already exists."
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var result = await _userService.LoginAsync(request);

            if (result.Message == "Login Successful")
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
        
        [Authorize]
        [HttpGet("profile")]
        public IActionResult GetProfile()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            var name = User.FindFirst(ClaimTypes.Name)?.Value;

            return Ok(new
            {
                UserId = userId,
                Email = email,
                Name = name
            });
        }
    }
}