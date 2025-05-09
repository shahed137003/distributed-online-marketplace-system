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
    
    public class ProductController : Controller
    {
        private readonly IProductManager _ProductManager;

        public ProductController(IProductManager ProductManager)
        {
            _ProductManager = ProductManager;
        }

        //[Authorize]
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var products = await _ProductManager.GetAllAsync();
            return Ok(products);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var product = await _ProductManager.GetByIdAsync(id);

            return Ok(product);
        }

      //  [Authorize]
        [HttpPost]
        public async Task<ActionResult> Insert(  IFormFile file,[FromForm]ProductAddDto productaddDto)
        {
           
            try
            {
                await _ProductManager.InsertAsync( productaddDto, file);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return NoContent();
        }

        //[HttpPost("upload/{id}")]
        //public async Task<ActionResult> UploadImage(int id, IFormFile file)
        //{

        //}

        // Update product (Async)
        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, IFormFile file, [FromForm]ProductUpdateDto ProductUpdateDto)
        {
            if (id != ProductUpdateDto.ProductId)
                return BadRequest();

            await _ProductManager.UpdateAsync(ProductUpdateDto ,  file);
            return NoContent();
        }

        // Delete product (Async)
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _ProductManager.DeleteAsync(id);  // Use async method here
            return NoContent();
        }


    }
}