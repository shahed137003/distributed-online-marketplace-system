using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_CommerceWebsite.BLL.Dtos.AccountDto
{
    public class UserReadDto
    {
        public string Name { get; set; }
        public string Email { get; set; }

        public string phoneNumber { get; set; }
        public string UserImage { get; set; }
    }
}
