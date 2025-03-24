using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Merum_BE.Migrations
{
    /// <inheritdoc />
    public partial class RemovedLocationsFromGrapeVarieties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GrapeVarietyEntityLocationEntity");

            migrationBuilder.AddColumn<string>(
                name: "GrapeVarietyEntityIds",
                table: "LocationEntities",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GrapeVarietyEntityIds",
                table: "LocationEntities");

            migrationBuilder.CreateTable(
                name: "GrapeVarietyEntityLocationEntity",
                columns: table => new
                {
                    GrapeVarietyEntitiesId = table.Column<int>(type: "int", nullable: false),
                    LocationEntitiesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GrapeVarietyEntityLocationEntity", x => new { x.GrapeVarietyEntitiesId, x.LocationEntitiesId });
                    table.ForeignKey(
                        name: "FK_GrapeVarietyEntityLocationEntity_GrapeVarietyEntities_GrapeVarietyEntitiesId",
                        column: x => x.GrapeVarietyEntitiesId,
                        principalTable: "GrapeVarietyEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GrapeVarietyEntityLocationEntity_LocationEntities_LocationEntitiesId",
                        column: x => x.LocationEntitiesId,
                        principalTable: "LocationEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GrapeVarietyEntityLocationEntity_LocationEntitiesId",
                table: "GrapeVarietyEntityLocationEntity",
                column: "LocationEntitiesId");
        }
    }
}
