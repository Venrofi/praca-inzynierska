namespace Backend.Core.Entities
{
    public class ArtistProfile
    {
        public Guid ArtistProfileId { get; set; }

        public string Name { get; set; }

        //public DiscussionPost DiscussionPost { get; set; }
        public List<PremiereAlbum>? Albums { get; set; } 
    }
}
