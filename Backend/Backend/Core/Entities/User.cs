using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Backend.Core.Entities
{
    public class User
    {
        public Guid UserId { get; set; }
        public string? Email { get; set; }
        public string? UserName { get; set; }
        public string? Avatar { get; set; }

        public byte[] PasswordHash { get; set; } = new byte[32];
        public byte[] PasswordSalt { get; set; } = new byte[32];
        public string? VerificationToken { get; set; }
        public DateTime? VerificationTime { get; set; }
        public string? PasswordResetToken { get; set; }
        public DateTime? ResetTokenExpiration { get; set; }

        public List<Comment>? Comments { get; set; }
        public List<DiscussionPost>? DiscussionPosts { get; set; }
        public List<Group>? Groups { get; set; }

        public Guid UserTypeId { get; set; }
        public UserType UserType { get; set; }
    }
}
