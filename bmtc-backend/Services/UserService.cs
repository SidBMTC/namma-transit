using bmtc_backend.DTOs;

namespace bmtc_backend.Services
{
    public class UserService : IUserService
    {
        public async Task<bool> RegisterUserAsync(RegisterRequest request)
        {
            // Database logic will come here later

            await Task.CompletedTask;

            return true;
        }
    }
}