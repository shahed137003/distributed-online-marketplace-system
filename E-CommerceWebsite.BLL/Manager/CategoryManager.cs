using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using E_CommerceWebsite.BLL.Dtos;
using E_CommerceWebsite.DAL.Data.Models;
using E_CommerceWebsite.DAL.Repository;

namespace E_CommerceWebsite.BLL.Manager
{
    public class CategoryManager : ICategoryManager
    {
        private readonly ICategoryRepository _categoryrepository;

        public CategoryManager(ICategoryRepository categoryrepository)
        {
            _categoryrepository = categoryrepository;
        }


        public async Task DeleteAsync(int Id)
        {
            var categorymodel = await _categoryrepository.GetByIdAsync(Id);
            if (categorymodel != null)
            {
                await _categoryrepository.deleteAsync(categorymodel);
                await _categoryrepository.SaveChangesAsync();
            }
        }


        public async Task InsertAsync(CategoryAddDto category)
        {
            var Categorymodel = new Category
            {
                CategoryName = category.CategoryName

            };

            await _categoryrepository.insertAsync(Categorymodel);
            await _categoryrepository.SaveChangesAsync();
        }


        public async Task UpdateAsync(CategoryUpdateDto category)
        {
            var Categorymodel = await _categoryrepository.GetByIdAsync(category.CategoryId);
            if (Categorymodel != null)
            {
                Categorymodel.CategoryName = category.CategoryName;

                await _categoryrepository.updateAsync(Categorymodel);
                await _categoryrepository.SaveChangesAsync();
            }
        }


        public async Task<IEnumerable<CategoryReadDto>> GetAllAsync()
        {
            var Categorymodel = await _categoryrepository.GetAllAsync();
            var categoryDtos = Categorymodel.Select(a => new CategoryReadDto
            {
                CategoryId = a.CategoryId,
                CategoryName = a.CategoryName,

            }).ToList();

            return categoryDtos;
        }

        public async Task<CategoryReadDto> GetByIdAsync(int id)
        {
            var CategoryModel = await _categoryrepository.GetByIdAsync(id);
            if (CategoryModel != null)
            {
                var CategoryDto = new CategoryReadDto
                {
                    CategoryId = CategoryModel.CategoryId,
                    CategoryName = CategoryModel.CategoryName,
                   
                };

                return CategoryDto;
            }

            return null;
        }

        public async Task<CategoryReadDto> GetByNameAsync(string Name)
        {
            var CategoryModel = await _categoryrepository.GetByNameAsync(Name);
            if (CategoryModel != null)
            {
                var CategoryDto = new CategoryReadDto
                {
                    CategoryId = CategoryModel.CategoryId,
                    CategoryName = CategoryModel.CategoryName,

                };

                return CategoryDto;
            }

            return null;
        }
    }
}
