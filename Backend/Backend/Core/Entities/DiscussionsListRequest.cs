using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Entities
{
    public class DiscussionsListRequest
    {
        [Required]
        public string SearchFraze { get; set; } = string.Empty;
    }
}
