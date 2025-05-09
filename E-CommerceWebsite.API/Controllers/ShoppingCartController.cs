using E_CommerceWebsite.BLL.Dtos;
using E_CommerceWebsite.BLL.Manager;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace E_CommerceWebsite.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingCartController : ControllerBase
    {
        private readonly IShoppingCartManager _shoppingCartManager;

        public ShoppingCartController(IShoppingCartManager shoppingCartManager)
        {
            _shoppingCartManager = shoppingCartManager;
        }

        [HttpGet("user")]
        public async Task<ActionResult> GetLoggedUserCart()
        {
            var cart = await _shoppingCartManager.GetLoggedUserCartAsync();
            if (cart == null)
            {
                return NotFound("Cart not found.");
            }
            return Ok(cart);
        }

        [HttpPost("product")]
        public async Task<ActionResult> AddProductToCart()
        {
            try
            {
                var productIdHeader = HttpContext.Request.Headers["productId"];
                if (int.TryParse(productIdHeader, out int productId))
                {
                    await _shoppingCartManager.AddProductToCartAsync(productId);
                    return Ok();
                }
                return NoContent();

            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("product")]
        public async Task<ActionResult> UpdateProductQuantity( )
        {
            try
            {
                var QuantityHeader = HttpContext.Request.Headers["quantity"];
                var productIdHeader = HttpContext.Request.Headers["productId"];

                if (int.TryParse(QuantityHeader, out int quantity)&& (int.TryParse(productIdHeader, out int productId)))
                {
                    await _shoppingCartManager.UpdateProductQuantityAsync(productId, quantity);
                    return Ok();
                }
                return Ok();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("product/{productId}")]
        public async Task<ActionResult> RemoveProductFromCart(int productId)
        {
            try
            {
                await _shoppingCartManager.RemoveProductFromCartAsync( productId);
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("user/clear")]
        public async Task<ActionResult> ClearCart()
        {
            await _shoppingCartManager.ClearCartAsync();
            return NoContent();
        }
    }
}
