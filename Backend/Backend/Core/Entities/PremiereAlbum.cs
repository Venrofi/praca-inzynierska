using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Entities
{
    public class PremiereAlbum
    {
        [Required]
        public Guid PremiereAlbumId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Artist { get; set; }

        [Required]
        public string Cover { get; set; }

        [Required]
        public string ReleaseDate { get; set; }

        public PremiereAlbumDetails PremiereAlbumDetails { get; set; }
        //public Guid? PremiereAlbumDetailsId { get; set; }
        public Guid ArtistProfileId { get; set; }
        public ArtistProfile ArtistProfile { get; set; }
    }
}
