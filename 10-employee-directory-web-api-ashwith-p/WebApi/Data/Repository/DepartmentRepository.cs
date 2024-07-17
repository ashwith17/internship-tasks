using Data.Interfaces;
using Data.Models;
using Data.Repository;

namespace Data.Repository
{
    public class DepartmentRepository : GenericRepository<Department>, IDepartmentRepository
    {
        public DepartmentRepository(AshwithEmployeeDirectoryContext context) : base(context)
        {
        }
    }
}
