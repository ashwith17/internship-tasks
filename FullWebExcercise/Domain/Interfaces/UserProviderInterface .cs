using Data.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoAppWebApi.DTO;

namespace Domain.Interfaces
{
    public interface IUserProvider
    {
        public ResponseModel CreateUser([FromBody] UserDTO userDto);

        public string GenerateToken(User user);

    }
}
