using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_CommerceWebsite.BLL.Dtos.AccountDto
{
    public class loginResponseDto
    {
        public string? token { get; set; }
        public string? UserId { get; set; }
    }
}
