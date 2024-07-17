using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoAppWebApi.DTO;

namespace Domain.Interfaces
{
    public interface ITaskProvider
    {
        public List<TaskDetails> GetAll();

        public TaskDetails? GetTaskById(int id);

        public List<TaskDetails> GetTasks(bool status);

        public Task<TaskDetails> UpdateTask(int taskId, TaskDTO taskDto, TaskDetails task);

        public Task<List<string>> DeleteTask(TaskDetails task);

        public int GetUserId();

        public Task<TaskDetails> CreateTask(int userId, TaskDTO taskDto);

    }
}
