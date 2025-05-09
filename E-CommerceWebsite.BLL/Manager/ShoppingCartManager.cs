using System.Security.Claims;
using E_CommerceWebsite.BLL.Dtos;
//using E_CommerceWebsite.BLL.Dtos.AddressDto;
using E_CommerceWebsite.DAL.Data.Models;
using E_CommerceWebsite.DAL.Repository;
using Microsoft.AspNetCore.Http;
namespace E_CommerceWebsite.BLL.Manager
{
    public class ShoppingCartManager : IShoppingCartManager
    {
        private readonly IShoppingCartRepository _shoppingcartrepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IProductRepository _productrepository;

        public ShoppingCartManager(IShoppingCartRepository shoppingcartrepository, IHttpContextAccessor httpContextAccessor, IProductRepository productrepository)
        {
            _shoppingcartrepository = shoppingcartrepository;
            _httpContextAccessor = httpContextAccessor;
            _productrepository = productrepository;
        }

        public async Task<ShoppingCartDto?> GetLoggedUserCartAsync()
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                throw new Exception("User not found");
            var cart = await _shoppingcartrepository.GetByUserIdAsync(userId);
            if (cart == null) throw new Exception("Cart not found");

            var CartItemDto = cart.CartItems.Select(a => new CartItemDto
            {
                ProductId = a.Product.ProductId,
                Title = a.Product.Title,
                Price = (decimal)(a.Product.Price ?? 0),
                Quantity = a.Quantity,
                ImageCover = a.Product.Image
            }).ToList();
            var ShoppingCartDto = new ShoppingCartDto
            {
                ShoppingCartId = cart.ShoppingCartId,
                UserId = userId,
                CreatedAt = cart.CreatedAt,
                NumberofItems = cart.NumberofItems,
                Items = CartItemDto,
                TotalPrice = (int)cart.CartItems.Sum(a => a.Quantity * (decimal)(a.Product.Price ?? 0)),
                Status = "success"
            };
            return ShoppingCartDto;
        }
        public async Task AddProductToCartAsync(int productId)
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                throw new Exception("User not found");

            var product = await _productrepository.GetByIdAsync(productId);
            if (product == null)
            {
                throw new Exception("Product not found");
            }

            await _shoppingcartrepository.AddProductToCartAsync(userId, product);


        }

        public async Task<ShoppingCartDto> UpdateProductQuantityAsync(int productId, int quantity)
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                throw new Exception("User not found");

            var product = await _productrepository.GetByIdAsync(productId);
            if (product == null)
            {
                throw new Exception("Product not found");
            }
            await _shoppingcartrepository.UpdateCartProductQuantityAsync(userId, product, quantity);

            var updatedCart = await GetLoggedUserCartAsync(); // get updated cart data
            return updatedCart;
        }

        public async Task RemoveProductFromCartAsync(int productId)
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                throw new Exception("User not found");
            await _shoppingcartrepository.RemoveSpecificCartItemAsync(userId, productId);
        }

        public async Task ClearCartAsync()
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                throw new Exception("User not found");
            await _shoppingcartrepository.ClearUserCartAsync(userId);
        }
    }
}