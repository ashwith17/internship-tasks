using Data.Interfaces;
using Data.Models;
using EmployeeDirectoryWebAPI.Interfaces;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Text.RegularExpressions;
using System.Globalization;

namespace EmployeeDirectoryWebAPI.Providers
{
    public class Validations(IDepartmentRepository departmentRepository,IProjectRepository projectRepository,
        ILocationRepository locationRepository,IRoleRepository roleRepository,IEmployeeRepository employeeRepository):IValidations
    {
        private readonly IDepartmentRepository _departmentRepository=departmentRepository;
        private readonly IProjectRepository _projectRepository=projectRepository;
        private readonly ILocationRepository _locationRepository=locationRepository;
        private readonly IRoleRepository _roleRepository=roleRepository;
        private readonly IEmployeeRepository _employeeRepository=employeeRepository;
        public async Task<bool> DepartmentValidation(int? id)
        {
            return await _departmentRepository.GetById(id)!=null;
        }

        public async Task<bool> ProjectValidation(int? id)
        {
            return await _projectRepository.GetById(id) != null || id==null;
        }

        public async Task<bool> LocationValidation(int? id)
        {
            return await _locationRepository.GetById(id)!=null;
        }

        public async Task<bool> RoleValidation(int? role)
        {
            return await _roleRepository.GetById(role) != null;
        }
        public async Task<bool> ManagerValidation(string? id)
        {
            return await _employeeRepository.GetById(id) != null;
        }

        public bool IsValidName(string name)
        {
            return name.Length > 3;
        }

        public bool IsValidEmail(string email)
        {
            return Regex.IsMatch(email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase);
        }

        public bool isValidDateOfBirth(string date)
        {
            if (date.Length == 0)
            {
                return true;
            }
            if (!DateTime.TryParseExact(date, "dd/MM/yyyy", new CultureInfo("pt-BR"), DateTimeStyles.None, out DateTime dateOfBirth))
            {
                return false;
            }
            int age = DateTime.Now.Year - dateOfBirth.Year;
            if (dateOfBirth.Date.AddYears(age) > DateTime.Now)
                age--;
            return age>=18 && age<80;
        }

        public bool IsValidMobileNumber(string mobileNumber)
        {
            if (mobileNumber.Length == 0)
            {
                return true;
            }
            bool success = long.TryParse(mobileNumber, out long _);
            if (success && mobileNumber.Length == 10)
            {
                if (int.Parse(mobileNumber[0].ToString()) > 5)
                {
                    return true;
                }
            }
            return false;
        }

    }
}
