using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Context
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; } = null!;
    }
}
