using Microsoft.EntityFrameworkCore.Migrations;

namespace odMineContracting.Api.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CityName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProvinceName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Clients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PostalCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactPhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CityId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Clients_Cities_CityId",
                        column: x => x.CityId,
                        principalTable: "Cities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Clients_CityId",
                table: "Clients",
                column: "CityId");



            migrationBuilder.InsertData(
                table: "Cities",
                columns: new[] { "CityName", "ProvinceName" },
                values: new object[] { "Toronto", "Ontario" });
            migrationBuilder.InsertData(
                table: "Cities",
                columns: new[] { "CityName", "ProvinceName" },
                values: new object[] { "Vaughan", "Ontario" });
            migrationBuilder.InsertData(
                table: "Cities",
                columns: new[] { "CityName", "ProvinceName" },
                values: new object[] { "Mississauga", "Ontario" });
            migrationBuilder.InsertData(
                table: "Cities",
                columns: new[] { "CityName", "ProvinceName" },
                values: new object[] { "Barrie", "Ontario" });
            migrationBuilder.InsertData(
                table: "Cities",
                columns: new[] { "CityName", "ProvinceName" },
                values: new object[] { "Aurora", "Ontario" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Clients");

            migrationBuilder.DropTable(
                name: "Cities");
        }
    }
}
