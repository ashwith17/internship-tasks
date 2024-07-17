using Data.Interfaces;
using Data.Models;
using Microsoft.AspNetCore.Mvc;
using EmployeeDirectoryWebAPI.DTO;
using Data.Repository;
using Microsoft.AspNetCore.Authorization;

namespace EmployeeDirectoryWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize]
    public class LocationController(ILocationRepository locationRepository) : Controller
    {
        private readonly ILocationRepository _locationRepository = locationRepository;

        [HttpGet]
        [Route("All", Name = "GetLocations")]
        public ActionResult<List<Location>> GetDepartments()
        {
            // use async and await
            List<Location> locations = _locationRepository.GetAll().Result;
            return Ok(locations);
        }

        [HttpGet("{id:int}", Name = "GetLocationById")]
        public ActionResult<List<Location>> GetLocationById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid Location id");
            }
            Location? location = _locationRepository.GetById(id).Result;
            if (location == null)
            {
                return NotFound("Location Id does not exist");
            }
            return Ok(location);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<bool>> DeleteLocation(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            Location? location = _locationRepository.GetById(id).Result;
            if (location == null)
            {
                return NotFound($"Location with id:{id} not found");
            }
            await _locationRepository.Delete(location);
            return Ok();
        }

        [HttpPost]
        [Route("Create")]
       
        public async Task<ActionResult<Location>> AddLocation([FromBody]LocationDTO location)
        {
            if(location == null)
            {
                return BadRequest("In valid Location");
            }
            Location loc =new Location()
            {
                Name = location.Name,
            };
            await _locationRepository.Add(loc);
            return Ok(location);
        }

        [HttpPut("Edit/{id:int}")]

        public async Task<ActionResult<LocationDTO>> EditLocation(int id, [FromBody] LocationDTO loc)
        {
            Location? location = _locationRepository.GetById(id).Result;
            if (location == null)
            {
                return BadRequest();
            }
            loc.Id=location.Id;
            location.Name = loc.Name;
            await _locationRepository.Update(location);
            return Ok(loc);
        }

    }
}
