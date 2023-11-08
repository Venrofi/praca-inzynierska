using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class test4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "Users");

            migrationBuilder.AlterColumn<string>(
                name: "UserName",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserTypeId",
                table: "Users",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "ArtistProfileId",
                table: "DiscossionPosts",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "GroupId",
                table: "DiscossionPosts",
                type: "uniqueidentifier",
                nullable: true);

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

            migrationBuilder.CreateIndex(
                name: "IX_Users_UserTypeId",
                table: "Users",
                column: "UserTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_DiscossionPosts_ArtistProfileId",
                table: "DiscossionPosts",
                column: "ArtistProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_DiscossionPosts_GroupId",
                table: "DiscossionPosts",
                column: "GroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_DiscossionPosts_ArtistsProfiles_ArtistProfileId",
                table: "DiscossionPosts",
                column: "ArtistProfileId",
                principalTable: "ArtistsProfiles",
                principalColumn: "ArtistProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_DiscossionPosts_Groups_GroupId",
                table: "DiscossionPosts",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "GroupId");

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
                name: "FK_DiscossionPosts_ArtistsProfiles_ArtistProfileId",
                table: "DiscossionPosts");

            migrationBuilder.DropForeignKey(
                name: "FK_DiscossionPosts_Groups_GroupId",
                table: "DiscossionPosts");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_UserTypes_UserTypeId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "UserTypes");

            migrationBuilder.DropIndex(
                name: "IX_Users_UserTypeId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_DiscossionPosts_ArtistProfileId",
                table: "DiscossionPosts");

            migrationBuilder.DropIndex(
                name: "IX_DiscossionPosts_GroupId",
                table: "DiscossionPosts");

            migrationBuilder.DropColumn(
                name: "UserTypeId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ArtistProfileId",
                table: "DiscossionPosts");

            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "DiscossionPosts");

            migrationBuilder.AlterColumn<string>(
                name: "UserName",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "Role",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
