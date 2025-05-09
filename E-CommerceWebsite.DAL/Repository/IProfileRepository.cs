using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using E_CommerceWebsite.DAL.Data;
using E_CommerceWebsite.DAL.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace E_CommerceWebsite.DAL.Repository
{
    public interface  IProfileRepository
    {
        //Task Createprofile(ApplicationUser user);
        Task<IQueryable<ApplicationUser>> GetAllAsync();
        Task<ApplicationUser> GetProfileByUserId(string userId);
        Task updateprofile(ApplicationUser user);
        Task deleteprofile(ApplicationUser user);
        Task SaveChangesAsync();

    }
}
