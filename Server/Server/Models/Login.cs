using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Login
    {
        [Required]
        public string AuId { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
