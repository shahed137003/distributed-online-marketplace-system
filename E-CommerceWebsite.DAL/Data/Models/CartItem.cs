using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace E_CommerceWebsite.DAL.Data.Models
{
    public class CartItem
    {
        public int CartItemId { get; set; }
        public int? CartId { get; set; }
        public ShoppingCart? Cart { get; set; }

        public int? ProductId { get; set; }
        public Product? Product { get; set; }

        public int Quantity { get; set; }
    }
}
