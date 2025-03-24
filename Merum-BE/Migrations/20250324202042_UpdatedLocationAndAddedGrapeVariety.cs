using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Merum_BE.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedLocationAndAddedGrapeVariety : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Desc",
                table: "LocationEntities",
                newName: "SoilType");

            migrationBuilder.AddColumn<int>(
                name: "Altitude",
                table: "LocationEntities",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "CultivationMode",
                table: "LocationEntities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Grade",
                table: "LocationEntities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LineDistance",
                table: "LocationEntities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Orientation",
                table: "LocationEntities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PlantationMethod",
                table: "LocationEntities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "LocationEntities",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Altitude",
                table: "LocationEntities");

            migrationBuilder.DropColumn(
                name: "CultivationMode",
                table: "LocationEntities");

            migrationBuilder.DropColumn(
                name: "Grade",
                table: "LocationEntities");

            migrationBuilder.DropColumn(
                name: "LineDistance",
                table: "LocationEntities");

            migrationBuilder.DropColumn(
                name: "Orientation",
                table: "LocationEntities");

            migrationBuilder.DropColumn(
                name: "PlantationMethod",
                table: "LocationEntities");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "LocationEntities");

            migrationBuilder.RenameColumn(
                name: "SoilType",
                table: "LocationEntities",
                newName: "Desc");
        }
    }
}
