using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class History
    {
        [Key]
        public string HistoryId { get; set; }
        public string ComponentId { get; set; }
        public string LastLoaned { get; set; }
        public int TimesLoaned { get; set; }
        public int TimesReserved { get; set; }
        public int TimesUnavailable { get; set; }
    }
}
