using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class viewCreation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Locations_LocationId1",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_LocationId1",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "LocationId1",
                table: "Employees");
            migrationBuilder.Sql(@"
                    create view GetEmployees 
                AS
                select e1.Id 'Id',e1.FirstName,e1.LastName,e1.Email,e1.MobileNumber,e1.JoiningDate,Roles.Name  'Role',Locations.Name 'Location',Departments.Name 'Department',Projects.Name 'Project' 
                , e2.FirstName 'Manager' from Employees e1  LEFT JOIN  Employees e2 ON e1.ManagerId = e2.Id
                    LEFT join Roles on Roles.Id = e1.RoleId LEFT join Locations on Locations.Id=e1.LocationId LEFT join Departments on Departments.Id=e1.DepartmentId 
                LEFT join Projects on Projects.Id=e1.ProjectId;
                ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LocationId1",
                table: "Employees",
                type: "int",
                nullable: true);

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

            migrationBuilder.Sql(@"DROP VIEW GetEmployees");
        }
    }
}
