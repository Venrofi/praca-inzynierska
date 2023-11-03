using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Backend.Models
{
    public class User
    {
        [Required]
        public Guid UserId { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        //public Enum Rank { get; set; }


        public List<Post> Posts { get; set; }
        public List<Discussion> Discussions { get; set; }
        public List<Group> Groups { get; set; }
    }
}
