using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_CommerceWebsite.DAL.Data.Models
{
    public class Category
    {
   
        public int CategoryId { get; set; }
        public String? CategoryName { get; set; }
        public ICollection<Product>? Products { get; set; }

    }
}
