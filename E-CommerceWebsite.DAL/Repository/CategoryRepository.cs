using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using E_CommerceWebsite.DAL.Data;
using E_CommerceWebsite.DAL.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace E_CommerceWebsite.DAL.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly WebsiteContext _context;

        public CategoryRepository(WebsiteContext context)
        {
            _context = context;
        }


        public async Task deleteAsync(Category categories)
        {
            _context.Remove(categories);
            await SaveChangesAsync();
        }

        public async Task<IQueryable<Category>> GetAllAsync()
        {
            return await Task.FromResult(_context.Categories.AsNoTracking());
        }


        public async Task<Category> GetByIdAsync(int id)
        {
            return await _context.Categories.FindAsync(id);


        }

        public async Task<Category> GetByNameAsync(String name)
        {
            return await _context.Categories.FirstOrDefaultAsync(c => c.CategoryName == name);


        }
        public async Task insertAsync(Category categories)
        {
            await _context.AddAsync(categories);
            await _context.SaveChangesAsync();
        }


        public async Task updateAsync(Category categories)
        {
            _context.Update(categories);
            await SaveChangesAsync();
        }


        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
