using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Context
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; } //= null!;
        public DbSet<Post> Posts { get; set; } //= null!;
        public DbSet<Discussion> Discussions { get; set; }
        public DbSet<Group> Groups { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
