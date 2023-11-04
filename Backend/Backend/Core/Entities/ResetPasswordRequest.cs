using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Entities
{
    public class ResetPasswordRequest
    {
        [Required]
        public string Token { get; set; } = string.Empty;
        [Required, MinLength(8, ErrorMessage = "Minimum length for password is 8 characters!")]    //TODO WORK OUT PASSWORD REQUIREMENTS
        public string Password { get; set; } = string.Empty;
        [Required, Compare("Password")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
