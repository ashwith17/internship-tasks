//using Data.Interfaces;
//using Data.Models;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;

//namespace EmployeeDirectoryWebAPI.Controllers
//{
//    [ApiController]
//    [Route("/api")]
//    public class AuthController(IConfiguration configuration, IUserRepository userRepository) : Controller
//    {
//        private readonly IUserRepository _userRepository=userRepository;
//        private readonly IConfiguration _configuration=configuration;

//        [Route("[action]")]
//        [HttpPost]
//        public IActionResult Login(int id,string userName,string password)
//        {

//            User? client = _userRepository.GetById(id).Result;
//            if (client == null)
//            {
//                return BadRequest("Login Failed");
//            }
//            else if (client.Name != userName || client.Password != password)
//            {
//                return Unauthorized();
//            }
//            var token = GenerateToken(client);
//            return Ok(token);
//        }

//        private string GenerateToken(User user)
//        {
//            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:key"]!));
//            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
//            var claims = new[]
//            {
//                   new Claim(JwtRegisteredClaimNames.Jti,new Guid().ToString()),
//                   new Claim("UserId",user.Name!),
//                   new Claim("Password",user.Password!)
//            };
//            var token = new JwtSecurityToken(
//             issuer: "abc",
//             audience: _configuration["JWT:Audience"],
//             claims: claims,
//             expires: DateTime.Now.AddMinutes(10),
//             signingCredentials: credentials);
//            return new JwtSecurityTokenHandler().WriteToken(token);
//        }
//    }
//}
