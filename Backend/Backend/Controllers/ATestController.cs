using Azure.Core;
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
        private Random r;

        #region FieldsToRandomize
        private string[] authors = new string[] { "Szpaku", "Chivas", "Kamil Pivot", "Young Leosia", "Bambi", "Pezet", "Onar", "Młody ATZ", "White 2115", "Deys" };
        private string[] locations = new string[] { "Warszawa", "Poznań", "Rybnik", "Gdańsk", "Bydgoszcz", "Ustrzyki Dolne", "Łodź", "Szczecin", "Radom", "Włocławek" };
        private string[] desc = new string[] { "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo dolor nisl, quis viverra odio auctor vel.",
            "Aliquam dapibus arcu et mi tristique ornare semper sollicitudin nulla.",
            "Nunc dapibus, risus nec vehicula eleifend, arcu erat aliquet lectus, non gravida ligula quam id quam.",
            "Pellentesque vel justo vitae ante egestas molestie.",
            "Nam malesuada felis quis magna ultrices, at vestibulum augue tempor.",
            "Duis nec tortor sagittis ante feugiat posuere." };
        #endregion

        public ATestController(ApplicationDbContext context) {
            _context = context;
            r = new Random();
        }

        /*[HttpPost("fast-artist-profile")]
        public async Task<IActionResult> FastArtistProfile() {
            Guid guid = Guid.NewGuid();
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok($"New artist profile was created. {i}");
        }*/

        #region FastDataBase
        //script for fast create records in blank database

        #endregion

        #region FastRegister

        [HttpPost("fast-register-100-users")]
        public async Task<IActionResult> FastRegister100Users() {
            for (int i = 0; i < 100; i++) {
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

        #endregion

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

        #region FastEvents
        [HttpPost("fast-event")]
        public async Task<IActionResult> FastEvent() {
            Guid guid = Guid.NewGuid();

            

            var eventt = new Event {
                EventId = guid,
                Title = $"{authors[r.Next(0, authors.Length - 1)]} - nowy koncert!",
                Description = $"{desc[r.Next(0, desc.Length - 1)]}",
                Date = DateTime.Now,
                Location = $"{locations[r.Next(0, locations.Length - 1)]}",
                Cover = ""
            };

            _context.Events.Add(eventt);
            await _context.SaveChangesAsync();
            return Ok($"New event was created, {authors.Length - 1}, {locations.Length - 1}");
        }
        #endregion

        #region FastArtistProfile
        [HttpPost("fast-artist-profile")]
        public async Task<IActionResult> FastArtistProfile() {
            Guid guid = Guid.NewGuid();           
            string name = string.Empty;
            int i = 0;
            do {
                if (i == (authors.Length - 1))
                    break;
                name = authors[i];
                i++;
            } while (_context.ArtistsProfiles.Any(x => x.Name == name));
            if(name == string.Empty || _context.ArtistsProfiles.Any(x => x.Name == name))
                return BadRequest("There are non-use authors name");

            var artistProfile = new ArtistProfile {
                ArtistProfileId = guid,
                Name = name,
                Albums = new List<PremiereAlbum>(),
                DiscussionPosts = new List<DiscussionPost>()
            };

            _context.ArtistsProfiles.Add(artistProfile);
            await _context.SaveChangesAsync();
            return Ok($"New artist profile was created. {i}");
        }
        #endregion

        #region FastGroup
        [HttpPost("fast-group")]
        public async Task<IActionResult> FastGroup() {
            Guid guid = Guid.NewGuid();
            string name = string.Empty;
            int i = 0;
            do {
                if (i == (authors.Length - 1))
                    break;
                name = authors[i];
                i++;
            } while (_context.Groups.Any(g => g.Name == name + "-fans"));
            if (name == string.Empty || _context.Groups.Any(g => g.Name == name + "-fans"))
                return BadRequest("There are non-use authors name");

            var group = new Group {
                GroupId = guid,
                Name = name + "-fans",
                Open = true,
                Users = new List<User>(),
                DiscussionPosts = new List<DiscussionPost>(),
                GroupTags = new List<GroupTag>()
            };

            _context.Groups.Add(group);
            await _context.SaveChangesAsync();
            return Ok($"New group was created. {i}");
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

        #region FastDiscussionPostAndDetails
        [HttpPost("fast-discussion-post")]
        public async Task<IActionResult> FastDiscusisonPost() {
            Guid guid = Guid.NewGuid();
            var title = string.Empty;
            var topic = string.Empty;
            var topicType = DiscussionPost.TopicTypes.Group;
            int userIndex = r.Next(0, _context.Users.Count() - 1);
            var user = _context.Users.ToList().ElementAt(userIndex);
            Group group = null;
            ArtistProfile ap = null;

            int groupOrArtistTopic = r.Next(0, 1);
            if (groupOrArtistTopic == 0) {
                //group
                int index = r.Next(0, _context.Groups.Count() - 1);
                title = $"{_context.Groups.ToList().ElementAt(index).Name} - dyskusja.";
                topic = $"{_context.Groups.ToList().ElementAt(index).Name}";
                group = _context.Groups.ToList().ElementAt(index);
            }
            else {
                //artist
                int index = r.Next(0, _context.ArtistsProfiles.Count() - 1);
                title = $"{_context.ArtistsProfiles.ToList().ElementAt(index).Name} - dyskusja.";
                topic = $"{_context.ArtistsProfiles.ToList().ElementAt(index).Name}";
                topicType = DiscussionPost.TopicTypes.Artist;
                ap = _context.ArtistsProfiles.ToList().ElementAt(index);
            }

            var dp = new DiscussionPost {
                DiscussionPostId = guid,
                Title = title,
                Topic = topic,
                TopicType = topicType,
                CreationTime = DateTime.Now,
                User = user,
                UserId = user.UserId,
                DiscussionPostDetails = new DiscussionPostDetails(),
                Group = group,
                GroupId = group?.GroupId,
                ArtistProfile = ap,
                ArtistProfileId = ap?.ArtistProfileId
            };
            dp.DiscussionPostDetails = CreateDiscussionPostDetails(dp);

            _context.DiscussionPosts.Add(dp);
            _context.DiscussionPostsDetails.Add(dp.DiscussionPostDetails);
            await _context.SaveChangesAsync();
            return Ok($"New discussion post was created. \n DiscussionPostId {dp.DiscussionPostId}" +
                $"\n Title {dp.Title}\n Topic {dp.Topic}\n TopicType {dp.TopicType}\n {dp.CreationTime}\n User {dp.User.UserName}" +
                $"\n UserId {dp.UserId}\n Group {dp.Group?.Name}\n ArtistProfile {dp.ArtistProfile?.Name}" +
                $"\n\n DiscussionPostDetails\n DiscussionPostDetailsId {dp.DiscussionPostDetails.DiscussionPostDetailsId}" +
                $"\n Content {dp.DiscussionPostDetails.Content}\n DiscussionPost {dp.Title}\n DiscussionPostId {dp.DiscussionPostDetails.DiscussionPostId}" +
                $"\n Comments {dp.DiscussionPostDetails.Comments?.Count}");
        }

        private DiscussionPostDetails CreateDiscussionPostDetails(DiscussionPost dp) {           
            Guid guid = Guid.NewGuid();
            var dpd = new DiscussionPostDetails {
                DiscussionPostDetailsId = guid,
                Content = desc[r.Next(0, desc.Length - 1)],
                DiscussionPost = dp,
                DiscussionPostId = dp.DiscussionPostId,
                Comments = new List<Comment>()
            };
            return dpd;
        }
        #endregion
    }
}
