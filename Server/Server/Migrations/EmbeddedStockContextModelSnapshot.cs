﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Server.Data;

namespace Server.Migrations
{
    [DbContext(typeof(EmbeddedStockContext))]
    partial class EmbeddedStockContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Server.Models.Category", b =>
                {
                    b.Property<string>("CategoryId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("CategoryName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CategoryId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Server.Models.Component", b =>
                {
                    b.Property<string>("ComponentId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("AdminComment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CategoryId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("CategoryName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ComponentInfo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ComponentLocation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ComponentName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ComponentNumber")
                        .HasColumnType("int");

                    b.Property<string>("ComponentStatus")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Count")
                        .HasColumnType("int");

                    b.Property<string>("Datasheet")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Manufacturer")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SerialNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("WikiLink")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ComponentId");

                    b.HasIndex("CategoryId");

                    b.ToTable("Components");
                });

            modelBuilder.Entity("Server.Models.History", b =>
                {
                    b.Property<string>("HistoryId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ComponentId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LastLoaned")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TimesLoaned")
                        .HasColumnType("int");

                    b.Property<int>("TimesReserved")
                        .HasColumnType("int");

                    b.Property<int>("TimesUnavailable")
                        .HasColumnType("int");

                    b.HasKey("HistoryId");

                    b.HasIndex("ComponentId")
                        .IsUnique()
                        .HasFilter("[ComponentId] IS NOT NULL");

                    b.ToTable("Histories");
                });

            modelBuilder.Entity("Server.Models.Loan", b =>
                {
                    b.Property<string>("LoanId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("AdminComment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ComponentId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ComponentName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ComponentNumber")
                        .HasColumnType("int");

                    b.Property<string>("LoanDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ReturnDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("LoanId");

                    b.ToTable("Loans");
                });

            modelBuilder.Entity("Server.Models.Reservation", b =>
                {
                    b.Property<string>("ReservationId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("AdminComment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ComponentId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ComponentInfo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ComponentName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ComponentNumber")
                        .HasColumnType("int");

                    b.Property<bool>("Loaned")
                        .HasColumnType("bit");

                    b.Property<string>("ReservationDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ReservedTo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ReservationId");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("Server.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("AuId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PhoneNumber")
                        .HasColumnType("int");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("StudentNumber")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Server.Models.Component", b =>
                {
                    b.HasOne("Server.Models.Category", null)
                        .WithMany("Components")
                        .HasForeignKey("CategoryId");
                });

            modelBuilder.Entity("Server.Models.History", b =>
                {
                    b.HasOne("Server.Models.Component", null)
                        .WithOne("History")
                        .HasForeignKey("Server.Models.History", "ComponentId");
                });
#pragma warning restore 612, 618
        }
    }
}
