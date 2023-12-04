using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Requests {
    public class DeleteDiscussionPostRequest {
        [Required(ErrorMessage = "null-postid")]
        public Guid PostId { get; set; }

        [Required(ErrorMessage = "null-authorid")]
        public Guid AuthorId { get; set; }
    }
}
