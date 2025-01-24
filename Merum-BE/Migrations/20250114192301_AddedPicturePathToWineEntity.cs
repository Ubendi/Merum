using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Merum_BE.Migrations
{
    /// <inheritdoc />
    public partial class AddedPicturePathToWineEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PicturePath",
                table: "WineEntities",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PicturePath",
                table: "WineEntities");
        }
    }
}
