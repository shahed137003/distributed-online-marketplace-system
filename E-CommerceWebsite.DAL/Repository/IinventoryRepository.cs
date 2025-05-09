using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using E_CommerceWebsite.DAL.Data.Models;

namespace E_CommerceWebsite.DAL.Repository
{
    public interface IinventoryRepository
    {
        Task<IQueryable<Inventory>> GetAllAsync();  
        Task<Inventory> GetByIdAsync(int id);
        Task<Inventory> GetByUserIdAsync(string id);
        Task insertAsync(Inventory inventory);  
        Task updateAsync(Inventory inventory); 
        Task deleteAsync(Inventory inventory); 
        Task SaveChangesAsync();
       
    }
}
