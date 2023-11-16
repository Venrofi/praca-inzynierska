using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Entities
{
    public class Group
    {
        [Required]
        public Guid GroupId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public bool Open { get; set; }

        //add tags...

        public List<User>? Users { get; set; }

        public List<DiscussionPost>? DiscussionPosts { get; set; }

        public List<GroupTag>? GroupTags { get; set; }

        public List<Event>? OrganizedEvents { get; set; }
    }
}
