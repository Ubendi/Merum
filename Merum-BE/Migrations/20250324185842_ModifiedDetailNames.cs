using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Merum_BE.Migrations
{
    /// <inheritdoc />
    public partial class ModifiedDetailNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "VolatileAcidGpl",
                table: "WineEntities",
                newName: "VolatileAcid");

            migrationBuilder.RenameColumn(
                name: "TotalSDioxideMgpl",
                table: "WineEntities",
                newName: "TotalSDiox");

            migrationBuilder.RenameColumn(
                name: "TotalExtractGpl",
                table: "WineEntities",
                newName: "TotalExtract");

            migrationBuilder.RenameColumn(
                name: "TotalAlcoholPercent",
                table: "WineEntities",
                newName: "TotalAlc");

            migrationBuilder.RenameColumn(
                name: "TotalAcidGpl",
                table: "WineEntities",
                newName: "TotalAcid");

            migrationBuilder.RenameColumn(
                name: "RelativeDensity",
                table: "WineEntities",
                newName: "RelativeDens");

            migrationBuilder.RenameColumn(
                name: "RealAlcoholPercent",
                table: "WineEntities",
                newName: "RealAlc");

            migrationBuilder.RenameColumn(
                name: "FreeSDioxideMgpl",
                table: "WineEntities",
                newName: "FreeSDiox");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "VolatileAcid",
                table: "WineEntities",
                newName: "VolatileAcidGpl");

            migrationBuilder.RenameColumn(
                name: "TotalSDiox",
                table: "WineEntities",
                newName: "TotalSDioxideMgpl");

            migrationBuilder.RenameColumn(
                name: "TotalExtract",
                table: "WineEntities",
                newName: "TotalExtractGpl");

            migrationBuilder.RenameColumn(
                name: "TotalAlc",
                table: "WineEntities",
                newName: "TotalAlcoholPercent");

            migrationBuilder.RenameColumn(
                name: "TotalAcid",
                table: "WineEntities",
                newName: "TotalAcidGpl");

            migrationBuilder.RenameColumn(
                name: "RelativeDens",
                table: "WineEntities",
                newName: "RelativeDensity");

            migrationBuilder.RenameColumn(
                name: "RealAlc",
                table: "WineEntities",
                newName: "RealAlcoholPercent");

            migrationBuilder.RenameColumn(
                name: "FreeSDiox",
                table: "WineEntities",
                newName: "FreeSDioxideMgpl");
        }
    }
}
