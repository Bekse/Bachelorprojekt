using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Loan
    {
        [Key]
        public string LoanId { get; set; }
        public string ComponentName { get; set; }
        public int ComponentNumber { get; set; }
        public string ComponentId { get; set; }
        public string UserId { get; set; }
        public string AdminComment { get; set; }
        public string LoanDate { get; set; }
        public string ReturnDate { get; set; }
    }
}
