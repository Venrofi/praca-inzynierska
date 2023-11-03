using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Entities
{
    public class Group
    {
        [Required]
        public Guid GroupId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public bool Open { get; set; }

        public List<User>? Users { get; set; }
    }
}
