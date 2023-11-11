using Backend.Core.Entities;
using Backend.Core.Requests;
using Backend.Data.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginRegisterController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LoginRegisterController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterRequest request)
        {
            if (_context.Users.Any(x => x.Email == request.Email))
                return BadRequest(new { code = "email-already-used" });
            if (_context.Users.Any(x => x.UserName == request.Username))
                return BadRequest(new { code = "username-already-used" });

            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var user = new User
            {
                UserId = new Guid(),
                UserName = request.Username,
                Email = request.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                VerificationToken = CreateRandomToken(),
                UserType = _context.UserTypes.Where(ut => ut.Description == "USER").FirstOrDefault()
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { code = "register-success", verificationToken = user.VerificationToken }); //TODO: Send VerificationToken via email?
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginRequest request)
        {
            var user = await _context.Users.Where(x => x.UserName == request.Username).FirstOrDefaultAsync();
            if (user == null)
                return BadRequest(new { code = "not-found" });
            if (user.VerificationTime == null)
                return BadRequest(new { code = "user-not-verified" });
            if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
                return BadRequest(new { code = "wrong-password" });

            return Ok(new { code = "login-success", userID = user.UserId }); //TODO: Generate userSessionToken?
        }

        [HttpPost("verify")]
        public async Task<IActionResult> Verify(string token)
        {
            var user = await _context.Users.Where(x => x.VerificationToken == token).FirstOrDefaultAsync();
            if (user == null)
                return BadRequest(new { code = "wrong-token" });

            user.VerificationTime = DateTime.Now;
            await _context.SaveChangesAsync();

            return Ok(new { code = "verify-success" });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            var user = await _context.Users.Where(x => x.Email == email).FirstOrDefaultAsync();
            if (user == null)
                return BadRequest(new { code = "not-found" });

            user.PasswordResetToken = CreateRandomToken();
            user.ResetTokenExpiration = DateTime.Now.AddHours(1);
            await _context.SaveChangesAsync();

            return Ok(new { code = "sixty-minutes-for-reset" });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordRequest request)
        {
            var user = await _context.Users.Where(x => x.PasswordResetToken == request.Token).FirstOrDefaultAsync();
            if (user == null || user.ResetTokenExpiration < DateTime.Now)
                return BadRequest(new { code = "invalid-token" });

            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.PasswordResetToken = null;
            user.ResetTokenExpiration = null;

            await _context.SaveChangesAsync();

            return Ok(new { code = "password-changed", userID = user.UserId });
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        private string CreateRandomToken()
        {
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
        }
    }
}
