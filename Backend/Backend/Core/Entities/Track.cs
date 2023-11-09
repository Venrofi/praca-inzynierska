using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Entities
{
    public class Track
    {
        [Required]
        public Guid TrackId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Duration { get; set; }

        public PremiereAlbumDetails PremiereAlbumDetails { get; set;}
        public Guid PremiereAlbumDetailsId { get; set; }
    }
}
