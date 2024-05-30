using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VehicleServer.Migrations
{
    /// <inheritdoc />
    public partial class setnull13 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StockTransactions_StoreKeepers_StoreKeeperId",
                table: "StockTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_StockTransactions_Stores_StoreId",
                table: "StockTransactions");

            migrationBuilder.AddForeignKey(
                name: "FK_StockTransactions_StoreKeepers_StoreKeeperId",
                table: "StockTransactions",
                column: "StoreKeeperId",
                principalTable: "StoreKeepers",
                principalColumn: "StoreKeeperId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StockTransactions_Stores_StoreId",
                table: "StockTransactions",
                column: "StoreId",
                principalTable: "Stores",
                principalColumn: "StoreId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StockTransactions_StoreKeepers_StoreKeeperId",
                table: "StockTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_StockTransactions_Stores_StoreId",
                table: "StockTransactions");

            migrationBuilder.AddForeignKey(
                name: "FK_StockTransactions_StoreKeepers_StoreKeeperId",
                table: "StockTransactions",
                column: "StoreKeeperId",
                principalTable: "StoreKeepers",
                principalColumn: "StoreKeeperId",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_StockTransactions_Stores_StoreId",
                table: "StockTransactions",
                column: "StoreId",
                principalTable: "Stores",
                principalColumn: "StoreId",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
