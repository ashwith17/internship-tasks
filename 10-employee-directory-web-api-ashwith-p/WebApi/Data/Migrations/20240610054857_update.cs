using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Locations",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(70)",
                oldMaxLength: 70);

            migrationBuilder.AddColumn<int>(
                name: "LocationId1",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RoleDetails_LocationId",
                table: "RoleDetails",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_LocationId1",
                table: "Employees",
                column: "LocationId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Locations_LocationId1",
                table: "Employees",
                column: "LocationId1",
                principalTable: "Locations",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RoleDetails_Locations_LocationId",
                table: "RoleDetails",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Locations_LocationId1",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_RoleDetails_Locations_LocationId",
                table: "RoleDetails");

            migrationBuilder.DropIndex(
                name: "IX_RoleDetails_LocationId",
                table: "RoleDetails");

            migrationBuilder.DropIndex(
                name: "IX_Employees_LocationId1",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "LocationId1",
                table: "Employees");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Locations",
                type: "nvarchar(70)",
                maxLength: 70,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }
    }
}
