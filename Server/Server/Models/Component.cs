using System.ComponentModel.DataAnnotations;
using Server.Enums;

namespace Server.Models
{
    public class Component
    {
        [Key]
        public string ComponentId { get; set; }
        public string CategoryId { get; set; }
        public string  ComponentName { get; set; }
        public string CategoryName { get; set; }
        public string ComponentLocation { get; set; }
        public string ComponentStatus { get; set; }
        public string ComponentInfo { get; set; }
        public int ComponentNumber { get; set; }
        public int Count { get; set; }
        public string AdminComment { get; set; }
        public string Datasheet { get; set; }
        public string WikiLink { get; set; }
        public string Manufacturer { get; set; }
        public string SerialNumber { get; set; }
        public string ImageUrl { get; set; }
        public History History { get; set; }
    }
}
