using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VehicleServer.Migrations
{
    /// <inheritdoc />
    public partial class pool : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_PlatePool_PlatePoolId",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_PlatePoolId",
                table: "Items");

            migrationBuilder.AlterColumn<int>(
                name: "PlatePoolId",
                table: "Items",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Items_PlatePoolId",
                table: "Items",
                column: "PlatePoolId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Items_PlatePool_PlatePoolId",
                table: "Items",
                column: "PlatePoolId",
                principalTable: "PlatePool",
                principalColumn: "PlatePoolId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_PlatePool_PlatePoolId",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_PlatePoolId",
                table: "Items");

            migrationBuilder.AlterColumn<int>(
                name: "PlatePoolId",
                table: "Items",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Items_PlatePoolId",
                table: "Items",
                column: "PlatePoolId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_PlatePool_PlatePoolId",
                table: "Items",
                column: "PlatePoolId",
                principalTable: "PlatePool",
                principalColumn: "PlatePoolId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
