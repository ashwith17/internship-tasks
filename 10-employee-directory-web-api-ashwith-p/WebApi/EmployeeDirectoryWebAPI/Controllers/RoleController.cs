using Data.Interfaces;
using Data.Models;
using Data.Repository;
using EmployeeDirectoryWebAPI.DTO;
using EmployeeDirectoryWebAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeDirectoryWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize]
    public class RoleController(IRoleRepository roleRepository, IRoleDetailRepository roleDetailRepository, IRoleProvider roleProvider) : Controller
    {
        private readonly IRoleRepository _roleRepository = roleRepository;
        private readonly IRoleDetailRepository _roleDetailRepository = roleDetailRepository;
        private readonly IRoleProvider _roleProvider = roleProvider;

        [HttpGet]
        [Route("All", Name = "GetRoles")]
        public ActionResult<List<RoleDTO>> GetRoles()
        {
            List<Role> roles = _roleRepository.GetAll().Result;
            List<RoleDTO> rolesDTO = new List<RoleDTO>();
            foreach (Role role in roles)    
            {
                RoleDTO dummy = new RoleDTO();
                dummy.Id=role.Id;
                dummy.Name = role.Name;
                dummy.Description = role.Description;
                dummy.Department = role.DepartmentId;
                dummy.Location=(_roleDetailRepository.GetRoleDetailsById(role.Id).Result).Select(s=>s.LocationId).ToList();

                rolesDTO.Add(dummy);
            }
            return Ok(rolesDTO);
        }

        [HttpGet("{id:int}", Name = "GetRoleById")]
        public ActionResult<List<Role>> GetRoleById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid Role id");
            }
            Role? role = _roleRepository.GetById(id).Result;
            if (role == null)
            {
                return NotFound("Role Id does not exist");
            }
            return Ok(role);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<bool>> DeleteRole(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            Role? role = _roleRepository.GetById(id).Result;
            if (role == null)
            {
                return NotFound($"Role with id:{id} not found");
            }
            await _roleRepository.Delete(role);
            return Ok();
        }

        [HttpPost]
        [Route("Create")]

        public async Task<ActionResult<RoleDTO>> AddRole([FromBody] RoleDTO roleDTO)
        {
            if (roleDTO == null)
            {
                return BadRequest();
            }
            if (!_roleProvider.Validator(roleDTO))
            {
                return BadRequest();
            }
            Role role = new Role()
            {
                DepartmentId = roleDTO.Department,
                Name = roleDTO.Name,
                Description = roleDTO.Description,
            };

            await _roleRepository.Add(role);
            RoleDetail roleDetail = new RoleDetail()
            {
                RoleId = role.Id,
                LocationId = roleDTO.Location[0]
            };
            await _roleDetailRepository.Add(roleDetail);
            return Ok(roleDTO);
        }

        [HttpPut("Edit/{id:int}")]
        public async Task<ActionResult<RoleDTO>> EditRole(int id, [FromBody] RoleDTO roleDTO)
        {
            Role? role = await _roleRepository.GetById(id);
            if (role == null)
            {
                return BadRequest();
            }
            if (_roleProvider.Validator(roleDTO))
            {
                role.Name = roleDTO.Name;
                role.Description = roleDTO.Description;
                role.DepartmentId = roleDTO.Department;
                RoleDetail? roleDetail = _roleDetailRepository.GetAll().Result.Where(id => role.Id == id.RoleId).FirstOrDefault();
                if (roleDetail != null)
                {
                    roleDetail.LocationId = roleDTO.Location[0];
                    await _roleDetailRepository.Update(roleDetail);
                }
                await _roleRepository.Update(role);
            }
            return Ok(roleDTO);
        }
    }
}
