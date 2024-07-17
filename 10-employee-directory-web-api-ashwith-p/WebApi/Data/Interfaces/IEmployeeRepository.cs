using Data.Models;

namespace Data.Interfaces
{
    public interface IEmployeeRepository:IGenericRepository<Employee>
    {
        public Task<List<EmployeeInfo>> GetAllEmployees();
    }
}
