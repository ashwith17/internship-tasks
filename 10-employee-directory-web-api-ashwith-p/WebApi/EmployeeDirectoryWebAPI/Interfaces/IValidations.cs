namespace EmployeeDirectoryWebAPI.Interfaces
{
    public interface IValidations
    {
        public  Task<bool> DepartmentValidation(int? id);
        public Task<bool> ProjectValidation(int? id);

        public Task<bool> LocationValidation(int? id);

        public Task<bool> RoleValidation(int? role);

        public Task<bool> ManagerValidation(string? id);

        public bool IsValidName(string name);

        public bool isValidDateOfBirth(string date);

        public bool IsValidEmail(string email);

        public bool IsValidMobileNumber(string mobileNumber);
    }
}
