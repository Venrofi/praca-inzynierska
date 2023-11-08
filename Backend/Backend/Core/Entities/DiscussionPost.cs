using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Entities
{
    public class DiscussionPost
    {
        [Required]
        public Guid DiscussionPostId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Topic { get; set; }

        [Required]
        public TopicTypes TopicType { get; set; }

        public enum TopicTypes
        {
            Artist,
            Group
        }

        [Required]
        public DateTime CreationTime { get; set; }

        [Required]
        public int NumberOfComments { get; set; }

        public User User { get; set; }
        public Guid UserId { get; set; }
        public DiscussionPostDetails DiscussionPostDetails { get; set; }

        public Group? Group { get; set; }
        public Guid? GroupId { get; set; }

        public ArtistProfile? ArtistProfile { get; set; }
        public Guid? ArtistProfileId { get; set; }
    }
}
