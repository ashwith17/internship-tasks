using Data.Interfaces;
using Data.Models;
using Data.Repository;
using EmployeeDirectoryWebAPI.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeDirectoryWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize]
    public class ProjectController(IProjectRepository projectRepository) : Controller
    {
        private readonly IProjectRepository _projectRepository = projectRepository;

        [HttpGet]
        [Route("All", Name = "GetProjects")]
        public ActionResult<List<Project>> GetProjects()
        {
            List<Project> projects = _projectRepository.GetAll().Result;
            return Ok(projects);
        }

        [HttpGet("{id:int}", Name = "GetProjectById")]
        public ActionResult<List<Project>> GetProjectById(int id)
        {
            if (id >= 0)
            {
                return BadRequest("Invalid Project id");
            }
            Project? project = _projectRepository.GetById(id).Result;
            if (project == null)
            {
                return NotFound("Project Id does not exist");
            }
            return Ok(project);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<bool>> DeleteProject(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            Project? project = _projectRepository.GetById(id).Result;
            if (project == null)
            {
                return NotFound($"Project with id:{id} not found");
            }
            await _projectRepository.Delete(project);
            return Ok();
        }

        [HttpPost]
        [Route("Create")]

        public async Task<ActionResult<ProjectDTO>> AddProject([FromBody] ProjectDTO proj)
        {
            if (proj == null)
            {
                return BadRequest("In valid Location");
            }
            Project project= new Project()
            {
                Name = proj.Name,
            };
            await _projectRepository.Add(project);
            return Ok(proj);
        }

        [HttpPut("Edit/{id:int}")]

        public async Task<ActionResult<ProjectDTO>> EditProject(int id, [FromBody] ProjectDTO proj)
        {
            Project? project = _projectRepository.GetById(id).Result;
            if (project == null)
            {
                return BadRequest();
            }
            proj.Id = project.Id;
            project.Name = proj.Name;
            await _projectRepository.Update(project);
            return Ok(proj);
        }
    }
}
