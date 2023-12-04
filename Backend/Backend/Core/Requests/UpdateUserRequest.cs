using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Requests {
    public class UpdateUserRequest {
        [Required(ErrorMessage = "null-memberid")]
        public Guid MemberId { get; set; }

        [Required(ErrorMessage = "null-bio")]
        [MaxLength(2000, ErrorMessage = "long-bio")]
        public string Bio { get; set; } = string.Empty;
    }
}
