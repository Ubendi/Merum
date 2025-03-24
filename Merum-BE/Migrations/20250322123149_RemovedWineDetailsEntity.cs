using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Merum_BE.Migrations
{
    /// <inheritdoc />
    public partial class RemovedWineDetailsEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WineEntities_WineDetailsEntity_WineDetailsEntityId",
                table: "WineEntities");

            migrationBuilder.DropTable(
                name: "WineDetailsEntity");

            migrationBuilder.DropIndex(
                name: "IX_WineEntities_WineDetailsEntityId",
                table: "WineEntities");

            migrationBuilder.DropColumn(
                name: "WineDetailsEntityId",
                table: "WineEntities");

            migrationBuilder.AddColumn<float>(
                name: "FreeSDioxideMgpl",
                table: "WineEntities",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Ph",
                table: "WineEntities",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "RealAlcoholPercent",
                table: "WineEntities",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "RelativeDensity",
                table: "WineEntities",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "TotalAcidGpl",
                table: "WineEntities",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "TotalAlcoholPercent",
                table: "WineEntities",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "TotalExtractGpl",
                table: "WineEntities",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "TotalSDioxideMgpl",
                table: "WineEntities",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "VolatileAcidGpl",
                table: "WineEntities",
                type: "real",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FreeSDioxideMgpl",
                table: "WineEntities");

            migrationBuilder.DropColumn(
                name: "Ph",
                table: "WineEntities");

            migrationBuilder.DropColumn(
                name: "RealAlcoholPercent",
                table: "WineEntities");

            migrationBuilder.DropColumn(
                name: "RelativeDensity",
                table: "WineEntities");

            migrationBuilder.DropColumn(
                name: "TotalAcidGpl",
                table: "WineEntities");

            migrationBuilder.DropColumn(
                name: "TotalAlcoholPercent",
                table: "WineEntities");

            migrationBuilder.DropColumn(
                name: "TotalExtractGpl",
                table: "WineEntities");

            migrationBuilder.DropColumn(
                name: "TotalSDioxideMgpl",
                table: "WineEntities");

            migrationBuilder.DropColumn(
                name: "VolatileAcidGpl",
                table: "WineEntities");

            migrationBuilder.AddColumn<int>(
                name: "WineDetailsEntityId",
                table: "WineEntities",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "WineDetailsEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FreeSDioxideMgpl = table.Column<float>(type: "real", nullable: true),
                    Ph = table.Column<float>(type: "real", nullable: true),
                    RealAlcoholPercent = table.Column<float>(type: "real", nullable: true),
                    RelativeDensity = table.Column<float>(type: "real", nullable: true),
                    TotalAcidGpl = table.Column<float>(type: "real", nullable: true),
                    TotalAlcoholPercent = table.Column<float>(type: "real", nullable: true),
                    TotalExtractGpl = table.Column<float>(type: "real", nullable: true),
                    TotalSDioxideMgpl = table.Column<float>(type: "real", nullable: true),
                    VolatileAcidGpl = table.Column<float>(type: "real", nullable: true),
                    WineId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WineDetailsEntity", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WineEntities_WineDetailsEntityId",
                table: "WineEntities",
                column: "WineDetailsEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_WineEntities_WineDetailsEntity_WineDetailsEntityId",
                table: "WineEntities",
                column: "WineDetailsEntityId",
                principalTable: "WineDetailsEntity",
                principalColumn: "Id");
        }
    }
}
