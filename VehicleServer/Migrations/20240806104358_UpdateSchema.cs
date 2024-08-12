using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VehicleServer.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSchema : Migration
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

            migrationBuilder.DropColumn(
                name: "PlatePoolId",
                table: "Items");

            migrationBuilder.AddColumn<int>(
                name: "PlatePoolId",
                table: "StockTransactions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsPlate",
                table: "Items",
                type: "bit",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_StockTransactions_PlatePoolId",
                table: "StockTransactions",
                column: "PlatePoolId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_StockTransactions_PlatePool_PlatePoolId",
                table: "StockTransactions",
                column: "PlatePoolId",
                principalTable: "PlatePool",
                principalColumn: "PlatePoolId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StockTransactions_PlatePool_PlatePoolId",
                table: "StockTransactions");

            migrationBuilder.DropIndex(
                name: "IX_StockTransactions_PlatePoolId",
                table: "StockTransactions");

            migrationBuilder.DropColumn(
                name: "PlatePoolId",
                table: "StockTransactions");

            migrationBuilder.DropColumn(
                name: "IsPlate",
                table: "Items");

            migrationBuilder.AddColumn<int>(
                name: "PlatePoolId",
                table: "Items",
                type: "int",
                nullable: false,
                defaultValue: 0);

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
    }
}
