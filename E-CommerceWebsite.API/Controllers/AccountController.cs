
using E_CommerceWebsite.BLL.Dtos;
using E_CommerceWebsite.BLL.Dtos.AccountDto;
using E_CommerceWebsite.BLL.Manager;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace E_CommerceWebsite.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
          private readonly IAccountManager AccountManager;

        public AccountController(IAccountManager _AccountManager)
        {
            AccountManager = _AccountManager;
        }


        [HttpPost("Login")]
        public async Task<ActionResult> Login(LoginDto loginDto)
        {
            var result = await AccountManager.Login(loginDto);
        
            if (result == null)
            {
                return Unauthorized();
            }
            return Ok(result);
        }

        [HttpPost("Register")]
        public async Task<ActionResult> Register( RegisterDto RegisterDto)
        {
            var result = await AccountManager.Register(RegisterDto);
            if (result == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult> GetAllUsers()
        {
            var users = await AccountManager.GetAllUsers();
            if (users == null)
            {
                return BadRequest();
            }
            return Ok(users);
        }

        //[HttpGet("{}")]
        //public async Task<ActionResult> GetloggedInUser()
        //{
        //    var user = await AccountManager.GetUserById();
        //    if (user == null)
        //    {
        //        return BadRequest();
        //    }
        //    return Ok(user);
        //}

        //[HttpPut("ForgotPassword/{email}")]
        //public async Task<ActionResult> ForgotPassword(string email)
        //{
        //    var result = await AccountManager.ForgotPassword(email);
        //    if (result == null)
        //    {
        //        return BadRequest();
        //    }
        //    return Ok(result);
        //}
    }
}
