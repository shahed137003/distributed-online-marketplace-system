using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace E_CommerceWebsite.DAL.Migrations
{
    /// <inheritdoc />
    public partial class totalpriceCart : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "ShoppingCart",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalPrice",
                table: "ShoppingCart",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "ShoppingCart");

            migrationBuilder.DropColumn(
                name: "TotalPrice",
                table: "ShoppingCart");
        }
    }
}
