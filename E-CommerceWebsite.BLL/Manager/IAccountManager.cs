using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using E_CommerceWebsite.BLL.Dtos.AccountDto;
using Microsoft.AspNetCore.Http;

namespace E_CommerceWebsite.BLL.Manager
{
    public interface IAccountManager
    {
        Task<loginResponseDto> Login(LoginDto loginDto);
        Task<String> Register(RegisterDto registerDto);

        Task<IEnumerable<UserReadDto>> GetAllUsers();
        //Task<String> ForgotPassword(string email);
    }
}
