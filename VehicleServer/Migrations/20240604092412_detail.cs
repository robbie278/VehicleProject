using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VehicleServer.Migrations
{
    /// <inheritdoc />
    public partial class detail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "PadNumberEnd",
                table: "StockTransactions",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "StockTransactionsDetail",
                columns: table => new
                {
                    StockTransactionDetailId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ItemId = table.Column<int>(type: "int", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    StoreKeeperId = table.Column<int>(type: "int", nullable: false),
                    TransactionType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PadNumber = table.Column<int>(type: "int", nullable: false),
                    TransactionDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockTransactionsDetail", x => x.StockTransactionDetailId);
                    table.ForeignKey(
                        name: "FK_StockTransactionsDetail_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "ItemId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StockTransactionsDetail_StoreKeepers_StoreKeeperId",
                        column: x => x.StoreKeeperId,
                        principalTable: "StoreKeepers",
                        principalColumn: "StoreKeeperId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StockTransactionsDetail_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StockTransactionsDetail_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_StockTransactionsDetail_ItemId",
                table: "StockTransactionsDetail",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_StockTransactionsDetail_StoreId",
                table: "StockTransactionsDetail",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_StockTransactionsDetail_StoreKeeperId",
                table: "StockTransactionsDetail",
                column: "StoreKeeperId");

            migrationBuilder.CreateIndex(
                name: "IX_StockTransactionsDetail_UserId",
                table: "StockTransactionsDetail",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StockTransactionsDetail");

            migrationBuilder.AlterColumn<int>(
                name: "PadNumberEnd",
                table: "StockTransactions",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
