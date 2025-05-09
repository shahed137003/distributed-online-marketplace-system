using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_CommerceWebsite.DAL.Data.Models
{
    public class ShoppingCart
    {
        [Key]
        public int ShoppingCartId { get; set; }
        [Range(0, int.MaxValue)]
        public int NumberofItems { get; set; } = 0;
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public decimal TotalPrice { get; set; } = 0;
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser? User { get; set; } = null!;

        public string? Status { get; set; } = "notPaid";
        public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
    }

}