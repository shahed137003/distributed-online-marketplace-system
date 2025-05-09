
using E_CommerceWebsite.DAL.Data.Models;
using E_CommerceWebsite.DAL.Data;
using Microsoft.EntityFrameworkCore;

namespace E_CommerceWebsite.DAL.Repository
{
    public class InventoryRepository : IinventoryRepository
    {
        private readonly WebsiteContext _context;

        public InventoryRepository(WebsiteContext context)
        {
            _context = context;
        }

        public async Task deleteAsync(Inventory inventory)
        {
            _context.Remove(inventory);
            await SaveChangesAsync();
        }

        public async Task<IQueryable<Inventory>> GetAllAsync()
        {
            return await Task.FromResult(_context.Inventories.AsNoTracking());
        }

        public async Task<Inventory> GetByUserIdAsync(string id)
        {
            return await _context.Inventories
                .Include(i => i.ApplicationUser)
                .Include(i => i.Products)
                    .ThenInclude(p => p.ApplicationUser)
                .FirstOrDefaultAsync(i => i.UserId == id);
        }

        public async Task<Inventory> GetByIdAsync(int id)
        {
            return await _context.Inventories.FirstOrDefaultAsync(i => i.InventoryId == id);
        }

        public async Task insertAsync(Inventory inventory)
        {
            await _context.AddAsync(inventory);
            await SaveChangesAsync();
        }

        public async Task updateAsync(Inventory inventory)
        {
            _context.Update(inventory);
            await SaveChangesAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
