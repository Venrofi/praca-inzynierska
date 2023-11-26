using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Requests {
    public class DiscussionPostRequest {

        [Required(ErrorMessage = "null-authorid")]
        public Guid AuthorId { get; set; }

        [Required(ErrorMessage = "null-groupid")]
        public Guid GroupId { get; set; }

        [Required(ErrorMessage = "null-title")]
        [MaxLength(100, ErrorMessage = "long-title")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "null-content")]
        [MaxLength(2000, ErrorMessage = "long-content")]
        public string Content { get; set; } = string.Empty;

    }
}
