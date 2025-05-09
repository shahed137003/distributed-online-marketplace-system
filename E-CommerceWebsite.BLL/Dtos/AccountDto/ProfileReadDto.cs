using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_CommerceWebsite.BLL.Dtos.AccountDto
{
    public class ProfileReadDto
    {
        public string? UserName { get; set; }
        public string? OwnerImage { get; set; }
        public string? Bio { get; set; }
        public string? PhoneNumber { get; set; }
        public InventoryReadDto Inventory { get; set; }
        public string? Facebook { get; set; }
        public string? Twitter { get; set; }
        public string? Discord { get; set; }



    }
}
