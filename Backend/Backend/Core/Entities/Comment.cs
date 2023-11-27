using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Entities
{
    public class Comment
    {
        [Required]
        public Guid CommentId { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public DateTime CreationTime { get; set; }

        public User User { get; set; }
        public Guid UserId { get; set; }

        public DiscussionPostDetails? DiscussionPostDetails { get; set; }
        public Guid? DiscussionPostDetailsId { get; set; }
    }
}
