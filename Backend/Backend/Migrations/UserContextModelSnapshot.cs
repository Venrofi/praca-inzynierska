﻿// <auto-generated />
using System;
using Backend.Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Backend.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class UserContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Backend.Core.Entities.Comment", b =>
                {
                    b.Property<Guid>("CommentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("DiscussionPostDetailsId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("CommentId");

                    b.HasIndex("DiscussionPostDetailsId");

                    b.HasIndex("UserId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("Backend.Core.Entities.DiscussionPost", b =>
                {
                    b.Property<Guid>("DiscussionPostId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("NumberOfComments")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Topic")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("DiscussionPostId");

                    b.HasIndex("UserId");

                    b.ToTable("DiscossionPosts");
                });

            modelBuilder.Entity("Backend.Core.Entities.DiscussionPostDetails", b =>
                {
                    b.Property<Guid>("DiscussionPostDetailsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("DiscussionPostId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("DiscussionPostDetailsId");

                    b.HasIndex("DiscussionPostId")
                        .IsUnique();

                    b.ToTable("DiscossionPostsDetails");
                });

            modelBuilder.Entity("Backend.Core.Entities.Event", b =>
                {
                    b.Property<Guid>("EventId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Cover")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("EventId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("Backend.Core.Entities.Group", b =>
                {
                    b.Property<Guid>("GroupId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Open")
                        .HasColumnType("bit");

                    b.HasKey("GroupId");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("Backend.Core.Entities.PremiereAlbum", b =>
                {
                    b.Property<Guid>("PremiereAlbumId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Artist")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Cover")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ReleaseDate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PremiereAlbumId");

                    b.ToTable("PremiereAlbums");
                });

            modelBuilder.Entity("Backend.Core.Entities.PremiereAlbumDetails", b =>
                {
                    b.Property<Guid>("PremiereAlbumDetailsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Duration")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Genre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("PremiereAlbumId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("Rating")
                        .HasColumnType("float");

                    b.HasKey("PremiereAlbumDetailsId");

                    b.HasIndex("PremiereAlbumId")
                        .IsUnique();

                    b.ToTable("PremiereAlbumDetails");
                });

            modelBuilder.Entity("Backend.Core.Entities.Track", b =>
                {
                    b.Property<Guid>("TrackId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Duration")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("PremiereAlbumDetailsId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TrackId");

                    b.HasIndex("PremiereAlbumDetailsId");

                    b.ToTable("Tracks");
                });

            modelBuilder.Entity("Backend.Core.Entities.User", b =>
                {
                    b.Property<Guid>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Avatar")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("PasswordResetToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<DateTime?>("ResetTokenExpiration")
                        .HasColumnType("datetime2");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("VerificationTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("VerificationToken")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("GroupUser", b =>
                {
                    b.Property<Guid>("GroupsGroupId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UsersUserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("GroupsGroupId", "UsersUserId");

                    b.HasIndex("UsersUserId");

                    b.ToTable("GroupUser");
                });

            modelBuilder.Entity("Backend.Core.Entities.Comment", b =>
                {
                    b.HasOne("Backend.Core.Entities.DiscussionPostDetails", "DiscussionPostDetails")
                        .WithMany("Comments")
                        .HasForeignKey("DiscussionPostDetailsId");

                    b.HasOne("Backend.Core.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DiscussionPostDetails");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Backend.Core.Entities.DiscussionPost", b =>
                {
                    b.HasOne("Backend.Core.Entities.User", "User")
                        .WithMany("DiscussionPosts")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Backend.Core.Entities.DiscussionPostDetails", b =>
                {
                    b.HasOne("Backend.Core.Entities.DiscussionPost", "DiscussionPost")
                        .WithOne("DiscussionPostDetails")
                        .HasForeignKey("Backend.Core.Entities.DiscussionPostDetails", "DiscussionPostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DiscussionPost");
                });

            modelBuilder.Entity("Backend.Core.Entities.PremiereAlbumDetails", b =>
                {
                    b.HasOne("Backend.Core.Entities.PremiereAlbum", "PremiereAlbum")
                        .WithOne("PremiereAlbumDetails")
                        .HasForeignKey("Backend.Core.Entities.PremiereAlbumDetails", "PremiereAlbumId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PremiereAlbum");
                });

            modelBuilder.Entity("Backend.Core.Entities.Track", b =>
                {
                    b.HasOne("Backend.Core.Entities.PremiereAlbumDetails", "PremiereAlbumDetails")
                        .WithMany("Tracks")
                        .HasForeignKey("PremiereAlbumDetailsId");

                    b.Navigation("PremiereAlbumDetails");
                });

            modelBuilder.Entity("GroupUser", b =>
                {
                    b.HasOne("Backend.Core.Entities.Group", null)
                        .WithMany()
                        .HasForeignKey("GroupsGroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Core.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UsersUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Backend.Core.Entities.DiscussionPost", b =>
                {
                    b.Navigation("DiscussionPostDetails")
                        .IsRequired();
                });

            modelBuilder.Entity("Backend.Core.Entities.DiscussionPostDetails", b =>
                {
                    b.Navigation("Comments");
                });

            modelBuilder.Entity("Backend.Core.Entities.PremiereAlbum", b =>
                {
                    b.Navigation("PremiereAlbumDetails");
                });

            modelBuilder.Entity("Backend.Core.Entities.PremiereAlbumDetails", b =>
                {
                    b.Navigation("Tracks");
                });

            modelBuilder.Entity("Backend.Core.Entities.User", b =>
                {
                    b.Navigation("DiscussionPosts");
                });
#pragma warning restore 612, 618
        }
    }
}