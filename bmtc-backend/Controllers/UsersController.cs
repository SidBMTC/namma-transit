using Microsoft.AspNetCore.Mvc;
using bmtc_backend.DTOs;
using bmtc_backend.Services;

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

            return BadRequest();
        }
    }
}