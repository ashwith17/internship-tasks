using Data.Interfaces;
using Data.Models;
using Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using ToDoAppWebApi.DTO;


namespace Domain.Providers
{

    public class TaskProvider(ITaskDetails taskDetails, IHttpContextAccessor httpContextAccessor):ITaskProvider
    {
        private readonly ITaskDetails _taskDetailsRepository = taskDetails;
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;

        public List<TaskDetails> GetAll()
        {
            int userId = GetUserId();
            return _taskDetailsRepository.GetAll().Result.Where(s => s.UserId == userId).ToList();
        }

        public TaskDetails? GetTaskById(int id)
        {
            return _taskDetailsRepository.GetById(id).Result;
        }

        public List<TaskDetails> GetTasks( bool status)
        {
            int id = GetUserId();
            return _taskDetailsRepository.GetAll().Result.FindAll(x => x.IsCompleted == status).Where(u => u.UserId == id).ToList();
        }

        public async Task<TaskDetails> CreateTask(int userId, TaskDTO taskDto)
        {
            TaskDetails task = new()
            {
                Id = 0,
                Name = taskDto.Name,
                Description = taskDto.Description,
                TaskDate = DateTime.Now,
                UserId = userId,
                IsCompleted = false,
                User = null
            };
            await _taskDetailsRepository.Add(task);
            return task;

        }

        public async Task<TaskDetails> UpdateTask(int taskId, TaskDTO taskDto, TaskDetails task)
        {
            task.Name = taskDto.Name;
            task.Description = taskDto.Description;
            task.IsCompleted = taskDto.isCompleted;

            await _taskDetailsRepository.Update(task);
            return task;
        }

        public async Task<List<string>> DeleteTask(TaskDetails task)
        {

            await _taskDetailsRepository.Delete(task);
            return new List<string>(["message", "Deleted Successfully"]);
        }



        public int GetUserId()
        {
            try
            {
                var context = _httpContextAccessor.HttpContext;

                if (context == null)
                {
                    throw new InvalidOperationException("HttpContext is not available");
                }

                string? token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

                if (string.IsNullOrEmpty(token))
                {
                    throw new InvalidOperationException("Authorization token is missing");
                }

                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtTokenObj = tokenHandler.ReadJwtToken(token);

                var userIdClaim = jwtTokenObj.Claims.FirstOrDefault(c => c.Type == "UserId");

                if (userIdClaim == null)
                {
                    throw new InvalidOperationException("UserId claim is missing in the token");
                }

                return int.Parse(userIdClaim.Value);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

    }
}
