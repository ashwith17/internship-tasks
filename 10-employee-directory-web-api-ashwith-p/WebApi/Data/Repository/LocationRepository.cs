using Data.Interfaces;
using Data.Models;
namespace Data.Repository
{
    public class LocationRepository : GenericRepository<Location>, ILocationRepository
    {
        public LocationRepository(AshwithEmployeeDirectoryContext context) : base(context)
        {
        }
    }
}
