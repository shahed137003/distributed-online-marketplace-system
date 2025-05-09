using E_CommerceWebsite.BLL.Dtos;
using E_CommerceWebsite.BLL.Dtos.AccountDto;
using E_CommerceWebsite.BLL.Manager;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace E_CommerceWebsite.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : Controller
    {
        private readonly IinventoryManager InventoryManager;

        public InventoryController(IinventoryManager _InventoryManager)
        {
            InventoryManager = _InventoryManager;
        }


        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var inventories = await InventoryManager.GetAllAsync();
            return Ok(inventories);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult> GetByUserId(string id)
        {
            var inventory = await InventoryManager.GetByUserIdAsync(id);
            return Ok(inventory);
        }


        //[HttpPost]
        //public async Task<ActionResult> Insert(CategoryAddDto categoriesaddDto)
        //{
        //    await _CategoryManager.InsertAsync(categoriesaddDto);
        //    return NoContent();
        //}

        
        //[HttpPut("{id}")]
        //public async Task<ActionResult> Update(int id, CategoryUpdateDto categoryUpdateDto)
        //{
        //    if (id != categoryUpdateDto.CategoryId)
        //        return BadRequest();

        //    await _CategoryManager.UpdateAsync(categoryUpdateDto);
        //    return NoContent();
        //}

        
        //[HttpDelete("{id}")]
        //public async Task<ActionResult> Delete(int id)
        //{
        //    await _CategoryManager.DeleteAsync(id);  
        //    return NoContent();
        //}


    }
}
