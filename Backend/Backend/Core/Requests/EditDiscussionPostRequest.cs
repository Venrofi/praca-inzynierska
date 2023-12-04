using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Requests {
    public class EditDiscussionPostRequest {
        [Required(ErrorMessage = "null-postid")]
        public Guid PostId { get; set; }

        [Required(ErrorMessage = "null-authorid")]
        public Guid AuthorId { get; set; }

        [Required(ErrorMessage = "null-data")]
        public EditDiscussionPostDataEntity Data { get; set; }
    }

    public class EditDiscussionPostDataEntity {
        [Required(ErrorMessage = "null-title")]
        public string Title { get; set; }
        [Required(ErrorMessage = "null-content")]
        public string Content { get; set; }
    }
}
