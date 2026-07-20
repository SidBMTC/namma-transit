using bmtc_backend.Models;

namespace bmtc_backend.Services
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}