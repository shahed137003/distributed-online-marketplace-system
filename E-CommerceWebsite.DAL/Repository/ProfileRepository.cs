using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using E_CommerceWebsite.DAL.Data;
using E_CommerceWebsite.DAL.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace E_CommerceWebsite.DAL.Repository
{
    public class ProfileRepository : IProfileRepository
    {
        private readonly WebsiteContext _context;

        public ProfileRepository(WebsiteContext context)
        {
            _context = context;
        }
        public async Task<ApplicationUser> GetProfileByUserId(string userId)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == userId);

            return user;
        }

        public async Task<IQueryable<ApplicationUser>> GetAllAsync()
        {
            var users = _context.Users
           .Include(u => u.Inventory) 
           .AsNoTracking();
            return users;
        }


        public async Task updateprofile(ApplicationUser user)
        {
            _context.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task deleteprofile(ApplicationUser user)
        {
            _context.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

    }
}
