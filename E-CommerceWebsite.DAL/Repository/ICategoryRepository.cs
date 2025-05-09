using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using E_CommerceWebsite.DAL.Data.Models;

namespace E_CommerceWebsite.DAL.Repository
{
    public interface ICategoryRepository
    {
        Task<IQueryable<Category>> GetAllAsync();
        Task<Category> GetByIdAsync(int id);
        Task<Category> GetByNameAsync(String name);
        Task insertAsync(Category Category);
        Task updateAsync(Category Category);
        Task deleteAsync(Category Category);
        Task SaveChangesAsync();
    }
}
