using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Merum_BE.Migrations
{
    /// <inheritdoc />
    public partial class AddedNewWineDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "SugarFreeExtract",
                table: "WineEntities",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "TitratableAcid",
                table: "WineEntities",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "TotalSugar",
                table: "WineEntities",
                type: "real",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SugarFreeExtract",
                table: "WineEntities");

            migrationBuilder.DropColumn(
                name: "TitratableAcid",
                table: "WineEntities");

            migrationBuilder.DropColumn(
                name: "TotalSugar",
                table: "WineEntities");
        }
    }
}
