using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using E_CommerceWebsite.BLL.Dtos;
using E_CommerceWebsite.BLL.Dtos.AccountDto;
using E_CommerceWebsite.DAL.Data.Models;
using E_CommerceWebsite.DAL.Repository;
using Microsoft.AspNetCore.Http;

namespace E_CommerceWebsite.BLL.Manager
{

    public interface IProfileManager
    {
        Task<ProfileReadDto> GetByIdAsync(string id);
        Task<IEnumerable<ProfileReadDto>> GetAllProfilesAsync();
        Task UpdateAsync(ProfileUpdateDto profile ,IFormFile file);
        //Task DeleteAsync(int id);
    }
}