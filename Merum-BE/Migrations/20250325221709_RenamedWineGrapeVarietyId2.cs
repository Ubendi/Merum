using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Merum_BE.Migrations
{
    /// <inheritdoc />
    public partial class RenamedWineGrapeVarietyId2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WineEntities_GrapeVarietyEntities_GrapeVarietyId",
                table: "WineEntities");

            migrationBuilder.RenameColumn(
                name: "GrapeVarietyId",
                table: "WineEntities",
                newName: "GrapeVarietyEntityId");

            migrationBuilder.RenameIndex(
                name: "IX_WineEntities_GrapeVarietyId",
                table: "WineEntities",
                newName: "IX_WineEntities_GrapeVarietyEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_WineEntities_GrapeVarietyEntities_GrapeVarietyEntityId",
                table: "WineEntities",
                column: "GrapeVarietyEntityId",
                principalTable: "GrapeVarietyEntities",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WineEntities_GrapeVarietyEntities_GrapeVarietyEntityId",
                table: "WineEntities");

            migrationBuilder.RenameColumn(
                name: "GrapeVarietyEntityId",
                table: "WineEntities",
                newName: "GrapeVarietyId");

            migrationBuilder.RenameIndex(
                name: "IX_WineEntities_GrapeVarietyEntityId",
                table: "WineEntities",
                newName: "IX_WineEntities_GrapeVarietyId");

            migrationBuilder.AddForeignKey(
                name: "FK_WineEntities_GrapeVarietyEntities_GrapeVarietyId",
                table: "WineEntities",
                column: "GrapeVarietyId",
                principalTable: "GrapeVarietyEntities",
                principalColumn: "Id");
        }
    }
}
