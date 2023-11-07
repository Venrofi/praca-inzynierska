using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Entities
{
    public class EventsListRequest
    {
        [Required]
        public string SearchFraze { get; set; } = string.Empty;
    }
}
