using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class fifth : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AdminComment",
                table: "Loans",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ComponentNumber",
                table: "Loans",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdminComment",
                table: "Loans");

            migrationBuilder.DropColumn(
                name: "ComponentNumber",
                table: "Loans");
        }
    }
}
