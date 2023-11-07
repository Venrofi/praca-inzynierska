using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Entities
{
    public class UserType
    {
        [Required]
        public Guid UserTypeId { get; set; }
        [Required]
        public string Description { get; set; }

        public List<User>? Users { get; set; }
    }
}
