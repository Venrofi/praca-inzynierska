using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Entities
{
    public class Group
    {
        public Guid GroupId { get; set; }
        public string Name { get; set; }
        public bool Open { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }

        public List<User>? Users { get; set; }

        public List<DiscussionPost>? DiscussionPosts { get; set; }

        public List<Event>? OrganizedEvents { get; set; }
        public Guid? OwnerId { get; set; }
        public User? Owner { get; set; }
    }
}
