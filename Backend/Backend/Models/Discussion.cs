using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Discussion
    {
        [Required]
        public Guid DiscussionId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        [DataType(DataType.MultilineText)]
        public string InitialText { get; set; }

        public User User { get; set; }
        public Guid UserId { get; set; }
        public List<Post> Posts { get; set; }
    }
}
