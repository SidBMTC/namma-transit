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
        private readonly PasswordHasher<User> _passwordHasher = new();
        public UserService(ApplicationDbContext context)
        {
            _context = context;
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
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == request.Email);

            if (existingUser != null)
            {
                return false;
            }
            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}