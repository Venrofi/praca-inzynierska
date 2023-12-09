using Backend.Core.Entities;
using Backend.Core.Requests;
using Backend.Data.Context;
using Backend.Services;
using MailKit;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using Org.BouncyCastle.Utilities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;

        public AuthenticationController(ApplicationDbContext context, IEmailService emailService, IConfiguration configuration)
        {
            _context = context;
            _emailService = emailService;
            _configuration = configuration;
        }



        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterRequest request)
        {
            if (_context.Users.Any(x => x.Email == request.Email))
                return BadRequest(new { code = "email-already-used" });
            if (_context.Users.Any(x => x.UserName == request.Username))
                return BadRequest(new { code = "username-already-used" });

            var mailPrefix = request.Email.Split("@")[0];
            Regex regex = new Regex("^[a-zA-Z0-9.]+$");
            if (!regex.IsMatch(mailPrefix))
                return BadRequest(new { code = "mail-error" });

            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var user = new User
            {
                UserId = new Guid(),
                UserName = request.Username,
                Bio = string.Empty,
                Email = request.Email,
                Avatar = string.Empty,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                VerificationToken = CreateRandomToken(),
                UserType = _context.UserTypes.Where(ut => ut.Description == "USER").FirstOrDefault()
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            string verificationLink = CreateAccountVerificationLink(user.VerificationToken);
            string emailBody = $"Cześć <b>{user.UserName}</b>,<br/><br/>"
                             + $"Cieszymy się że dołączyłeś do Naszej społeczności!<br/><br/>"
                             + $"Kliknij w link aby potwierdzić utworzenie nowego konta: <b><a href=\"{verificationLink}\">Zweryfikuj konto</a></b> <br/><br/>"
                             + $"Miłego dnia,<br/> <b>HipHopHub Team</b>";


            _emailService.SendEmail(new EmailRequest
            { 
                Receiver = user.Email, 
                Subject = "Witamy na wortalu HipHopHub!", 
                Body = emailBody,
            });
            return Ok(new { code = "register-success"});
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
            user.ResetTokenExpiration = DateTime.UtcNow.AddHours(1);
            await _context.SaveChangesAsync();

            string resetLink = CreatePasswordResetLink(user.PasswordResetToken);
            string formattedExpiration = DateTime.UtcNow.AddHours(1).ToString("HH:mm:ss dd.MM.yyyy");
            string emailBody = $"Cześć <b>{user.UserName}</b>,<br/><br/>"
                             + $"Doszły nas słuchy, że chcesz zmienić swoje hasło. Jeśli to nie Ty wykonałeś próbę resetu hasła zignoruj tą wiadomość.<br/><br/>"
                             + $"Kliknij w link aby ustawić nowe hasło: <b><a href=\"{resetLink}\">Zmień hasło</a></b> <br/><br/>"
                             + $"Link wygaśnie <b>po godzinie od otrzymania wiadomości!</b> <br/><br/>"
                             + $"Miłego dnia,<br/> <b>HipHopHub Team</b>";

            _emailService.SendEmail(new EmailRequest
            {
                Receiver = user.Email,
                Subject = "Zmiana hasła dla konta na wortalu HipHopHub",
                Body = emailBody
            });

            return Ok(new { code = "sixty-minutes-for-reset" });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordRequest request)
        {
            var user = await _context.Users.Where(x => x.PasswordResetToken == request.Token).FirstOrDefaultAsync();
            if (user == null || user.ResetTokenExpiration < DateTime.UtcNow)
                return BadRequest(new { code = "invalid-token" });

            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.PasswordResetToken = null;
            user.ResetTokenExpiration = null;

            await _context.SaveChangesAsync();

            return Ok(new { code = "password-changed", userID = user.UserId });
        }
        [HttpPost("send-verification-email")]
        public IActionResult SendEmail(EmailRequest request)
        {
            _emailService.SendEmail(request);
            return Ok();

        }


        [HttpPost("check-jwt-token")]
        public IActionResult CheckJWTToken()
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var Sectoken = new JwtSecurityToken(_configuration["Jwt:Issuer"],
              _configuration["Jwt:Issuer"],
              null,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            var token = new JwtSecurityTokenHandler().WriteToken(Sectoken);

            return Ok(token);
        }

        [HttpPost("login-jwt")]
        public async Task<IActionResult> LoginJWTToken(UserLoginRequest request)
        {
            var user = await _context.Users.Where(x => x.UserName == request.Username).FirstOrDefaultAsync();
            if (user == null)
                return BadRequest(new { code = "not-found" });
            if (user.VerificationTime == null)
                return BadRequest(new { code = "user-not-verified" });
            if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
                return BadRequest(new { code = "wrong-password" });

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var permissionClaims = new List<Claim>();
            permissionClaims.Add(new Claim("UserID", user.UserId.ToString()));
            var Sectoken = new JwtSecurityToken(_configuration["Jwt:Issuer"],
              claims: permissionClaims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            var token = new JwtSecurityTokenHandler().WriteToken(Sectoken);

            byte[] userGUID = user.UserId.ToByteArray();
            char[] code = System.Text.Encoding.UTF8.GetString(userGUID).ToCharArray();
            int pos_mid = token.Length % 2 == 1 ? (token.Length / 2 + 1) : (token.Length / 2);
            int pos_fill = pos_mid % 2 == 1 ? (pos_mid / 2 + 1) : (pos_mid / 2);
            string newCode = RandomChar() + token[0..pos_fill] + code[0] + token[(pos_fill + 1)..pos_mid] + code[0] + token[(pos_mid + 1)..(pos_fill + pos_mid)] + code[0] + token[(pos_fill + pos_mid + 1)..] + RandomChar();


            return Ok(new { code = "login-success", newCode, token }); 
        }
        private char RandomChar()
        {
            return  (char)new Random().Next('A', 'Z' + 1);
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

        private string CreateAccountVerificationLink(string verificationToken)
        {
            string baseUrl = "https://hip-hop-hub.netlify.app";
            string verificationLink = $"{baseUrl}/verify-account?token={verificationToken}";

            return verificationLink;
        }

        private string CreatePasswordResetLink(string resetToken)
        {
            string baseUrl = "https://hip-hop-hub.netlify.app";
            string resetLink = $"{baseUrl}/new-password?token={resetToken}";

            return resetLink;
        }
    }
}
