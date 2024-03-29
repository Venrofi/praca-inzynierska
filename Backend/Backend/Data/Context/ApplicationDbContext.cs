﻿using Backend.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users => Set<User>();
        public DbSet<Comment> Comments { get; set; }
        public DbSet<DiscussionPost> DiscussionPosts { get; set; }
        public DbSet<DiscussionPostDetails> DiscussionPostsDetails { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<PremiereAlbum> PremiereAlbums { get; set; }
        public DbSet<PremiereAlbumDetails> PremiereAlbumDetails { get; set; }
        public DbSet<Track> Tracks { get; set; }
        public DbSet<ArtistProfile> ArtistsProfiles { get; set; }
        public DbSet<UserType> UserTypes { get; set; }  
        public DbSet<Profanities> Profanities { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Group>()
                .HasOne(g => g.Owner)
                .WithMany(u => u.OwnedGroups)
                .HasForeignKey(g => g.OwnerId);
            base.OnModelCreating(modelBuilder);
        }
    }
}
