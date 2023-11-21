using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Entities
{
    public class Track
    {
        public Guid TrackId { get; set; }
        public string Title { get; set; }
        public TimeSpan Duration { get; set; }

        public PremiereAlbumDetails PremiereAlbumDetails { get; set;}
        public Guid PremiereAlbumDetailsId { get; set; }
    }
}
