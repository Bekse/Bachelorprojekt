using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class ninth : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ComponentCategory",
                table: "Components");

            migrationBuilder.AddColumn<string>(
                name: "CategoryId",
                table: "Components",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryId = table.Column<string>(nullable: false),
                    CategoryName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Components_CategoryId",
                table: "Components",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Components_Categories_CategoryId",
                table: "Components",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Components_Categories_CategoryId",
                table: "Components");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Components_CategoryId",
                table: "Components");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Components");

            migrationBuilder.AddColumn<string>(
                name: "ComponentCategory",
                table: "Components",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
