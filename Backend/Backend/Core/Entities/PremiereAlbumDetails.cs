using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Entities
{
    public class PremiereAlbumDetails
    {
        [Required]
        public Guid PremiereAlbumDetailsId { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Duration { get; set; }

        [Required]
        public string Genre { get; set; }

        [Required]
        public double Rating { get; set; }

        public PremiereAlbum PremiereAlbum { get; set; }
        public Guid PremiereAlbumId { get; set; }

        public List<Track>? Tracks { get; set; }
    }
}
