using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Requests
{
    public class UserRegisterRequest
    {
        [Required, MinLength(4)]
        public string Username { get; set; } = string.Empty;
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required, MinLength(8, ErrorMessage = "Minimum length for password is 8 characters!")]    //TODO WORK OUT PASSWORD REQUIREMENTS
        public string Password { get; set; } = string.Empty;
        [Required, Compare("Password")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
