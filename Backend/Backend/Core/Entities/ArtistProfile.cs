namespace Backend.Core.Entities
{
    public class ArtistProfile
    {
        public Guid ArtistProfileId { get; set; }

        public string Name { get; set; }
        public string? Description { get; set; }

        //public DiscussionPost DiscussionPost { get; set; }
        public List<PremiereAlbum>? Albums { get; set; } 
        public List<DiscussionPost>? DiscussionPosts { get; set; }
        public List<Event>? OrganizedEvents { get; set; }
        public List<User>? Followers { get; set; }
    }
}
