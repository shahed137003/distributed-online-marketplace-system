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
    public class ProductManager : IProductManager
    {
        private readonly IProductRepository _productrepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<ApplicationUser> usermanager;
        private readonly ICategoryRepository categoryRepository;
        private readonly IinventoryRepository InventoryRepository;

        public ProductManager(IProductRepository productrepository, IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> _usermanager , ICategoryRepository _categoryRepository, IinventoryRepository _InventoryRepository)
        {
            _productrepository = productrepository;
            _httpContextAccessor = httpContextAccessor;
            usermanager = _usermanager;
            categoryRepository = _categoryRepository;
            InventoryRepository = _InventoryRepository;
        }

       
        public async Task DeleteAsync(int Id)
        {
            var productmodel = await _productrepository.GetByIdAsync(Id);  
            if (productmodel != null)
            {
                await _productrepository.deleteAsync(productmodel); 
                await _productrepository.SaveChangesAsync();  
            }
        }

        public async Task InsertAsync(ProductAddDto productDto, IFormFile file)
        {
            var UserId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (UserId == null)
                throw new Exception("User not found");

            var OwnerImage = _httpContextAccessor.HttpContext.User.FindFirst("ImageUrl")?.Value;

            Category category = await categoryRepository.GetByNameAsync(productDto.Category);
            if (category == null)
                throw new Exception("Category not found");

         
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

            
            var inventory = await InventoryRepository.GetByUserIdAsync(UserId);
            if (inventory == null)
            {
                inventory = new Inventory
                {
                    UserId = UserId,
                    StockQuantity =  productDto.StockQuantity,
                    Products = new List<Product>()
                };
                await InventoryRepository.insertAsync(inventory);
            }
            else
            {
                inventory.StockQuantity += productDto.StockQuantity;
                await InventoryRepository.updateAsync(inventory);
                await InventoryRepository.SaveChangesAsync();
            }
          
            var productModel = new Product
            {
                Title = productDto.Title,
                Price = productDto.Price,
                ProductDescription = productDto.ProductDescription,
                UserId = UserId,
                Image = imageUrl,
                OwnerImage = OwnerImage,
                CategoryID = category.CategoryId,
                StockQuantity = productDto.StockQuantity,
                InventoryId = inventory.InventoryId
            };

            await _productrepository.insertAsync(productModel);
        }



        public async Task UpdateAsync(ProductUpdateDto product , IFormFile file)
        {

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


            var Productmodel = await _productrepository.GetByIdAsync(product.ProductId);  
            if (Productmodel != null)
            {
                Productmodel.Title = product.Title;
                Productmodel.StockQuantity = product.StockQuantity;
                Productmodel.Price = product.Price;
                Productmodel.ProductDescription = product.ProductDescription;
                Productmodel. Image = imageUrl;
               

                await _productrepository.updateAsync(Productmodel); 
                await _productrepository.SaveChangesAsync(); 
            }
        }

    
        public async Task<IEnumerable<ProductReadDto>> GetAllAsync()
        {
            //var Usernum = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            //if (Usernum == null)
            //    throw new Exception("User not found");
            var ProductModels = await _productrepository.GetAllAsync(); 
            var productDto = ProductModels.Select(a => new ProductReadDto
            {
                _Id = a.ProductId,
                Title = a.Title,
                StockQuantity = a.StockQuantity,
                Price = a.Price,
                 ProductDescription = a.ProductDescription,
                Image = a.Image,
                OwnerImage = a.ApplicationUser.OwnerImage,
                name = a.ApplicationUser.UserName
            }).ToList();


            return productDto;
        }

        public async Task<ProductReadDto> GetByIdAsync(int id)
        {
            
            var productModel = await _productrepository.GetByIdAsync(id);  
            if (productModel != null)
            {
                var ProductDto = new ProductReadDto
                {
                    _Id = productModel.ProductId,
                    Title = productModel.Title,
                  StockQuantity = productModel.StockQuantity,
                    Price = productModel.Price,
                   ProductDescription = productModel.ProductDescription,
                    Image = productModel.Image ,
                    OwnerImage = productModel.ApplicationUser.OwnerImage,
                    name = productModel.ApplicationUser.UserName

                };

                return ProductDto;
            }

            return null;
        }
    }
}
