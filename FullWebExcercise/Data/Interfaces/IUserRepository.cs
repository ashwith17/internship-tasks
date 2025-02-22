﻿using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces
{
    public interface IUserRepository:IGenericRepository<User> 
    {
        public User? GetUserByEmail(string email);
    }
}
