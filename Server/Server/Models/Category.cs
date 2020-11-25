using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Category
    {
        public string CategoryId { get; set; }
        public string CategoryName { get; set; }
        public ICollection<Component> Components { get; set; }
    }
}
