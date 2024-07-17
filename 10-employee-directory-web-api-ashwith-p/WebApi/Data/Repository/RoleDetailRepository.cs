using Data.Interfaces;
using Data.Models;

namespace Data.Repository
{
    public class RoleDetailsRepository(AshwithEmployeeDirectoryContext context) : GenericRepository<RoleDetail>(context), IRoleDetailRepository
    {
        private readonly AshwithEmployeeDirectoryContext _context = context;

        public Task<List<RoleDetail>> GetRoleDetailsById(int id)
        {
            List<RoleDetail> result = GetAll().Result;
            List<RoleDetail> list = result.Where(s=>s.RoleId == id).ToList();
            return Task.FromResult(list);

        }
    }
}
