using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Requests {
    public class CommentRequest {
        [Required(ErrorMessage = "null-authorid")]
        public Guid AuthorId { get; set; }

        [Required(ErrorMessage = "null-discussionpostid")]
        public Guid DiscussionPostId { get; set; }

        [Required(ErrorMessage = "null-content")]
        [MaxLength(2000, ErrorMessage = "long-content")]
        public string Content { get; set; } = string.Empty;
    }
}
