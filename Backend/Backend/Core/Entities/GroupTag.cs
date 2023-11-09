using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Entities {
    public class GroupTag {
        [Required]
        public Guid GroupTagId { get; set; }
        [Required]
        public string TagName { get; set; }

        public List<Group>? Groups { get; set; }
    }
}
