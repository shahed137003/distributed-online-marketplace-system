using E_CommerceWebsite.DAL.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace E_CommerceWebsite.DAL.Repository
{
    public interface IShoppingCartRepository
    {
        Task<ShoppingCart?> GetByIdAsync(string CartId);
      //  Task<ApplicationUser?> GetUserAsync(string CartId);
        Task<ShoppingCart?> GetByUserIdAsync(string userId);
        Task AddProductToCartAsync(string userId, Product product);
        Task UpdateCartProductQuantityAsync(string userId, Product product, int newQuantity);
        Task RemoveSpecificCartItemAsync(string userId, int productId);
        Task ClearUserCartAsync(string userId);
        Task CreateCartAsync(ShoppingCart cart);
        Task SaveChangesAsync();

    }
}