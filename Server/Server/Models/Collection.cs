using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Collection
    {
        public ICollection<Loan> Loans { get; set; }
        public ICollection<Reservation> Reservations { get; set; }
    }
}
