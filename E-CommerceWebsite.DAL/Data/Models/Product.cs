using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_CommerceWebsite.DAL.Data.Models
{
    public class Product
    {
       
        public int ProductId { get; set; }
        public int StockQuantity { get; set; }
        public string? Title { get; set; }
        public string? ProductDescription { get; set; }
        public int? Price { get; set; }

        public string? Image { get; set; }

        public string? OwnerImage { get; set; }

        public string? UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser ApplicationUser { get; set; }


        public int? CategoryID { get; set; }

        [ForeignKey("CategoryID")]
        public Category? Category { get; set; }

        public ICollection<CartItem> CartItems { get; set; }

        public int? InventoryId { get; set; }
        [ForeignKey("InventoryId")]
        public Inventory? Inventory { get; set; }


    }
}
