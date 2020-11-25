using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class seventh : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Histories",
                columns: table => new
                {
                    HistoryId = table.Column<string>(nullable: false),
                    ComponentId = table.Column<string>(nullable: true),
                    LastLoaned = table.Column<string>(nullable: true),
                    TimesLoaned = table.Column<int>(nullable: false),
                    TimesReserved = table.Column<int>(nullable: false),
                    TimesUnavailable = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Histories", x => x.HistoryId);
                    table.ForeignKey(
                        name: "FK_Histories_Components_ComponentId",
                        column: x => x.ComponentId,
                        principalTable: "Components",
                        principalColumn: "ComponentId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Histories_ComponentId",
                table: "Histories",
                column: "ComponentId",
                unique: true,
                filter: "[ComponentId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Histories");
        }
    }
}
