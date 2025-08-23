using System.ComponentModel.DataAnnotations;

namespace Merum_BE.DTO
{
    public class LoginDTO
    {
        [Required]
        public required string Identifier { get; set; } //Username OR Email
        [Required]
        public required string Password { get; set; }

    }

    public class RegisterDTO
    {
        [Required]
        public required string Username { get; set; }
        [Required, EmailAddress]
        public required string Email { get; set; }
        [Required, MinLength(8)]
        public required string Password { get; set; }
        [Required, Compare("Password", ErrorMessage = "Passwords do not match.")]
        public required string ConfirmPassword { get; set; }
    }
}
