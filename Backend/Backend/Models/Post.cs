using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Post
    {
        [Required]
        public Guid PostId { get; set; }

        [Required]
        [DataType(DataType.MultilineText)]
        public string Text { get; set; }

        [Required]
        public int Reactions { get; set; }

        [DataType(DataType.Url)]
        public string Url { get; set; }

        public User User { get; set; }
        public Guid UserId { get; set; }

        public Discussion? Discussion { get; set; }
        public Guid? DiscussionId { get; set; }
    }
}
