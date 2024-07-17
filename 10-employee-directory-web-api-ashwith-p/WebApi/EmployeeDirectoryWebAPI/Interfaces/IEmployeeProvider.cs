using EmployeeDirectoryWebAPI.DTO;

namespace EmployeeDirectoryWebAPI.Interfaces
{
    public interface IEmployeeProvider
    {

        public bool IsValidEmployeeAsync(string value, string type);

        public bool Validator(EmployeeDTO employee);

    }
}
