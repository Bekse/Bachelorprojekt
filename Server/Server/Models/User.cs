using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Server.Enums;

namespace Server.Models
{
    public class User
    {
        [Key]
        public string Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string AuId { get; set; }
        [Required]
        public int StudentNumber { get; set; }
        [Required]
        public int PhoneNumber { get; set; }
        public string Role { get; set; }
        [NotMapped]
        public string Token { get; set; }
        [NotMapped]
        public ICollection<Loan> Loans { get; set; }
        [NotMapped]
        public ICollection<Reservation> Reservations { get; set; }

        public override string ToString()
        {
            var builder = new StringBuilder();
            builder.Append("Id : " + Id + "\n");
            builder.Append("Role : " + Role + "\n");
            builder.Append("FirstName : " + FirstName + "\n");
            builder.Append("LastName : " + LastName + "\n");
            builder.Append("Email : " + Email + "\n");
            builder.Append("AuId : " + AuId + "\n");
            builder.Append("StudentNumber : " + StudentNumber + "\n");
            builder.Append("PhoneNumber : " + PhoneNumber + "\n");

            return builder.ToString();
        }
    }
}
