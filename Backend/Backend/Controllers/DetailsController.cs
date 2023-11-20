using Backend.Data.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers {
    public class DetailsController :ControllerBase {
        private readonly ApplicationDbContext _context;

        public DetailsController(ApplicationDbContext context) {
            _context = context;
        }

        #region Artist

        [HttpGet("artist{id}")]
        public async Task<ActionResult<object>> GetArtistDetails(Guid artistId) {
            //todo
            //id, username, email, groups, role, posts, avatar
            if (_context.Users == null) {
                return NotFound();
            }
            var resUser = await _context.Users.Include(u => u.Groups).Include(u => u.DiscussionPosts).Include(u => u.UserType).Include(u => u.ParticipatedEvents).Include(u => u.FollowedArtists).Where(u => u.UserId == artistId).FirstOrDefaultAsync();

            if (resUser == null) {
                return NotFound();
            }

            var res = new {
                Id = resUser.UserId,
                Name = resUser.UserName,
                Avatar = resUser.Avatar,
                Bio = "", // TODO: Add Bio field!
                Email = resUser.Email,
                Posts = resUser.DiscussionPosts.Select(dp => new { id = dp.DiscussionPostId, name = dp.Title }),
                JoinedGroups = resUser.Groups.Select(g => new { id = g.GroupId, name = g.Name }),
                AttendedEvents = resUser.ParticipatedEvents.Select(pe => new { id = pe.EventId, name = pe.Title }),
                FollowedArtists = resUser.FollowedArtists.Select(fa => new { id = fa.ArtistProfileId, name = fa.Name }),
                Role = resUser.UserType.Description,
            };
            return res;
        }

        #endregion

        #region Group
        [HttpGet("group{id}")]
        public async Task<ActionResult<object>> GetGroupDetails(Guid groupId) {
            //todo
            //id, username, email, groups, role, posts, avatar
            if (_context.Users == null) {
                return NotFound();
            }
            var resUser = await _context.Users.Include(u => u.Groups).Include(u => u.DiscussionPosts).Include(u => u.UserType).Include(u => u.ParticipatedEvents).Include(u => u.FollowedArtists).Where(u => u.UserId == groupId).FirstOrDefaultAsync();

            if (resUser == null) {
                return NotFound();
            }

            var res = new {
                Id = resUser.UserId,
                Name = resUser.UserName,
                Avatar = resUser.Avatar,
                Bio = "", // TODO: Add Bio field!
                Email = resUser.Email,
                Posts = resUser.DiscussionPosts.Select(dp => new { id = dp.DiscussionPostId, name = dp.Title }),
                JoinedGroups = resUser.Groups.Select(g => new { id = g.GroupId, name = g.Name }),
                AttendedEvents = resUser.ParticipatedEvents.Select(pe => new { id = pe.EventId, name = pe.Title }),
                FollowedArtists = resUser.FollowedArtists.Select(fa => new { id = fa.ArtistProfileId, name = fa.Name }),
                Role = resUser.UserType.Description,
            };
            return res;
        }
        #endregion

        #region Event
        [HttpGet("event{id}")]
        public async Task<ActionResult<object>> GetEventDetails(Guid eventId) {
            //todo
            //id, username, email, groups, role, posts, avatar
            if (_context.Users == null) {
                return NotFound();
            }
            var resUser = await _context.Users.Include(u => u.Groups).Include(u => u.DiscussionPosts).Include(u => u.UserType).Include(u => u.ParticipatedEvents).Include(u => u.FollowedArtists).Where(u => u.UserId == eventId).FirstOrDefaultAsync();

            if (resUser == null) {
                return NotFound();
            }

            var res = new {
                Id = resUser.UserId,
                Name = resUser.UserName,
                Avatar = resUser.Avatar,
                Bio = "", // TODO: Add Bio field!
                Email = resUser.Email,
                Posts = resUser.DiscussionPosts.Select(dp => new { id = dp.DiscussionPostId, name = dp.Title }),
                JoinedGroups = resUser.Groups.Select(g => new { id = g.GroupId, name = g.Name }),
                AttendedEvents = resUser.ParticipatedEvents.Select(pe => new { id = pe.EventId, name = pe.Title }),
                FollowedArtists = resUser.FollowedArtists.Select(fa => new { id = fa.ArtistProfileId, name = fa.Name }),
                Role = resUser.UserType.Description,
            };
            return res;
        }
        #endregion

        #region Discussion
        [HttpGet("discussion{id}")]
        public async Task<ActionResult<object>> GetDiscussionDetails(Guid discussionId) {
            //todo
            //id, username, email, groups, role, posts, avatar
            if (_context.Users == null) {
                return NotFound();
            }
            var resUser = await _context.Users.Include(u => u.Groups).Include(u => u.DiscussionPosts).Include(u => u.UserType).Include(u => u.ParticipatedEvents).Include(u => u.FollowedArtists).Where(u => u.UserId == discussionId).FirstOrDefaultAsync();

            if (resUser == null) {
                return NotFound();
            }

            var res = new {
                Id = resUser.UserId,
                Name = resUser.UserName,
                Avatar = resUser.Avatar,
                Bio = "", // TODO: Add Bio field!
                Email = resUser.Email,
                Posts = resUser.DiscussionPosts.Select(dp => new { id = dp.DiscussionPostId, name = dp.Title }),
                JoinedGroups = resUser.Groups.Select(g => new { id = g.GroupId, name = g.Name }),
                AttendedEvents = resUser.ParticipatedEvents.Select(pe => new { id = pe.EventId, name = pe.Title }),
                FollowedArtists = resUser.FollowedArtists.Select(fa => new { id = fa.ArtistProfileId, name = fa.Name }),
                Role = resUser.UserType.Description,
            };
            return res;
        }
        #endregion

        #region Album
        [HttpGet("album{id}")]
        public async Task<ActionResult<object>> GetAlbumDetails(Guid albumId) {
            //todo
            //id, username, email, groups, role, posts, avatar
            if (_context.Users == null) {
                return NotFound();
            }
            var resUser = await _context.Users.Include(u => u.Groups).Include(u => u.DiscussionPosts).Include(u => u.UserType).Include(u => u.ParticipatedEvents).Include(u => u.FollowedArtists).Where(u => u.UserId == albumId).FirstOrDefaultAsync();

            if (resUser == null) {
                return NotFound();
            }

            var res = new {
                Id = resUser.UserId,
                Name = resUser.UserName,
                Avatar = resUser.Avatar,
                Bio = "", // TODO: Add Bio field!
                Email = resUser.Email,
                Posts = resUser.DiscussionPosts.Select(dp => new { id = dp.DiscussionPostId, name = dp.Title }),
                JoinedGroups = resUser.Groups.Select(g => new { id = g.GroupId, name = g.Name }),
                AttendedEvents = resUser.ParticipatedEvents.Select(pe => new { id = pe.EventId, name = pe.Title }),
                FollowedArtists = resUser.FollowedArtists.Select(fa => new { id = fa.ArtistProfileId, name = fa.Name }),
                Role = resUser.UserType.Description,
            };
            return res;
        }
        #endregion
    }
}
