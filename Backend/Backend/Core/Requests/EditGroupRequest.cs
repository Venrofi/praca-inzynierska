using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Requests {
    public class EditGroupRequest {
        
        [Required(ErrorMessage = "null-groupid")]
        public Guid GroupId { get; set; }

        [Required(ErrorMessage = "null-userid")]
        public Guid UserId { get; set; }

        [Required(ErrorMessage = "null-data")]
        public EditGroupDataEntity Data { get; set; }
    }
    public class EditGroupDataEntity {
        [Required(ErrorMessage = "null-name")]
        [MaxLength(50, ErrorMessage = "long-name")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "null-description")]
        [MaxLength(2000, ErrorMessage = "long-description")]
        public string Description { get; set; } = string.Empty;

        [Required(ErrorMessage = "null-image")]
        [MaxLength(2000, ErrorMessage = "long-image")]
        public string Image { get; set; } = string.Empty;
    }
}
