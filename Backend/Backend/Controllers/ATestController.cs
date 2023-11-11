using Azure.Core;
using Backend.Core.Entities;
using Backend.Core.Requests;
using Backend.Data.Context;
using Backend.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace Backend.Controllers {
    public class ATestController : ControllerBase {
        private readonly ApplicationDbContext _context;
        private Random r;

        #region FieldsToRandomize
        private readonly string[] authors = new string[] { "Szpaku", "Chivas", "Kamil Pivot", "Young Leosia", "Bambi", "Pezet", "Onar", "Młody ATZ", "White 2115", "Deys" };
        private readonly string[] albums = new string[] { "Atypowy", "Mandarynki", "Czarny Swing", "Hulanki", "Szkoła 81", "Brawurowo i pusto", "Dziki i nietoperze", "Coś więcej niż muzyka", "Trzecie rzeczy", "Szum" };
        private readonly string[] locations = new string[] { "Warszawa", "Poznań", "Rybnik", "Gdańsk", "Bydgoszcz", "Ustrzyki Dolne", "Łodź", "Szczecin", "Radom", "Włocławek" };
        private readonly string[] desc = new string[] { "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo dolor nisl, quis viverra odio auctor vel.",
            "Aliquam dapibus arcu et mi tristique ornare semper sollicitudin nulla.",
            "Nunc dapibus, risus nec vehicula eleifend, arcu erat aliquet lectus, non gravida ligula quam id quam.",
            "Pellentesque vel justo vitae ante egestas molestie.",
            "Nam malesuada felis quis magna ultrices, at vestibulum augue tempor.",
            "Duis nec tortor sagittis ante feugiat posuere." };
        private readonly string[] genres = new string[] { "hip-hopolo", "newschool", "oldschool", "hard-rap", "rap-blokowy", "electro-rap" };
        private readonly string[] tracks = new string[] { "Dorosłość", "Wakacje", "Czarne ciuchy", "Ostatni ninja", "Popiół", "Ukryty w mieście krzyk", "Françoise Hardy", "BFF", "Szklanki", "Mandarynki" };
        #endregion

        public ATestController(ApplicationDbContext context) {
            _context = context;
            r = new Random();
        }

        #region FastDataBase
        //script for fast create records in blank database

        #endregion

        /*[HttpPost("fast-artist-profile")]
        public async Task<IActionResult> FastArtistProfile() {
            Guid guid = Guid.NewGuid();
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok($"New artist profile was created. {i}");
        }*/

        #region ProfanitiesTest
        [HttpPost("profanity-test")]
        public async Task<IActionResult> ProfanityTest(UserLoginRequest ulr) {
            ProfanitySearchAlgorithm psa = new ProfanitySearchAlgorithm(_context);

            if (!_context.Profanities.Any()) {
                psa.LoadBadWords();
            }
            await _context.SaveChangesAsync();

            string words = string.Join("|", _context.Profanities.Select(p => p.ProfanitiesName));
            words = words.Remove(words.Length - 1);
            //return Ok(words);
            //zmiana 0 na o, 3 na e, ó na o itd...
            //tolowercase
            //jak rozwiazac problem ze spacjami, myslikami, podlogami? usuneicie tych znaków mocno ogranicza algorytm podczas przeszukiwania np komentarzy
            if (psa.HasBadWords(ulr.Username))
                return Ok("Wystapil wulgaryzm");
            else
                return Ok("Bez wulgaryzmu");

            //return Ok($"New artist profile was created.");
        }
 
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
                return BadRequest(new { code = "user-type-already-in-database" });
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
                return BadRequest(new { code = "user-type-already-in-database" });
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
                return BadRequest(new { code = "user-type-already-in-database" });
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
                return BadRequest(new { code = "no-free-artists" });

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
                return BadRequest(new { code = "no-free-artists" });

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
            if (!_context.Users.Any() || !_context.Groups.Any() || !_context.ArtistsProfiles.Any())
                return BadRequest(new { code = "missing-users-groups-artists" });
            Guid guid = Guid.NewGuid();
            var title = string.Empty;
            var topic = string.Empty;
            var topicType = DiscussionPost.TopicTypes.Group;
            int userIndex = r.Next(0, _context.Users.Count());
            var user = _context.Users.ToList().ElementAt(userIndex);
            Group group = null;
            ArtistProfile ap = null;

            int groupOrArtistTopic = r.Next(0, 2);
            if (groupOrArtistTopic == 0) {
                //group
                int index = r.Next(0, _context.Groups.Count());
                title = $"{_context.Groups.ToList().ElementAt(index).Name} - dyskusja.";
                topic = $"{_context.Groups.ToList().ElementAt(index).Name}";
                group = _context.Groups.ToList().ElementAt(index);
            }
            else {
                //artist
                int index = r.Next(0, _context.ArtistsProfiles.Count());
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

        #region FastComment
        [HttpPost("fast-comment")]
        public async Task<IActionResult> FastComment() {
            Guid guid = Guid.NewGuid();
            int userIndex = r.Next(0, _context.Users.Count());
            var user = _context.Users.ToList().ElementAt(userIndex);
            int dpIndex = r.Next(0, _context.DiscussionPostsDetails.Count());
            var dpd = _context.DiscussionPostsDetails.ToList().ElementAt(dpIndex);

            var comment = new Comment {
                CommentId = guid,
                Content = desc[r.Next(0, desc.Length - 1)],
                User = user,
                UserId = user.UserId,
                DiscussionPostDetails = dpd,
                DiscussionPostDetailsId = dpd.DiscussionPostDetailsId
            };

            var dp = _context.DiscussionPosts.Where(dp => dp.DiscussionPostDetails == dpd).FirstOrDefault();
            if (dp != null)
                dp.NumberOfComments++;
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return Ok($"New comment was created.");
        }
        #endregion

        #region FastPremiereAlbum
        [HttpPost("fast-premiere-album")]
        public async Task<IActionResult> FastPremiereAlbum() {
            if (!_context.ArtistsProfiles.Any())
                return BadRequest(new { code = "any-artist-in-database" });
            Guid guid = Guid.NewGuid();
            int artistIndex = r.Next(0, _context.ArtistsProfiles.Count());
            var artist = _context.ArtistsProfiles.ToList().ElementAt(artistIndex);

            var pa = new PremiereAlbum {
                PremiereAlbumId = guid,
                Title = albums[r.Next(0, albums.Length - 1)],
                Artist = authors[r.Next(0, authors.Length - 1)],
                Cover = "",
                ReleaseDate = DateTime.Now,
                PremiereAlbumDetails = new PremiereAlbumDetails(),
                ArtistProfile = artist,
                ArtistProfileId = artist.ArtistProfileId
            };
            pa.PremiereAlbumDetails = CreatePremiereAlbumDetails(pa);
            _context.PremiereAlbums.Add(pa);
            _context.PremiereAlbumDetails.Add(pa.PremiereAlbumDetails);
            await _context.SaveChangesAsync();
            return Ok($"New premiere album was created.");
        }

        private PremiereAlbumDetails CreatePremiereAlbumDetails(PremiereAlbum pa) {
            Guid guid = Guid.NewGuid();
            var pad = new PremiereAlbumDetails {
                PremiereAlbumDetailsId = guid,
                Description = desc[r.Next(0, desc.Length - 1)],
                Duration = $"{r.Next(0, 6)}{r.Next(0, 10)}:{r.Next(0, 7)}{r.Next(0, 10)}",
                Genre = genres[r.Next(0, genres.Length - 1)],
                Rating = r.NextDouble() * 10,
                PremiereAlbum = pa,
                PremiereAlbumId = pa.PremiereAlbumId,
                Tracks = new List<Track>()
            };
            return pad;
        }
        #endregion

        #region FastTrack
        [HttpPost("fast-25-tracks")]
        public async Task<IActionResult> Fast25Tracks() {
            for (int i = 0; i < 25; i++) {
                FastTrack();
            }
            return Ok("25 track was created, or not heh : - )");
        }

        [HttpPost("fast-track")]
        public async Task<IActionResult> FastTrack() {
            Guid guid = Guid.NewGuid();
            int albumDetailsIndex = r.Next(0, _context.PremiereAlbumDetails.Count());
            var albumDetails = _context.PremiereAlbumDetails.ToList().ElementAt(albumDetailsIndex);
            string title = string.Empty;
            if (albumDetails.Tracks == null)
                albumDetails.Tracks = new List<Track>();
            title = tracks[r.Next(0, tracks.Length - 1)];

            if (_context.Tracks.Where(pad => pad.PremiereAlbumDetailsId == albumDetails.PremiereAlbumDetailsId).Any(t => t.Title == title))
                return BadRequest(new { code = "track-already-in-album" });

            var track = new Track {
                TrackId = guid,
                Title = title,
                Duration = $"0{r.Next(0, 10)}:{r.Next(0, 7)}{r.Next(0, 10)}",
                PremiereAlbumDetails = albumDetails,
                PremiereAlbumDetailsId = albumDetails.PremiereAlbumDetailsId
            };
            _context.Tracks.Add(track);
            await _context.SaveChangesAsync();
            return Ok($"New track was created.");
        }
        #endregion

        #region FastAddUserToGroup
        [HttpPost("fast-add-user-to-group")]
        public async Task<IActionResult> FastAddUserToGroup() {
            int userIndex = r.Next(0, _context.Users.Count());
            var user = _context.Users.ToList().ElementAt(userIndex);
            int groupIndex = r.Next(0, _context.Groups.Count());
            var group = _context.Groups.ToList().ElementAt(groupIndex);

            if(user == null)
                return BadRequest(new { code = "user-not-found" });
            if(group == null)
                return BadRequest(new { code = "group-not-found"});
            //check if user is in group
            if (group.Users == null)
                group.Users = new List<User>();
            if (user.Groups == null)
                user.Groups = new List<Group>();
            //if (group.Users.Contains(user))
            //    return BadRequest(new { code = "user-already-in-group"});
            if (group.Users.Where(u => u.UserId == user.UserId) != null)
                return BadRequest(new { code = "user-already-in-group"});

            _context.Groups.Where(g => g == group).FirstOrDefault().Users.Add(user);
            _context.Users.Where(u => u == user).FirstOrDefault().Groups.Add(group);

            //_context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(new { code = "success"});
        }
        #endregion
    }
}
