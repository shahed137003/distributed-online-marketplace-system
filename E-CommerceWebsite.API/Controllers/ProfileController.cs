using E_CommerceWebsite.BLL.Dtos;
using E_CommerceWebsite.BLL.Dtos.AccountDto;
using E_CommerceWebsite.BLL.Manager;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace E_CommerceWebsite.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class ProfileController : Controller
    {
        private readonly IProfileManager ProfileManager;

        public ProfileController(IProfileManager _ProfileManager)
        {
            ProfileManager = _ProfileManager;
        }

        //[Authorize]
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var profiles = await ProfileManager.GetAllProfilesAsync();
            return Ok(profiles);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(string id)
        {
            var profile = await ProfileManager.GetByIdAsync(id);

            return Ok(profile);
        }

    
       
        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> Update( IFormFile file, [FromForm]ProfileUpdateDto profile)
        {
            await ProfileManager.UpdateAsync(profile,  file);
            return NoContent();
        }


        //[HttpDelete("{id}")]
        //public async Task<ActionResult> Delete(int id)
        //{
        //    await _ProductManager.DeleteAsync(id);  // Use async method here
        //    return NoContent();
        //}


    }
}