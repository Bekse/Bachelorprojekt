using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Server.Models
{
    public class Reservation
    {
        [Key]
        public string ReservationId { get; set; }
        public string ComponentId { get; set; }
        public string ComponentName { get; set; }
        public string ComponentInfo { get; set; }
        public int ComponentNumber { get; set; }
        public string AdminComment { get; set; }
        public string ReservedTo { get; set; }
        public string UserId { get; set; }
        public string ReservationDate { get; set; }
        public bool Loaned { get; set; }
    }
}
