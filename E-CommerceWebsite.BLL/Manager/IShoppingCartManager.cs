using E_CommerceWebsite.BLL.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace E_CommerceWebsite.BLL.Manager
{
    public interface IShoppingCartManager
    {
        Task<ShoppingCartDto?> GetLoggedUserCartAsync();
        Task AddProductToCartAsync(int productId);
        Task<ShoppingCartDto> UpdateProductQuantityAsync(int productId, int quantity);
        Task RemoveProductFromCartAsync(int productId);
        Task ClearCartAsync();
    }
}