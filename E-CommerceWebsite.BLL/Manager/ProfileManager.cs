using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using E_CommerceWebsite.BLL.Dtos;
using E_CommerceWebsite.BLL.Dtos.AccountDto;
using E_CommerceWebsite.DAL.Data.Models;
using E_CommerceWebsite.DAL.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace E_CommerceWebsite.BLL.Manager
{
    public class ProfileManager : IProfileManager
    {
        private readonly IProfileRepository profilerepository;
        private readonly Microsoft.AspNetCore.Http.IHttpContextAccessor _httpContextAccessor;
        private readonly IinventoryManager InventoryManager;

        public ProfileManager(IProfileRepository _profileRepository, IHttpContextAccessor httpContextAccessor, IinventoryManager _InventoryManager)
        {
            profilerepository = _profileRepository;
            _httpContextAccessor = httpContextAccessor;
            InventoryManager = _InventoryManager;

        }

        public async Task<ProfileReadDto> GetByIdAsync(string id)
        {
            var user = await profilerepository.GetProfileByUserId(id);
            if (user != null)
            {
                var profileDto = new ProfileReadDto
                {
                    UserName = user.UserName,
                    OwnerImage = user.OwnerImage,
                    Bio = user.Bio,
                    PhoneNumber = user.PhoneNumber,
                    Facebook = user.Facebook,
                    Discord = user.Discord,
                    Twitter = user.Twitter
                };
                return profileDto;
            }
 
            return null;
        }



        public async Task<IEnumerable<ProfileReadDto>> GetAllProfilesAsync()
        {
            var users = (await profilerepository.GetAllAsync()).ToList();
            var profiles = new List<ProfileReadDto>();

            foreach (var user in users)
            {
                var inventoryDto = await InventoryManager.GetByUserIdAsync(user.Id);

                var profile = new ProfileReadDto
                {
                    UserName = user.UserName,
                    OwnerImage = user.OwnerImage,
                    Bio = user.Bio,
                    PhoneNumber = user.PhoneNumber,
                    Inventory = inventoryDto,
                    Facebook = user.Facebook,
                    Discord = user.Discord,
                    Twitter = user.Twitter
                };

                profiles.Add(profile);
            }

            return profiles;
        }




        public async Task UpdateAsync(ProfileUpdateDto profile , IFormFile file)
        {

            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                throw new Exception("User not found");
            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            Directory.CreateDirectory(folderPath);

            var uniqueFileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
            var filePath = Path.Combine(folderPath, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var baseUrl = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}";
            var imageUrl = $"{baseUrl}/uploads/{uniqueFileName}";


            var userinfo = await profilerepository.GetProfileByUserId(userId);
            if (userinfo != null)
            {
                userinfo.Bio = profile.Bio;
                userinfo.PhoneNumber = profile.PhoneNumber;
                userinfo.UserName = profile.UserName;
                userinfo.OwnerImage = imageUrl;
                userinfo.Facebook = profile.Facebook;
                userinfo.Discord = profile.Discord;
                userinfo.Twitter = profile.Twitter;
            }
            await profilerepository.updateprofile(userinfo);
                await profilerepository.SaveChangesAsync();
            
        }

     

   



        //public async Task<CategoryReadDto> GetByIdAsync(int id)
        //{
        //    var CategoryModel = await _categoryrepository.GetByIdAsync(id);
        //    if (CategoryModel != null)
        //    {
        //        var CategoryDto = new CategoryReadDto
        //        {
        //            CategoryId = CategoryModel.CategoryId,
        //            CategoryName = CategoryModel.CategoryName,

        //        };

        //        return CategoryDto;
        //    }

        //    return null;
        //}
    }
}
