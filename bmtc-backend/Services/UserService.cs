using bmtc_backend.Data;
using bmtc_backend.DTOs;
using bmtc_backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace bmtc_backend.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly ITokenService _tokenService;
        private readonly PasswordHasher<User> _passwordHasher = new();
        public UserService(ApplicationDbContext context,ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        public async Task<bool> RegisterUserAsync(RegisterRequest request)
        {
            var user = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                PasswordHash = _passwordHasher.HashPassword(null!, request.Password)
            };
            var existingUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == request.Email);

            if (existingUser != null)
            {
                return false;
            }
            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return true;
        }
        public async Task<LoginResponse> LoginAsync(LoginRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                return new LoginResponse
                {
                    Message = "Invalid email or password."
                };
            }
            var passwordHasher = new PasswordHasher<User>();
            var result = passwordHasher.VerifyHashedPassword(
                user,
                user.PasswordHash,
                request.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                return new LoginResponse
                {
                    Message = "Invalid email or password."
                };
            }
            var token = _tokenService.CreateToken(user);
            return new LoginResponse
            {
                Message = "Login Successful",
                Token = token
            };
        }
    }
}