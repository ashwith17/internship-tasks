using Data.Interfaces;
using Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ToDoAppWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TaskController(ITaskDetails taskDetails) : Controller
    {
        ITaskDetails _taskDetailsRepository=taskDetails;

        [HttpGet]
        [Route("All")]
        public ActionResult<List<Data.Models.TaskDetails>> GetAllTasks()
        {
            List<Data.Models.TaskDetails> tasks = _taskDetailsRepository.GetAll().Result;
            return Ok(tasks);
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<Data.Models.TaskDetails> GetTaskById(int id)
        {
            Data.Models.TaskDetails? task= _taskDetailsRepository.GetById(id).Result;
            if(task == null)
            {
                return BadRequest("Task not present");
            }
            return Ok(task);
        }

        [HttpGet]
        [Route("conditionalData")]
        public ActionResult<List<Task>> GetTasks([FromBody]Boolean status)
        {
            List<Data.Models.TaskDetails> tasks= _taskDetailsRepository.GetAll().Result.FindAll(x=>x.IsCompleted==status);
            return Ok(tasks);
        }

        [HttpPost]
        [Route("CreateTask")]
        public ActionResult<Data.Models.TaskDetails> CreateTask(int userId, DTO.TaskDTO taskDto)
        {
            if(taskDto == null)
            {
                return BadRequest("In Valid Task");
            }
            Data.Models.TaskDetails task = new()
            {
                Id = 0,
                Name = taskDto.Name,
                Description = taskDto.Description,
                TaskDate= DateOnly.FromDateTime(DateTime.Now),
                UserId = userId,
                IsCompleted=false,
                User=null
            };
            _taskDetailsRepository.Add(task);
            return Ok(task);
            
        }

        [HttpPut]
        [Route("Update")]
        public ActionResult<Data.Models.TaskDetails> UpdateTask(int taskId,[FromBody]DTO.TaskDTO taskDto)
        {
            if(taskDto == null )
            {
                return BadRequest("In Valid Task");
            }
            Data.Models.TaskDetails? task=_taskDetailsRepository.GetById(taskId).Result;
            if(task == null)
            {
                return NotFound($"Task with {taskId} is not present");
            }
            task.Name = taskDto.Name;
            task.Description = taskDto.Description;
            task.IsCompleted=taskDto.isCompleted;
            _taskDetailsRepository.Update(task);
            return Ok(task);
        }

        [HttpDelete]
        [Route("Delete")]

        public ActionResult DeleteTask(int taskId)
        {
            Data.Models.TaskDetails? task = _taskDetailsRepository.GetById(taskId).Result;
            if (task == null)
            {
                return NotFound("Task with {taskId} is not present");
            }

            _taskDetailsRepository.Delete(task);
            return Ok("Deleted Successfully");
        }


    }
}
