using Data.Interfaces;
using Data.Models;
using Data.Repository;
using EmployeeDirectoryWebAPI.DTO;
using EmployeeDirectoryWebAPI.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeDirectoryWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleDetailController(IRoleDetailRepository roleDetailRepository,IRoleProvider roleProvider) : Controller
    {
        private readonly IRoleDetailRepository _roleDetailRepository = roleDetailRepository;
        private readonly IRoleProvider _roleProvider = roleProvider;

        [HttpGet]
        [Route("All", Name = "GetRoleDetails")]
        public ActionResult<List<RoleDetail>> GetRoleDetails()
        {
            List<RoleDetail> roleDetails = _roleDetailRepository.GetAll().Result;
            return Ok(roleDetails);
        }

        [HttpGet("{id:int}", Name = "GetRoleDetailById")]
        public ActionResult<List<RoleDetail>> GetRoleDetailById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid RoleDetail id");
            }
            List<RoleDetail> roleDetail = _roleDetailRepository.GetRoleDetailsById(id).Result;
            if (roleDetail == null)
            {
                return NotFound("RoleDetail Id does not exist");
            }
            return Ok(roleDetail);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<bool> DeleteRoleDetail(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            RoleDetail? roleDetail = _roleDetailRepository.GetById(id).Result;
            if (roleDetail == null)
            {
                return NotFound($"RoleDetail with id:{id} not found");
            }
            return Ok(_roleDetailRepository.Delete(roleDetail));
        }

        [HttpPost]
        [Route("Create")]

        public async Task<ActionResult<RoleDetailDTO>> CreateRoleDetail([FromBody]RoleDetailDTO roleDetailDTO)
        {
            if (roleDetailDTO == null)
            {
                return BadRequest();
            }
            bool isValidRoleId = _roleProvider.IsValidRoleAsync(roleDetailDTO.RoleId.ToString(), nameof(Role.Id));
            bool isValidLocationId = _roleProvider.IsValidRoleAsync(roleDetailDTO.LocationId.ToString(), nameof(RoleDTO.Location));

            if ( isValidLocationId && isValidRoleId)
            { 
                RoleDetail roleDetail=new RoleDetail()
                {
                    RoleId= roleDetailDTO.RoleId,
                    LocationId= roleDetailDTO.LocationId,
                };
                await _roleDetailRepository.Add(roleDetail);
                return Ok(roleDetailDTO);
            }
            return BadRequest();
        }

    }
}
