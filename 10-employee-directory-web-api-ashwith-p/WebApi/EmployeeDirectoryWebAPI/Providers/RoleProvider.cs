using Data.Interfaces;
using System.Reflection;

using DataRole = Data.Models.Role;
using System.ComponentModel.DataAnnotations;
using EmployeeDirectoryWebAPI.DTO;
using Data.Models;
using EmployeeDirectoryWebAPI.Interfaces;

namespace Domain.Providers
{
    public class RoleProvider(IValidations validations) : IRoleProvider
    {
        private readonly IValidations _validations=validations;
        public bool IsValidRoleAsync(string value, string key)
        {
            string data = value.Trim();
            switch (key)
            {
                case nameof(Role.Id):
                    return _validations.RoleValidation(int.Parse(data)).Result;
                case nameof(RoleDTO.Name):
                    return _validations.IsValidName(data);
                case nameof(RoleDTO.Description):
                    return true;
                case nameof(RoleDTO.Location):
                    return _validations.LocationValidation(int.Parse(data)).Result;
                case nameof(RoleDTO.Department):
                    return _validations.DepartmentValidation(int.Parse(data)).Result;
                default: return false;
            }
        }

        public bool Validator(RoleDTO roleDTO)
        {
            bool isValid;
            isValid = this.IsValidRoleAsync(roleDTO.Name, nameof(RoleDTO.Name)) && this.IsValidRoleAsync(roleDTO.Department.ToString(),nameof(RoleDTO.Department)) &&
                this.IsValidRoleAsync(roleDTO.Location[0].ToString(), nameof(RoleDTO.Location));
            return isValid;
        }

        //public List<string> SetData(DTO.Role role)
        //{
        //    List<string> errorList = [];
        //    Type type = typeof(DTO.Role);
        //    foreach (PropertyInfo prop in type.GetProperties())
        //    {
        //        if (!IsValidRole(Convert.ToString(prop.GetValue(role))!, prop.Name))
        //        {
        //            errorList.Add(prop.Name);
        //        }
        //    }
        //    return errorList;
        //}

        //public string GetLocationById(int id)
        //{
        //    return _locationProvider.GetLocationById(id).Name;
        //}

        //public string GetDepartmentById(int id)
        //{
        //    return _departmentProvider.GetDepartment(id)!.Name;
        //}
    }
}
