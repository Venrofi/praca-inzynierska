using Backend.Data.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers {
    public class ListController : ControllerBase {
        private readonly ApplicationDbContext _context;

        public ListController(ApplicationDbContext context) {
            _context = context;
        }

        #region Artists
        [HttpGet("artists")]
        public async Task<ActionResult<object>> GetArtists() {
            //todo
            //id, username, email, groups, role, posts, avatar
            if (_context.Users == null) {
                return NotFound();
            }
            Guid id = Guid.NewGuid();
            var resUser = await _context.Users.Include(u => u.Groups).Include(u => u.DiscussionPosts).Include(u => u.UserType).Include(u => u.ParticipatedEvents).Include(u => u.FollowedArtists).Where(u => u.UserId == id).FirstOrDefaultAsync();

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

        #region Groups
        [HttpGet("groups")]
        public async Task<ActionResult<object>> GetGroups() {
            //todo
            //id, username, email, groups, role, posts, avatar
            if (_context.Users == null) {
                return NotFound();
            }
            Guid id = Guid.NewGuid();
            var resUser = await _context.Users.Include(u => u.Groups).Include(u => u.DiscussionPosts).Include(u => u.UserType).Include(u => u.ParticipatedEvents).Include(u => u.FollowedArtists).Where(u => u.UserId == id).FirstOrDefaultAsync();

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

        #region Members
        [HttpGet("members")]
        public async Task<ActionResult<object>> GetMembers() {
            //todo
            //id, username, email, groups, role, posts, avatar
            if (_context.Users == null) {
                return NotFound();
            }
            Guid id = Guid.NewGuid();
            var resUser = await _context.Users.Include(u => u.Groups).Include(u => u.DiscussionPosts).Include(u => u.UserType).Include(u => u.ParticipatedEvents).Include(u => u.FollowedArtists).Where(u => u.UserId == id).FirstOrDefaultAsync();

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
