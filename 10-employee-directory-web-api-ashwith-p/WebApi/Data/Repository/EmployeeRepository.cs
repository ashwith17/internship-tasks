using Data.Interfaces;
using Data.Models;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using Data.Repository;

namespace Data.Repository
{
    public class EmployeeRepository : GenericRepository<Employee>, IEmployeeRepository
    {
        public AshwithEmployeeDirectoryContext _context { get; set; }
        public EmployeeRepository(AshwithEmployeeDirectoryContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<EmployeeInfo>> GetAllEmployees()
        {
            var data =  await _context.GetEmployees.ToListAsync();
            return data;
        }
    }

}
