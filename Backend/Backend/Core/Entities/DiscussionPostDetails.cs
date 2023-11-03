using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Entities
{
    public class DiscussionPostDetails
    {
        [Required]
        public Guid DiscussionPostDetailsId { get; set; }

        [Required]
        public string Content { get; set; }

        public DiscussionPost DiscussionPost { get; set; }
        public Guid DiscussionPostId { get; set; }

        public List<Comment>? Comments { get; set; }
    }
}
