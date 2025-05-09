using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using E_CommerceWebsite.BLL.Dtos;
using E_CommerceWebsite.DAL.Data.Models;
using E_CommerceWebsite.DAL.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using static System.Net.Mime.MediaTypeNames;

namespace E_CommerceWebsite.BLL.Manager
{
    public class InventoryManager : IinventoryManager
    {
        private readonly IProductRepository _productrepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<ApplicationUser> usermanager;
        private readonly IinventoryRepository InventoryRepository;

        public InventoryManager(IProductRepository productrepository, IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> _usermanager , ICategoryRepository _categoryRepository, IinventoryRepository _InventoryRepository)
        {
            _productrepository = productrepository;
            _httpContextAccessor = httpContextAccessor;
            usermanager = _usermanager;
     
            InventoryRepository = _InventoryRepository;
        }

       
        //public async Task DeleteAsync(int Id)
        //{
        //    var productmodel = await _productrepository.GetByIdAsync(Id);  
        //    if (productmodel != null)
        //    {
        //        await _productrepository.deleteAsync(productmodel); 
        //        await _productrepository.SaveChangesAsync();  
        //    }
        //}

    
        public async Task<IEnumerable<InventoryReadDto>> GetAllAsync()
        {
            var Inventories = await InventoryRepository.GetAllAsync(); 
            var productDto = Inventories.Select(a => new InventoryReadDto
            {
                InventoryId = a.InventoryId,
                UserName=a.ApplicationUser.UserName,
                StockQuantity = a.StockQuantity,

                Products = a.Products.Select(p => new ProductReadDto
                {
                    _Id = p.ProductId,
                    Title = p.Title,
                    StockQuantity = p.StockQuantity,
                    Price = p.Price,
                    ProductDescription = p.ProductDescription,
                    Image = p.Image,
                    OwnerImage = p.ApplicationUser.OwnerImage,
                    name = p.ApplicationUser.UserName

                }).ToList()
            }).ToList();
            return productDto;
        }
                          
        public async Task<InventoryReadDto> GetByUserIdAsync(string id)
        {        
            var inventory = await InventoryRepository.GetByUserIdAsync(id);  
            if (inventory != null)
            {
                var inventoryDto = new InventoryReadDto
                {
                   
                    InventoryId = inventory.InventoryId,
                    UserName = inventory.ApplicationUser.UserName,
                    StockQuantity = inventory.StockQuantity,
                    Products = inventory.Products.Select(p => new ProductReadDto
                    {
                        _Id = p.ProductId,
                        Title = p.Title,
                        StockQuantity = p.StockQuantity,
                        Price = p.Price,
                        ProductDescription = p.ProductDescription,
                        Image = p.Image,
                        OwnerImage = p.ApplicationUser?.OwnerImage,
                        name = p.ApplicationUser.UserName
                    }).ToList()

                };

                return inventoryDto;
            }

            return null;
        }

        public async Task UpdateAsync(InventoryReadDto inventory)
        {
            var inventorymodel = await InventoryRepository.GetByIdAsync(inventory.InventoryId);
            if (inventorymodel != null)
            {
                inventorymodel.StockQuantity = inventory.StockQuantity;
                await InventoryRepository.updateAsync(inventorymodel);
                await InventoryRepository.SaveChangesAsync();
            }
        }

        //public async Task ItemsTobeSold




    }
}
