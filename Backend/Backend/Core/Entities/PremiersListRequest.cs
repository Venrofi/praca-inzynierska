using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Entities
{
    public class PremiersListRequest
    {
        [Required]
        public string SearchFraze { get; set; } = string.Empty;
    }
}
