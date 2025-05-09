using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using E_CommerceWebsite.DAL.Data.Models;

namespace E_CommerceWebsite.DAL.Repository
{
    public interface IProductRepository
    {
        Task<IQueryable<Product>> GetAllAsync();  
        Task<Product> GetByIdAsync(int id);  
        Task insertAsync(Product product);  
        Task updateAsync(Product product); 
        Task deleteAsync(Product product); 
        Task SaveChangesAsync();
       
    }
}
