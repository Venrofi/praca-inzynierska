using Backend.Core.Entities;
using Backend.Core.Requests;
using Backend.Data.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace Backend.Controllers {
    public class ATestController : ControllerBase {
        private readonly ApplicationDbContext _context;

        public ATestController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("fast-register-100-users")]
        public async Task<IActionResult> FastRegister100Users() {
            for(int i = 0; i < 100; i++) {
                FastRegister();
            }
            return Ok("100 users was created");
        }

        [HttpPost("fast-register")]
        public async Task<IActionResult> FastRegister() {
            if (!(_context.UserTypes.Where(ut => ut.Description == "USER").Any())) {
                FastUserTypeUser();
            }
            if (!(_context.UserTypes.Where(ut => ut.Description == "ADMIN").Any())) {
                FastUserTypeAdmin();
            }
            if (!(_context.UserTypes.Where(ut => ut.Description == "MODERATOR").Any())) {
                FastUserTypeModerator();
            }

            CreatePasswordHash("test12345", out byte[] passwordHash, out byte[] passwordSalt);

            Guid guid = Guid.NewGuid();

            var user = new User {
                UserId = guid,
                UserName = guid.ToString("N"),
                Email = guid.ToString("N") + "@example.com",
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                VerificationToken = CreateRandomToken(),
                VerificationTime = DateTime.Now,
                UserType = _context.UserTypes.Where(ut => ut.Description == "USER").FirstOrDefault()
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok($"user: {user.UserName}, email: {user.Email} created");
        }

        #region FastUserTypes

        [HttpPost("fast-user-type-user")]
        public async Task<IActionResult> FastUserTypeUser() {
            if (_context.UserTypes.Where(ut => ut.Description == "USER").Any())
                return BadRequest("USER is already in database");
            Guid guid = Guid.NewGuid();

            var userType = new UserType {
                UserTypeId = guid,
                Description = "USER",
            };

            _context.UserTypes.Add(userType);
            await _context.SaveChangesAsync();
            return Ok("UserType USER was created");
        }

        [HttpPost("fast-user-type-admin")]
        public async Task<IActionResult> FastUserTypeAdmin() {
            if (_context.UserTypes.Where(ut => ut.Description == "ADMIN").Any())
                return BadRequest("USER is already in database");
            Guid guid = Guid.NewGuid();

            var userType = new UserType {
                UserTypeId = guid,
                Description = "ADMIN",
            };

            _context.UserTypes.Add(userType);
            await _context.SaveChangesAsync();
            return Ok("UserType ADMIN was created");
        }

        [HttpPost("fast-user-type-moderator")]
        public async Task<IActionResult> FastUserTypeModerator() {
            if (_context.UserTypes.Where(ut => ut.Description == "MODERATOR").Any())
                return BadRequest("USER is already in database");
            Guid guid = Guid.NewGuid();

            var userType = new UserType {
                UserTypeId = guid,
                Description = "MODERATOR",
            };

            _context.UserTypes.Add(userType);
            await _context.SaveChangesAsync();
            return Ok("UserType MODERATOR was created");
        }

        #endregion

        #region LoginRegisterFunctions
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt) {
            using (var hmac = new HMACSHA512()) {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }   
        }
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt) {
            using (var hmac = new HMACSHA512(passwordSalt)) {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        private string CreateRandomToken() {
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
        }
        #endregion
    }
}
