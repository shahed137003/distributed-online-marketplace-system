using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using E_CommerceWebsite.BLL.Dtos.AccountDto;
using E_CommerceWebsite.DAL.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Win32;
using static System.Net.Mime.MediaTypeNames;

namespace E_CommerceWebsite.BLL.Manager
{
    public class AccountManager : IAccountManager
    {
        private readonly UserManager<ApplicationUser> usermanager;
        private readonly IConfiguration Config;
        private readonly IHttpContextAccessor _httpContextAccessor;


        public AccountManager(UserManager<ApplicationUser> _usermanager, IConfiguration _config, IHttpContextAccessor httpContextAccessor)
        {
            usermanager = _usermanager;
            Config = _config;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<loginResponseDto> Login(LoginDto loginDto)
        {
            var user = await usermanager.FindByEmailAsync(loginDto.Email);
            if (user == null)
            {
                return null;
            }
            var check = await usermanager.CheckPasswordAsync(user, loginDto.Password);

            if (check == false)
                return null;

            var claims = await usermanager.GetClaimsAsync(user);
            var token = GenerateToken(claims);


            return new loginResponseDto
            {
                token = token,
                UserId = user.Id
            };
           
        }

        public async Task<string> Register(RegisterDto RegisterDto)
        {
            ApplicationUser applicationUser = new ApplicationUser();

            applicationUser.UserName = RegisterDto.Name;
            applicationUser.Email = RegisterDto.Email;
            applicationUser.PhoneNumber = RegisterDto.PhoneNumber;
          
            var Identity = await usermanager.CreateAsync(applicationUser, RegisterDto.Password);

            if (Identity.Succeeded)
            {
                List<Claim> claims = new List<Claim>
                {  new Claim(ClaimTypes.NameIdentifier, applicationUser.Id),
                    new Claim(ClaimTypes.Name, RegisterDto.Name),
                    new Claim(ClaimTypes.Email, RegisterDto.Email),
                    new Claim(ClaimTypes.MobilePhone, RegisterDto.PhoneNumber)

                };
                await usermanager.AddClaimsAsync(applicationUser, claims);

                var token = GenerateToken(claims);
                return token;
            }
            return null;
        }


        public async Task<IEnumerable<UserReadDto>> GetAllUsers()
        {
            var users = await usermanager.Users.ToListAsync();
            var usersDto = users.Select(a => new UserReadDto
            {

                Name = a.UserName,
               // Email = a.Email,
               // phoneNumber = a.PhoneNumber,
               // UserImage = a.OwnerImage,  
               // list of products in inventory of each user

            }).ToList();
            return usersDto;

        } 
        public String GenerateToken(IList<Claim> claims)
        {
            string SecretKeyString = Config.GetSection("SecretKey").Value;
            var secretKeyByte = Encoding.UTF8.GetBytes(SecretKeyString);
            SecurityKey securityKey = new SymmetricSecurityKey(secretKeyByte);
            SigningCredentials signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var Expiration = DateTime.UtcNow.AddDays(2);
            JwtSecurityToken jwtSecurityToken = new JwtSecurityToken(
               claims: claims,
               expires: Expiration,
                signingCredentials: signingCredentials
            );

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            var Token = tokenHandler.WriteToken(jwtSecurityToken);
            return Token;
        }





        //public async Task<String> ForgotPassword(string email)
        //{
        //    var user = await usermanager.FindByEmailAsync(email);
        //    if (user == null)
        //        return null;
        //    var token = await usermanager.GeneratePasswordResetTokenAsync(user);
        //    var passwordResetLink = $"{Config["ClientUrl"]}/reset-password?token={token}&email={email}";
        //    return passwordResetLink;

        //}

        // public async Task<String> VerifyResetCode 

        //public async Task<UserReadDto> GetLoggedInUserByID()
        //{
        //    var users = await usermanager.Users.ToListAsync();
        //    var usersDto = users.Select(a => new UserReadDto
        //    {

        //        Name = a.UserName,
        //        Email = a.Email,
        //        phoneNumber = a.PhoneNumber

        //    }).ToList();
        //    return usersDto;

        //}

    }
}
