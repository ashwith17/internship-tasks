using Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repository
{
    public class TaskDetailsRepository(ToDoAppDbContext context) : GenericRepository<Data.Models.TaskDetails>(context), ITaskDetails
    {
    }
}
