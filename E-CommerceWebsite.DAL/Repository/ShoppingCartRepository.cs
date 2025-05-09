using E_CommerceWebsite.DAL.Data;
using E_CommerceWebsite.DAL.Data.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace E_CommerceWebsite.DAL.Repository
{
    public class ShoppingCartRepository(WebsiteContext context) : IShoppingCartRepository

    {
        private readonly WebsiteContext _context = context;
        public async Task<ShoppingCart?> GetByIdAsync(string CartId)
        {
            var x = await _context.ShoppingCart.FindAsync(CartId);
            if (x == null) return null;
            return x;
        }
        public async Task<ApplicationUser?> GetUserAsync(string CartId)
        {
            var x = await _context.ShoppingCart.FindAsync(CartId);
            if (x == null) return null!;
            var user = await _context.users.FindAsync(x.UserId);
            if (user == null) return null!;
            return user;
        }
        public async Task<ShoppingCart?> GetByUserIdAsync(string userId)
        {
            var cart = await _context.ShoppingCart
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart?.CartItems != null)
            {
                await _context.Entry(cart)
                    .Collection(c => c.CartItems!)
                    .Query()
                    .Include(ci => ci.Product)
                    .LoadAsync();
            }

            return cart;
        }

        public async Task CreateCartAsync(ShoppingCart cart)
        {
            await _context.ShoppingCart.AddAsync(cart);
            await SaveChangesAsync();
        }

        public async Task AddProductToCartAsync(string userId, Product product)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var cart = await GetByUserIdAsync(userId);
                if (cart == null)
                {
                    cart = new ShoppingCart
                    {
                        UserId = userId,
                        CreatedAt = DateTime.Now,
                        NumberofItems = 0,
                        CartItems = new List<CartItem>()
                    };
                   await _context.ShoppingCart.AddAsync(cart);
                }

                if (product.StockQuantity < 1)
                    throw new InvalidOperationException("Not enough stock");

                var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == product.ProductId);
                if (cartItem != null)
                {
                    cartItem.Quantity++;
                }
                else
                {
                    cart.CartItems.Add(new CartItem
                    {
                        ProductId = product.ProductId,
                        Quantity = 1
                    });
                }

                product.StockQuantity -= 1;
                cart.NumberofItems = cart.CartItems.Sum(ci => ci.Quantity);
                cart.UpdatedAt = DateTime.Now;
                cart.TotalPrice += product.Price ?? 0;

                //await _context.ShoppingCart.AddAsync(cart);
                await SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
        public async Task UpdateCartProductQuantityAsync(string userId, Product product, int newQuantity)
        {
            var cart = await GetByUserIdAsync(userId);
            if (cart == null) return;

            var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == product.ProductId);
            if (cartItem == null) return;

            int diff = newQuantity - cartItem.Quantity;

            if (product == null || (diff > 0 && product.StockQuantity < diff))
                throw new InvalidOperationException("Not enough stock");

            cartItem.Quantity = newQuantity;
            product.StockQuantity -= diff;
            cart.NumberofItems = cart.CartItems.Sum(ci => ci.Quantity);
            cart.UpdatedAt = DateTime.Now;
            cart.TotalPrice += (product.Price ?? 0) * diff;

            _context.ShoppingCart.Update(cart);
            await SaveChangesAsync();
        }


        public async Task RemoveSpecificCartItemAsync(string userId, int productId)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var cart = await GetByUserIdAsync(userId);
                if (cart == null) return;

                var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == productId);
                if (cartItem != null)
                {
                    var product = await _context.products.FindAsync(productId);
                    if (product != null)
                    {
                        product.StockQuantity += cartItem.Quantity;
                        cart.TotalPrice -= product.Price * cartItem.Quantity ?? 0;
                    }

                    _context.CartItems.Remove(cartItem);
                    cart.NumberofItems = cart.CartItems.Sum(ci => ci.Quantity);
                    cart.UpdatedAt = DateTime.Now;

                    _context.ShoppingCart.Update(cart);
                    await SaveChangesAsync();
                    await transaction.CommitAsync();
                }
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }


        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }


        public async Task ClearUserCartAsync(string userId)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var cart = await GetByUserIdAsync(userId);
                if (cart == null) return;

                foreach (var cartItem in cart.CartItems)
                {
                    var product = await _context.products.FindAsync(cartItem.ProductId);
                    if (product != null)
                        product.StockQuantity += cartItem.Quantity;
                }

                _context.CartItems.RemoveRange(cart.CartItems);
                cart.CartItems.Clear();
                cart.NumberofItems = 0;
                cart.UpdatedAt = DateTime.Now;
                cart.TotalPrice = 0;
                _context.ShoppingCart.Remove(cart);
                await SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }
}
