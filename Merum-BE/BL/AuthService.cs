using Merum_BE.Data;
using Merum_BE.Data.Models;
using Merum_BE.DTO;
using Microsoft.AspNetCore.Identity;

namespace Merum_BE.BL
{
    public class AuthService
    {
        private readonly ILogger<AuthService> _logger;
        private readonly UserManager<MerumUser> _userManager;
        private readonly SignInManager<MerumUser> _signInManager;
        public AuthService(ILogger<AuthService> logger, UserManager<MerumUser> userManager, SignInManager<MerumUser> signInManager) 
        {
            _logger = logger;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<UserDTO?> RegisterUserAsync(RegisterDTO registerDTO)
        {
            var user = new MerumUser
            {
                UserName = registerDTO.Username,
                Email = registerDTO.Email
            };
            var userDTO = new UserDTO
            {
                UserName = user.UserName,
                Email = user.Email
            };
            var result = await _userManager.CreateAsync(user, registerDTO.Password);
            return result.Succeeded ? userDTO : null;
        }

        public async Task<UserDTO?> LoginUserAsync(LoginDTO loginDTO)
        {
            if (string.IsNullOrWhiteSpace(loginDTO.Identifier) || string.IsNullOrWhiteSpace(loginDTO.Password))
            {
                return null;
            }
            MerumUser? user;
            if (loginDTO.Identifier.Contains("@"))
            {
                user = await _userManager.FindByEmailAsync(loginDTO.Identifier);
            }
            else
            {
                user = await _userManager.FindByNameAsync(loginDTO.Identifier);
            }
            if (user == null || String.IsNullOrEmpty(user.UserName)) return null;

            var result = await _signInManager.PasswordSignInAsync(user.UserName, loginDTO.Password, isPersistent: false, lockoutOnFailure: false);
            var userDTO = new UserDTO
            {
                UserName = user.UserName,
                Email = user.Email
            };
            return result.Succeeded? userDTO : null;

        }
    }
}
