using EmployeeDirectoryWebAPI.DTO;

namespace EmployeeDirectoryWebAPI.Interfaces
{
    public interface IRoleProvider
    {
        public bool IsValidRoleAsync(string value, string key);

        public bool Validator(RoleDTO roleDTO);

    }
}
