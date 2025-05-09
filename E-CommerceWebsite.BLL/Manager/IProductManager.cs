using System.Collections.Generic;
using System.Threading.Tasks;
using E_CommerceWebsite.BLL.Dtos;
using Microsoft.AspNetCore.Http;

namespace E_CommerceWebsite.BLL.Manager
{
    public interface IProductManager
    {
  
        Task<IEnumerable<ProductReadDto>> GetAllAsync();  
        Task<ProductReadDto> GetByIdAsync(int id);
        Task InsertAsync(ProductAddDto productDto,IFormFile file);
        Task UpdateAsync(ProductUpdateDto product , IFormFile file);  
        Task DeleteAsync(int id);
        //Task UploadImageAsync(int productId, IFormFile file);
    }
}
