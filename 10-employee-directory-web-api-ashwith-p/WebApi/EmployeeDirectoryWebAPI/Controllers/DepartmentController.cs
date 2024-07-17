using Data.Interfaces;
using Data.Models;
using Data.Repository;
using EmployeeDirectoryWebAPI.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DepartmentDirectoryWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize]
    public class DepartmentController(IDepartmentRepository departmentRepository) : Controller
    {

        private readonly IDepartmentRepository _departmentRepository=departmentRepository;

        [HttpGet]
        [Route("All", Name = "GetDepartments")]
        public ActionResult<List<Department>> GetDepartments()
        {
            List<Department> departments = _departmentRepository.GetAll().Result;
            return Ok(departments);
        }

        [HttpGet("{id:int}", Name = "GetDepartmentById")]
        public ActionResult<List<Department>> GetDepartmentById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid Department id");
            }
            Department? department = _departmentRepository.GetById(id).Result;
            if (department == null)
            {
                return NotFound("Department Id does not exist");
            }
            return Ok(department);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<bool>> DeleteDepartment(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            Department? department = _departmentRepository.GetById(id).Result;
            if (department == null)
            {
                return NotFound($"Department with id:{id} not found");
            }
            await _departmentRepository.Delete(department);
            return Ok();
        }

        [HttpPost]
        [Route("Create")]

        public async Task<ActionResult<DepartmentDTO>> AddDepartment([FromBody] DepartmentDTO dept)
        {
            if (dept == null)
            {
                return BadRequest("In valid Location");
            }
            Department department = new Department()
            {
                Name = dept.Name,
            };
            await _departmentRepository.Add(department);
            return Ok(dept);
        }

        [HttpPut("Edit/{id:int}")]

        public async Task<ActionResult<DepartmentDTO>> EditDepartment(int id, [FromBody] DepartmentDTO dept)
        {
            Department? department=_departmentRepository.GetById(id).Result;
            if(department == null)
            {
                return BadRequest();
            }
            dept.Id=department.Id;
            department.Name = dept.Name;
            await _departmentRepository.Update(department);
            return Ok(dept);
        }
    }
}
