using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class twelvth : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "Loans");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Loans",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
