using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_CommerceWebsite.BLL.Dtos.AccountDto
{
    public class RegisterDto
    {
        //public int? Id { get; set; }
        public string? Name { get; set; }

        [DataType(DataType.EmailAddress)]
        public string? Email { get; set; }

        [DataType(DataType.Password)]
        public string? Password { get; set; }

        [Compare("Password", ErrorMessage = "Password and ConfirmPassword must match.")]
        [DataType(DataType.Password)]
        public string? ConfirmPassword { get; set; }

        public string? PhoneNumber { get; set; }

        //public string? OwnerImage { get; set; }
    }

}
