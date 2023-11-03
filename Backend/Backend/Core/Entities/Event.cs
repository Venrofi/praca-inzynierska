using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Entities
{
    public class Event
    {
        [Required]
        public Guid EventId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public string Cover { get; set; }
    }
}
