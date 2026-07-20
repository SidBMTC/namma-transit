using bmtc_backend.DTOs;

namespace bmtc_backend.Services
{
    public interface IUserService
    {
        Task<bool> RegisterUserAsync(RegisterRequest request);
        Task<LoginResponse> LoginAsync(LoginRequest request);
    }
}