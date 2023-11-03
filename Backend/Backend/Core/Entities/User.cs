using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Backend.Core.Entities
{
    public class User
    {
        [Required]
        public Guid UserId { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        //[StringLength(15, ErrorMessage = "Your Password is limited to {2} to {1} characters", MinimumLength = 6)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        public string Avatar { get; set; }

        [Required]
        public Roles Role { get; set; } = Roles.USER;

        public enum Roles
        {
            ADMIN,
            USER,
            MODERATOR
        }

        //public List<Comment> Comments { get; set; }
        public List<DiscussionPost>? DiscussionPosts { get; set; }
        public List<Group>? Groups { get; set; }
    }
}
