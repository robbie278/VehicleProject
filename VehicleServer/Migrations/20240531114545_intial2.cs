using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VehicleServer.Migrations
{
    /// <inheritdoc />
    public partial class intial2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StockTransactions_Items_ItemId",
                table: "StockTransactions");

            migrationBuilder.AddForeignKey(
                name: "FK_StockTransactions_Items_ItemId",
                table: "StockTransactions",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "ItemId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StockTransactions_Items_ItemId",
                table: "StockTransactions");

            migrationBuilder.AddForeignKey(
                name: "FK_StockTransactions_Items_ItemId",
                table: "StockTransactions",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "ItemId");
        }
    }
}
