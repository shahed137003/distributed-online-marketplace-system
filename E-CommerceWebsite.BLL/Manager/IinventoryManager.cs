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
using static System.Net.Mime.MediaTypeNames;

namespace E_CommerceWebsite.BLL.Manager
{
    public interface IinventoryManager
    {
       Task <IEnumerable<InventoryReadDto>> GetAllAsync();
       Task<InventoryReadDto> GetByUserIdAsync(string id);
        Task UpdateAsync(InventoryReadDto inventory);
    }
}
