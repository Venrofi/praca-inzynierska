using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class test2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_DiscossionPostsDetails_DiscussionPostDetailsId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_DiscossionPosts_Users_UserId",
                table: "DiscossionPosts");

            migrationBuilder.DropForeignKey(
                name: "FK_DiscossionPostsDetails_DiscossionPosts_DiscussionPostId",
                table: "DiscossionPostsDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Tracks_PremiereAlbumDetails_PremiereAlbumDetailsId",
                table: "Tracks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DiscossionPostsDetails",
                table: "DiscossionPostsDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DiscossionPosts",
                table: "DiscossionPosts");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "Users");

            migrationBuilder.RenameTable(
                name: "DiscossionPostsDetails",
                newName: "DiscussionPostsDetails");

            migrationBuilder.RenameTable(
                name: "DiscossionPosts",
                newName: "DiscussionPosts");

            migrationBuilder.RenameIndex(
                name: "IX_DiscossionPostsDetails_DiscussionPostId",
                table: "DiscussionPostsDetails",
                newName: "IX_DiscussionPostsDetails_DiscussionPostId");

            migrationBuilder.RenameIndex(
                name: "IX_DiscossionPosts_UserId",
                table: "DiscussionPosts",
                newName: "IX_DiscussionPosts_UserId");

            migrationBuilder.AlterColumn<string>(
                name: "Avatar",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordHash",
                table: "Users",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<string>(
                name: "PasswordResetToken",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordSalt",
                table: "Users",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<DateTime>(
                name: "ResetTokenExpiration",
                table: "Users",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserTypeId",
                table: "Users",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "VerificationTime",
                table: "Users",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VerificationToken",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "PremiereAlbumDetailsId",
                table: "Tracks",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ArtistProfileId",
                table: "PremiereAlbums",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "ArtistProfileId",
                table: "DiscussionPosts",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "GroupId",
                table: "DiscussionPosts",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TopicType",
                table: "DiscussionPosts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_DiscussionPostsDetails",
                table: "DiscussionPostsDetails",
                column: "DiscussionPostDetailsId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DiscussionPosts",
                table: "DiscussionPosts",
                column: "DiscussionPostId");

            migrationBuilder.CreateTable(
                name: "ArtistsProfiles",
                columns: table => new
                {
                    ArtistProfileId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtistsProfiles", x => x.ArtistProfileId);
                });

            migrationBuilder.CreateTable(
                name: "GroupTag",
                columns: table => new
                {
                    GroupTagId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TagName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupTag", x => x.GroupTagId);
                });

            migrationBuilder.CreateTable(
                name: "Profanities",
                columns: table => new
                {
                    ProfanitiesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProfanitiesName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profanities", x => x.ProfanitiesId);
                });

            migrationBuilder.CreateTable(
                name: "UserTypes",
                columns: table => new
                {
                    UserTypeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTypes", x => x.UserTypeId);
                });

            migrationBuilder.CreateTable(
                name: "GroupGroupTag",
                columns: table => new
                {
                    GroupTagsGroupTagId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GroupsGroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupGroupTag", x => new { x.GroupTagsGroupTagId, x.GroupsGroupId });
                    table.ForeignKey(
                        name: "FK_GroupGroupTag_GroupTag_GroupTagsGroupTagId",
                        column: x => x.GroupTagsGroupTagId,
                        principalTable: "GroupTag",
                        principalColumn: "GroupTagId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupGroupTag_Groups_GroupsGroupId",
                        column: x => x.GroupsGroupId,
                        principalTable: "Groups",
                        principalColumn: "GroupId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_UserTypeId",
                table: "Users",
                column: "UserTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_PremiereAlbums_ArtistProfileId",
                table: "PremiereAlbums",
                column: "ArtistProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_DiscussionPosts_ArtistProfileId",
                table: "DiscussionPosts",
                column: "ArtistProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_DiscussionPosts_GroupId",
                table: "DiscussionPosts",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupGroupTag_GroupsGroupId",
                table: "GroupGroupTag",
                column: "GroupsGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_DiscussionPostsDetails_DiscussionPostDetailsId",
                table: "Comments",
                column: "DiscussionPostDetailsId",
                principalTable: "DiscussionPostsDetails",
                principalColumn: "DiscussionPostDetailsId");

            migrationBuilder.AddForeignKey(
                name: "FK_DiscussionPosts_ArtistsProfiles_ArtistProfileId",
                table: "DiscussionPosts",
                column: "ArtistProfileId",
                principalTable: "ArtistsProfiles",
                principalColumn: "ArtistProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_DiscussionPosts_Groups_GroupId",
                table: "DiscussionPosts",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "GroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_DiscussionPosts_Users_UserId",
                table: "DiscussionPosts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DiscussionPostsDetails_DiscussionPosts_DiscussionPostId",
                table: "DiscussionPostsDetails",
                column: "DiscussionPostId",
                principalTable: "DiscussionPosts",
                principalColumn: "DiscussionPostId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PremiereAlbums_ArtistsProfiles_ArtistProfileId",
                table: "PremiereAlbums",
                column: "ArtistProfileId",
                principalTable: "ArtistsProfiles",
                principalColumn: "ArtistProfileId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tracks_PremiereAlbumDetails_PremiereAlbumDetailsId",
                table: "Tracks",
                column: "PremiereAlbumDetailsId",
                principalTable: "PremiereAlbumDetails",
                principalColumn: "PremiereAlbumDetailsId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_UserTypes_UserTypeId",
                table: "Users",
                column: "UserTypeId",
                principalTable: "UserTypes",
                principalColumn: "UserTypeId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_DiscussionPostsDetails_DiscussionPostDetailsId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_DiscussionPosts_ArtistsProfiles_ArtistProfileId",
                table: "DiscussionPosts");

            migrationBuilder.DropForeignKey(
                name: "FK_DiscussionPosts_Groups_GroupId",
                table: "DiscussionPosts");

            migrationBuilder.DropForeignKey(
                name: "FK_DiscussionPosts_Users_UserId",
                table: "DiscussionPosts");

            migrationBuilder.DropForeignKey(
                name: "FK_DiscussionPostsDetails_DiscussionPosts_DiscussionPostId",
                table: "DiscussionPostsDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_PremiereAlbums_ArtistsProfiles_ArtistProfileId",
                table: "PremiereAlbums");

            migrationBuilder.DropForeignKey(
                name: "FK_Tracks_PremiereAlbumDetails_PremiereAlbumDetailsId",
                table: "Tracks");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_UserTypes_UserTypeId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "ArtistsProfiles");

            migrationBuilder.DropTable(
                name: "GroupGroupTag");

            migrationBuilder.DropTable(
                name: "Profanities");

            migrationBuilder.DropTable(
                name: "UserTypes");

            migrationBuilder.DropTable(
                name: "GroupTag");

            migrationBuilder.DropIndex(
                name: "IX_Users_UserTypeId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_PremiereAlbums_ArtistProfileId",
                table: "PremiereAlbums");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DiscussionPostsDetails",
                table: "DiscussionPostsDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DiscussionPosts",
                table: "DiscussionPosts");

            migrationBuilder.DropIndex(
                name: "IX_DiscussionPosts_ArtistProfileId",
                table: "DiscussionPosts");

            migrationBuilder.DropIndex(
                name: "IX_DiscussionPosts_GroupId",
                table: "DiscussionPosts");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PasswordResetToken",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ResetTokenExpiration",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UserTypeId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "VerificationTime",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "VerificationToken",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ArtistProfileId",
                table: "PremiereAlbums");

            migrationBuilder.DropColumn(
                name: "ArtistProfileId",
                table: "DiscussionPosts");

            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "DiscussionPosts");

            migrationBuilder.DropColumn(
                name: "TopicType",
                table: "DiscussionPosts");

            migrationBuilder.RenameTable(
                name: "DiscussionPostsDetails",
                newName: "DiscossionPostsDetails");

            migrationBuilder.RenameTable(
                name: "DiscussionPosts",
                newName: "DiscossionPosts");

            migrationBuilder.RenameIndex(
                name: "IX_DiscussionPostsDetails_DiscussionPostId",
                table: "DiscossionPostsDetails",
                newName: "IX_DiscossionPostsDetails_DiscussionPostId");

            migrationBuilder.RenameIndex(
                name: "IX_DiscussionPosts_UserId",
                table: "DiscossionPosts",
                newName: "IX_DiscossionPosts_UserId");

            migrationBuilder.AlterColumn<string>(
                name: "Avatar",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Role",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<Guid>(
                name: "PremiereAlbumDetailsId",
                table: "Tracks",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DiscossionPostsDetails",
                table: "DiscossionPostsDetails",
                column: "DiscussionPostDetailsId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DiscossionPosts",
                table: "DiscossionPosts",
                column: "DiscussionPostId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_DiscossionPostsDetails_DiscussionPostDetailsId",
                table: "Comments",
                column: "DiscussionPostDetailsId",
                principalTable: "DiscossionPostsDetails",
                principalColumn: "DiscussionPostDetailsId");

            migrationBuilder.AddForeignKey(
                name: "FK_DiscossionPosts_Users_UserId",
                table: "DiscossionPosts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DiscossionPostsDetails_DiscossionPosts_DiscussionPostId",
                table: "DiscossionPostsDetails",
                column: "DiscussionPostId",
                principalTable: "DiscossionPosts",
                principalColumn: "DiscussionPostId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tracks_PremiereAlbumDetails_PremiereAlbumDetailsId",
                table: "Tracks",
                column: "PremiereAlbumDetailsId",
                principalTable: "PremiereAlbumDetails",
                principalColumn: "PremiereAlbumDetailsId");
        }
    }
}
