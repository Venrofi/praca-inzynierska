using Backend.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; } //= null!;
        public DbSet<Comment> Comments { get; set; } //= null!;
        public DbSet<DiscussionPost> DiscossionPosts { get; set; }
        public DbSet<DiscussionPostDetails> DiscossionPostsDetails { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<PremiereAlbum> PremiereAlbums { get; set; }
        public DbSet<PremiereAlbumDetails> PremiereAlbumDetails { get; set; }
        public DbSet<Track> Tracks { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //

            base.OnModelCreating(modelBuilder);
        }
    }
}
