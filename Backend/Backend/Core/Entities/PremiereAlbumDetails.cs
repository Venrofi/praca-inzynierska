using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Entities
{
    public class PremiereAlbumDetails
    {
        public Guid PremiereAlbumDetailsId { get; set; }
        public string Description { get; set; }
        public TimeSpan Duration { get; set; }
        public string Genre { get; set; }
        public double Rating { get; set; }

        public PremiereAlbum PremiereAlbum { get; set; }
        public Guid PremiereAlbumId { get; set; }

        public List<Track>? Tracks { get; set; }
    }
}
