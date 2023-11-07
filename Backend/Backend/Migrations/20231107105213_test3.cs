using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class test3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ArtistProfileId",
                table: "PremiereAlbums",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "TopicType",
                table: "DiscossionPosts",
                type: "int",
                nullable: false,
                defaultValue: 0);

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

            migrationBuilder.CreateIndex(
                name: "IX_PremiereAlbums_ArtistProfileId",
                table: "PremiereAlbums",
                column: "ArtistProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_PremiereAlbums_ArtistsProfiles_ArtistProfileId",
                table: "PremiereAlbums",
                column: "ArtistProfileId",
                principalTable: "ArtistsProfiles",
                principalColumn: "ArtistProfileId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PremiereAlbums_ArtistsProfiles_ArtistProfileId",
                table: "PremiereAlbums");

            migrationBuilder.DropTable(
                name: "ArtistsProfiles");

            migrationBuilder.DropIndex(
                name: "IX_PremiereAlbums_ArtistProfileId",
                table: "PremiereAlbums");

            migrationBuilder.DropColumn(
                name: "ArtistProfileId",
                table: "PremiereAlbums");

            migrationBuilder.DropColumn(
                name: "TopicType",
                table: "DiscossionPosts");
        }
    }
}
