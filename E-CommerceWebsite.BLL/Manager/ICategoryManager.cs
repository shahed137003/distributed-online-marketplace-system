using System.Collections.Generic;
using System.Threading.Tasks;
using E_CommerceWebsite.BLL.Dtos;

namespace E_CommerceWebsite.BLL.Manager
{
    public interface ICategoryManager
    {

        Task<IEnumerable<CategoryReadDto>> GetAllAsync();
        Task<CategoryReadDto> GetByIdAsync(int id);
        Task<CategoryReadDto> GetByNameAsync(string name);
        Task InsertAsync(CategoryAddDto category);
        Task UpdateAsync(CategoryUpdateDto category);
        Task DeleteAsync(int id);
    }
}