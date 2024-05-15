using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VehicleServer.Migrations
{
    /// <inheritdoc />
    public partial class missspeled : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "address",
                table: "Stores",
                newName: "Address");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Address",
                table: "Stores",
                newName: "address");
        }
    }
}
