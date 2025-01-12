using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Merum_BE.Migrations
{
    /// <inheritdoc />
    public partial class RenameLocalEntitiesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WineEntities_LocationEntity_LocationEntityId",
                table: "WineEntities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LocationEntity",
                table: "LocationEntity");

            migrationBuilder.RenameTable(
                name: "LocationEntity",
                newName: "LocationEntities");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LocationEntities",
                table: "LocationEntities",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WineEntities_LocationEntities_LocationEntityId",
                table: "WineEntities",
                column: "LocationEntityId",
                principalTable: "LocationEntities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WineEntities_LocationEntities_LocationEntityId",
                table: "WineEntities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LocationEntities",
                table: "LocationEntities");

            migrationBuilder.RenameTable(
                name: "LocationEntities",
                newName: "LocationEntity");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LocationEntity",
                table: "LocationEntity",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WineEntities_LocationEntity_LocationEntityId",
                table: "WineEntities",
                column: "LocationEntityId",
                principalTable: "LocationEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
