using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_CommerceWebsite.BLL.Dtos
{
  public class ProductAddDto
{
    //public int ProductId { get; set; }   //generated from database
    public string? Title { get; set; }
    public string? ProductDescription { get; set; }
    public int? Price { get; set; }
    public int StockQuantity { get; set; }
        // public file link { get; set; }
        //public int? UserId { get; set; }
        //public string? name { get; set; }
        public string? Category { get; set; }

        //public string? imageURl { get; set; }

    }
}
