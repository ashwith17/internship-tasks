using Microsoft.AspNetCore.Mvc;

namespace ToDoAppWebApi.DTO
{
    public class TaskDTO 
    {
        public string Name { get; set; }=string.Empty;

        public string Description { get; set; } = string.Empty;

        public Boolean isCompleted { get; set; } = false;

        public int id { get; set; } = 0;

        public DateTime dateTime { get; set; }

    }
}
