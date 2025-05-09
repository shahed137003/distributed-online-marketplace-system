using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_CommerceWebsite.BLL.Dtos
{
    public class CategoryReadDto
    {
        public int CategoryId { get; set; }
        public string? CategoryName { get; set; }
        //public ICollection<ProductReadDto>? Products { get; set; }


    }
}