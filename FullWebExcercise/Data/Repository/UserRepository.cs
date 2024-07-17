using Data.Interfaces;
using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repository
{
    public class UserRepository(ToDoAppDbContext context) : GenericRepository<User>(context), IUserRepository
    {
        private readonly ToDoAppDbContext _context=context;
        public User? GetUserByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u=>u.Email==email);
            
        }
    }
}
