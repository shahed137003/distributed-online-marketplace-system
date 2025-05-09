using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_CommerceWebsite.DAL.Data.Models
{
    public class Inventory
    {
       
        public int InventoryId { get; set; }
        public int StockQuantity { get; set; } = 0;
        //public int? ProductId { get; set; }

        //[ForeignKey("ProductId")]
        public ICollection<Product> Products  { get; set; }

        public string? UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser ApplicationUser { get; set; }


    }
}
