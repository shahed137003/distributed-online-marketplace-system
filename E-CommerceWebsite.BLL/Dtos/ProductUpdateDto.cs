using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_CommerceWebsite.BLL.Dtos
{
    public class ProductUpdateDto
    {
        public int ProductId { get; set; }
        public string ?Title { get; set; } = null!;
       public string? ProductDescription { get; set; }
        public int? Price { get; set; }
        public int StockQuantity { get; set; }
        //public string? Image { get; set; }
        //public int? UserId { get; set; }
        //public string? name { get; set; }


    }
}
