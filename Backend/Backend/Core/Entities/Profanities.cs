using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Entities {
    public class Profanities {
        [Required]
        public Guid ProfanitiesId { get; set; }

        [Required]
        public string ProfanitiesName { get; set; }
    }
}
