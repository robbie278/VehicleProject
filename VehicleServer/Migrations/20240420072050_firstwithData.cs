using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace VehicleServer.Migrations
{
    /// <inheritdoc />
    public partial class firstwithData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "Stores",
                columns: table => new
                {
                    StoreId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    address = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stores", x => x.StoreId);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    ItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Availability = table.Column<bool>(type: "bit", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.ItemId);
                    table.ForeignKey(
                        name: "FK_Items_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StoreKeepers",
                columns: table => new
                {
                    StoreKeeperId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoreKeepers", x => x.StoreKeeperId);
                    table.ForeignKey(
                        name: "FK_StoreKeepers_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ItemStore",
                columns: table => new
                {
                    ItemsItemId = table.Column<int>(type: "int", nullable: false),
                    StoresStoreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemStore", x => new { x.ItemsItemId, x.StoresStoreId });
                    table.ForeignKey(
                        name: "FK_ItemStore_Items_ItemsItemId",
                        column: x => x.ItemsItemId,
                        principalTable: "Items",
                        principalColumn: "ItemId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItemStore_Stores_StoresStoreId",
                        column: x => x.StoresStoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "CategoryId", "Description", "Name" },
                values: new object[,]
                {
                    { 1, null, "Bolo" },
                    { 2, null, "Libery" },
                    { 3, null, "Ticket" },
                    { 4, null, "Licence" }
                });

            migrationBuilder.InsertData(
                table: "Stores",
                columns: new[] { "StoreId", "Name", "address" },
                values: new object[,]
                {
                    { 1, "AradaStore", "Piassa" },
                    { 2, "LaftoStore", "Gofa" },
                    { 3, "KalityStore", "Kality" }
                });

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "ItemId", "Availability", "CategoryId", "Description", "Name", "Quantity" },
                values: new object[,]
                {
                    { 1, true, 3, null, "Type1", 500 },
                    { 2, true, 3, null, "Type2", 700 },
                    { 3, true, 4, null, "Taxi", 2300 },
                    { 4, true, 4, null, "Private", 6480 }
                });

            migrationBuilder.InsertData(
                table: "StoreKeepers",
                columns: new[] { "StoreKeeperId", "Email", "Name", "StoreId" },
                values: new object[,]
                {
                    { 1, "kaleab@email.com", "Kaleab", 2 },
                    { 2, "yabsera@email.com", "Yabsera", 3 },
                    { 3, "robera@email.com", "Robera", 1 }
                });

            migrationBuilder.InsertData(
                table: "ItemStore",
                columns: new[] { "ItemsItemId", "StoresStoreId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 1, 3 },
                    { 2, 3 },
                    { 3, 1 },
                    { 3, 2 },
                    { 3, 3 },
                    { 4, 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Items_CategoryId",
                table: "Items",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemStore_StoresStoreId",
                table: "ItemStore",
                column: "StoresStoreId");

            migrationBuilder.CreateIndex(
                name: "IX_StoreKeepers_StoreId",
                table: "StoreKeepers",
                column: "StoreId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemStore");

            migrationBuilder.DropTable(
                name: "StoreKeepers");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Stores");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
