using E_CommerceWebsite.BLL.Dtos;
using E_CommerceWebsite.BLL.Dtos.AccountDto;
using E_CommerceWebsite.BLL.Manager;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace E_CommerceWebsite.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : Controller
    {
        private readonly ICategoryManager _CategoryManager;

        public CategoryController(ICategoryManager CategoriesManager)
        {
            _CategoryManager = CategoriesManager;
        }


        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var categories = await _CategoryManager.GetAllAsync();
            return Ok(categories);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var categories = await _CategoryManager.GetByIdAsync(id);
            return Ok(categories);
        }


        [HttpPost]
        public async Task<ActionResult> Insert(CategoryAddDto categoriesaddDto)
        {
            await _CategoryManager.InsertAsync(categoriesaddDto);
            return NoContent();
        }

        
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, CategoryUpdateDto categoryUpdateDto)
        {
            if (id != categoryUpdateDto.CategoryId)
                return BadRequest();

            await _CategoryManager.UpdateAsync(categoryUpdateDto);
            return NoContent();
        }

        
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _CategoryManager.DeleteAsync(id);  
            return NoContent();
        }


    }
}
