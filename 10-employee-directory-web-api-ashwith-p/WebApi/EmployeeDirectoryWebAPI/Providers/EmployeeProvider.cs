using System.Text.RegularExpressions;
using System.Globalization;
using System.Reflection;
using Data.Interfaces;
using EmployeeDirectoryWebAPI;
using DataEmployee = Data.Models.Employee;
using EmployeeDirectoryWebAPI.Interfaces;
using EmployeeDirectoryWebAPI.DTO;
using Data.Repository;

//
namespace EmployeeDirectoryWebAPI.Providers
{
    public class EmployeeProvider(IValidations validations,IEmployeeRepository employeeRepository) : IEmployeeProvider
    {
        private readonly IValidations _validations=validations;
        private readonly IEmployeeRepository _employeeRepository=employeeRepository;
        public  bool IsValidEmployeeAsync(string value, string type) 
        {
            string data = value.Trim();

            switch (type)
            {

                case nameof(EmployeeDTO.FirstName):
                case nameof(EmployeeDTO.LastName):
                    return _validations.IsValidName(data);
                case nameof(EmployeeDTO.DateOfBirth):
                    
                    return _validations.isValidDateOfBirth(data);

                case nameof(EmployeeDTO.Email):
                    return _validations.IsValidEmail(data);

                case nameof(EmployeeDTO.MobileNumber):
                   return _validations.IsValidMobileNumber(data);

                case nameof(EmployeeDTO.JoiningDate):
                    if (!DateTime.TryParseExact(data, "dd/MM/yyyy", new CultureInfo("pt-BR"), DateTimeStyles.None, out DateTime joiningDate))
                    {
                        return false;
                    }
                    TimeSpan span = DateTime.Now - joiningDate;
                    return span.TotalDays > 0;

                case nameof(EmployeeDTO.LocationId):
                    return _validations.LocationValidation(int.Parse(data)).Result;
                case nameof(EmployeeDTO.RoleId):
                    return _validations.LocationValidation(int.Parse(data)).Result;

                case nameof(EmployeeDTO.DepartmentId):
                    return _validations.DepartmentValidation(int.Parse(data)).Result;
                case nameof(EmployeeDTO.ManagerId):
                    return  _validations.ManagerValidation(data).Result || data=="";
                case nameof(EmployeeDTO.ProjectId):
                    return _validations.ProjectValidation(int.Parse(data)).Result;

            }
            return false;
        }

        public bool Validator(EmployeeDTO employee)
        {
            bool isValidEmployee=true;
            Type type = typeof(EmployeeDTO);
            foreach (PropertyInfo prop in type.GetProperties())
            {
                if (!IsValidEmployeeAsync(Convert.ToString(prop.GetValue(employee))!, prop.Name))
                {
                    if(prop.Name!=nameof(EmployeeDTO.Id))
                    {
                        isValidEmployee = false;
                        break;
                    }
                   
                }
            }
            return isValidEmployee;
        } 
    }
}
