using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using E_CommerceWebsite.DAL.Data;
using E_CommerceWebsite.DAL.Data.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace E_CommerceWebsite.DAL.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly WebsiteContext _context;
        private readonly string _connectionString = "Server=LAPTOP-AK063TOT\\SQLEXPRESS;Database=E-commerceWebsite;Integrated Security=True;TrustServerCertificate=True;";
        public ProductRepository(WebsiteContext context)
        {
            _context = context;
        }

        // حذف منتج (Async)
        public async Task deleteAsync(Product product)
        {
            _context.Remove(product);
            await SaveChangesAsync(); 
        }

        public async Task<IQueryable<Product>> GetAllAsync()
        {
            return await Task.FromResult(_context.products.AsNoTracking()); 
        }


        public async Task<Product> GetByIdAsync(int id)
        {
            return await _context.products
                .Include(p => p.ApplicationUser) 
                .FirstOrDefaultAsync(p => p.ProductId == id);
        }
        public async Task insertAsync(Product product)
        {
            await _context.AddAsync(product);
            await SaveChangesAsync(); 
        }

     
        public async Task updateAsync(Product product)
        {
            _context.Update(product);  
            await SaveChangesAsync(); 
        }

        
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();  
        }
        
 

      
    }
}
