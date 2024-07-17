using Data.Models;

namespace Data.Interfaces
{
    public interface IRoleDetailRepository:IGenericRepository<RoleDetail>
    {
        public Task<List<RoleDetail>> GetRoleDetailsById(int id);
    }
}
