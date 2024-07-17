
using Data.Interfaces;
using Data.Models;

namespace Data.Repository
{
    public class RoleRepository : GenericRepository<Role>, IRoleRepository
    {
        public RoleRepository(AshwithEmployeeDirectoryContext context) : base(context)
        {
        }
    }
}
