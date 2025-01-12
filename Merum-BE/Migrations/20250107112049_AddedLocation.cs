using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Merum_BE.Migrations
{
    /// <inheritdoc />
    public partial class AddedLocation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LocantionEntityId",
                table: "WineEntities",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "LocationEntityId",
                table: "WineEntities",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "LocationEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Area = table.Column<int>(type: "int", nullable: false),
                    Desc = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LocationEntity", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WineEntities_LocationEntityId",
                table: "WineEntities",
                column: "LocationEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_WineEntities_LocationEntity_LocationEntityId",
                table: "WineEntities",
                column: "LocationEntityId",
                principalTable: "LocationEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WineEntities_LocationEntity_LocationEntityId",
                table: "WineEntities");

            migrationBuilder.DropTable(
                name: "LocationEntity");

            migrationBuilder.DropIndex(
                name: "IX_WineEntities_LocationEntityId",
                table: "WineEntities");

            migrationBuilder.DropColumn(
                name: "LocantionEntityId",
                table: "WineEntities");

            migrationBuilder.DropColumn(
                name: "LocationEntityId",
                table: "WineEntities");
        }
    }
}
