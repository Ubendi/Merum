using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Merum_BE.Migrations
{
    /// <inheritdoc />
    public partial class AddedGrapeVarietyLinks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GrapeVarietyId",
                table: "WineEntities",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "GrapeVarietyEntities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GrapeVarietyEntities", x => x.Id);
                });

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
                name: "IX_WineEntities_GrapeVarietyId",
                table: "WineEntities",
                column: "GrapeVarietyId");

            migrationBuilder.CreateIndex(
                name: "IX_GrapeVarietyEntityLocationEntity_LocationEntitiesId",
                table: "GrapeVarietyEntityLocationEntity",
                column: "LocationEntitiesId");

            migrationBuilder.AddForeignKey(
                name: "FK_WineEntities_GrapeVarietyEntities_GrapeVarietyId",
                table: "WineEntities",
                column: "GrapeVarietyId",
                principalTable: "GrapeVarietyEntities",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WineEntities_GrapeVarietyEntities_GrapeVarietyId",
                table: "WineEntities");

            migrationBuilder.DropTable(
                name: "GrapeVarietyEntityLocationEntity");

            migrationBuilder.DropTable(
                name: "GrapeVarietyEntities");

            migrationBuilder.DropIndex(
                name: "IX_WineEntities_GrapeVarietyId",
                table: "WineEntities");

            migrationBuilder.DropColumn(
                name: "GrapeVarietyId",
                table: "WineEntities");
        }
    }
}
