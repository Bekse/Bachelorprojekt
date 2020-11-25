using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Components",
                columns: table => new
                {
                    ComponentId = table.Column<string>(nullable: false),
                    ComponentName = table.Column<string>(nullable: false),
                    ComponentLocation = table.Column<string>(nullable: false),
                    ComponentStatus = table.Column<int>(nullable: false),
                    ComponentInfo = table.Column<string>(nullable: true),
                    ComponentNumber = table.Column<int>(nullable: false),
                    Count = table.Column<int>(nullable: false),
                    AdminComment = table.Column<string>(nullable: true),
                    Datasheet = table.Column<string>(nullable: true),
                    WikiLink = table.Column<string>(nullable: true),
                    Manufacturer = table.Column<string>(nullable: true),
                    SerialNumber = table.Column<string>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Components", x => x.ComponentId);
                });

            migrationBuilder.CreateTable(
                name: "Loans",
                columns: table => new
                {
                    LoanId = table.Column<string>(nullable: false),
                    ComponentName = table.Column<string>(nullable: true),
                    ComponentId = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    Location = table.Column<string>(nullable: true),
                    LoanDate = table.Column<DateTime>(nullable: false),
                    ReturnDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Loans", x => x.LoanId);
                });

            migrationBuilder.CreateTable(
                name: "Reservations",
                columns: table => new
                {
                    ReservationId = table.Column<string>(nullable: false),
                    ComponentId = table.Column<string>(nullable: true),
                    ComponentName = table.Column<string>(nullable: true),
                    ComponentNumber = table.Column<string>(nullable: true),
                    AdminComment = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    ReservationDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservations", x => x.ReservationId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    FirstName = table.Column<string>(nullable: false),
                    LastName = table.Column<string>(nullable: false),
                    Email = table.Column<string>(nullable: false),
                    AuId = table.Column<string>(nullable: false),
                    StudentNumber = table.Column<int>(nullable: false),
                    PhoneNumber = table.Column<int>(nullable: false),
                    Role = table.Column<string>(nullable: true),
                    Token = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Components");

            migrationBuilder.DropTable(
                name: "Loans");

            migrationBuilder.DropTable(
                name: "Reservations");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
