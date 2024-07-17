using Data.Interfaces;
using Data.Models;


namespace Data.Repository
{
    public class ProjectRepository : GenericRepository<Project>, IProjectRepository
    {
        public ProjectRepository(AshwithEmployeeDirectoryContext context) : base(context)
        {
        }
    }
}
