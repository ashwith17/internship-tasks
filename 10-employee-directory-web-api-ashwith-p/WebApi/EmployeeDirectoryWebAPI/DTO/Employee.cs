

using Data.Interfaces;
namespace EmployeeDirectoryWebAPI.DTO
{
        public class EmployeeDTO
        {
            public string Id { get; set; } = string.Empty;

            public string FirstName { get; set; } = string.Empty;

            public string LastName { get; set; } = string.Empty;

            public string? DateOfBirth { get; set; } 

            public string Email { get; set; } = string.Empty;

            public string? MobileNumber { get; set; } 

            public string JoiningDate { get; set; } = string.Empty;

            public int  DepartmentId { get; set; } 

            public int RoleId { get; set; }

            public int LocationId { get; set; } 

            public string? ManagerId { get; set; } 

            public int? ProjectId { get; set; }

        }

    }