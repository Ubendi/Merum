using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Merum_BE.Migrations
{
    /// <inheritdoc />
    public partial class AddedWineDetailsEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Alcohol",
                table: "WineEntities");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "WineEntities",
                type: "nvarchar(max)",
                nullable: true);

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
                    WineId = table.Column<int>(type: "int", nullable: false),
                    RelativeDensity = table.Column<float>(type: "real", nullable: true),
                    TotalAlcoholPercent = table.Column<float>(type: "real", nullable: true),
                    RealAlcoholPercent = table.Column<float>(type: "real", nullable: true),
                    TotalExtractGpl = table.Column<float>(type: "real", nullable: true),
                    TotalAcidGpl = table.Column<float>(type: "real", nullable: true),
                    VolatileAcidGpl = table.Column<float>(type: "real", nullable: true),
                    TotalSDioxideMgpl = table.Column<float>(type: "real", nullable: true),
                    FreeSDioxideMgpl = table.Column<float>(type: "real", nullable: true),
                    Ph = table.Column<float>(type: "real", nullable: true)
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                name: "Description",
                table: "WineEntities");

            migrationBuilder.DropColumn(
                name: "WineDetailsEntityId",
                table: "WineEntities");

            migrationBuilder.AddColumn<float>(
                name: "Alcohol",
                table: "WineEntities",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }
    }
}
