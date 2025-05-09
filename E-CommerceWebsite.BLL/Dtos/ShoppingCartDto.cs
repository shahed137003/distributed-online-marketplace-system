using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_CommerceWebsite.BLL.Dtos
{
    public class ShoppingCartDto
    {
        public int ShoppingCartId { get; set; }
        public string? UserId { get; set; }
        public int NumberofItems { get; set; } = 0;
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public List<CartItemDto> Items { get; set; } = [];
        public decimal TotalPrice { get; set; } = 0;
        public string? Status { get; set; }
    }


    public class CartItemDto
    {
        public int ProductId { get; set; }
        public string Title { get; set; } = null!;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string? ImageCover { get; set; }
    }
}