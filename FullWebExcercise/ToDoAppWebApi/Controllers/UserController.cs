using Data.Interfaces;
using Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ToDoAppWebApi.DTO;

namespace ToDoAppWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController(IConfiguration configuration, IUserRepository user) : Controller
    {
        private readonly IUserRepository _userRepository=user;
        private readonly IConfiguration _configuration=configuration;

        [HttpPost]
        
        public ActionResult<User> AuthenticateUser([FromBody]UserDTO userDto)
        {
            User? user=_userRepository.GetUserByEmail(userDto.Email);
            userDto.Password = string.Join("", userDto.Password.Select(charValue => (char)(charValue + 3)));
            if (user == null || userDto.Password!=user.Password)
            {
                return BadRequest("User Not Present");
            }
            return Ok(GenerateToken(user));
        }

        [HttpPost]
        [Route("create")]

        public ActionResult<User> CreateUser([FromBody]User user)
        {
            if (user == null)
            {
                return BadRequest("In Valid User");
            }

            user.Password = string.Join("", user.Password.Select(charValue => (char)(charValue + 3)));
            _userRepository.Add(user);
            return Ok(GenerateToken(user));
        }

        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                   new Claim(JwtRegisteredClaimNames.Jti,new Guid().ToString()),
                   new Claim("UserId",user.Id.ToString()),
                   new Claim("Email",user.Email!),
                   new Claim("Password",user.Password!)
            };
            var token = new JwtSecurityToken(
             issuer: "abc",
             audience: _configuration["JWT:Audience"],
             claims: claims,
             expires: DateTime.Now.AddMinutes(10),
             signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
