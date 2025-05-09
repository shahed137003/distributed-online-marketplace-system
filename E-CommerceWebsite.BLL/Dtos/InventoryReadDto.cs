using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_CommerceWebsite.BLL.Dtos
{
    public class InventoryReadDto
    {
    
       public int  InventoryId { get; set; }
       public string? UserName { get; set; }
        public int StockQuantity { get; set; } = 0;
        public ICollection<ProductReadDto>? Products { get; set; }

        public string ? UserID { get; set; }
    }
}
