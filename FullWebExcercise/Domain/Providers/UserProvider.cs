using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Data.Interfaces;
using Data.Models;
using Data.Repository;
using Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using ToDoAppWebApi.DTO;

namespace Domain.Providers
{
    public class UserProvider(IUserRepository userRepository, IConfiguration configuration):IUserProvider
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IConfiguration _configuration = configuration;

        public ResponseModel CreateUser(UserDTO userDto)
        {
            try
            {
                userDto.Password = string.Join("", userDto.Password.Select(charValue => (char)(charValue + 3)));
                User user = new User()
                {
                    Id = 0,
                    Email = userDto.Email,
                    Password = userDto.Password,
                    TaskDetails = null
                };
                user = _userRepository.Add(user).Result;
                ResponseModel response = new ResponseModel();
                response.token = GenerateToken(user);
                return response;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public string GenerateToken(User user)
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
             expires: DateTime.Now.AddMinutes(100),
             signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
