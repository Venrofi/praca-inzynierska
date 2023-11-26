using Backend.Data.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ListController : ControllerBase {
        private readonly ApplicationDbContext _context;

        public ListController(ApplicationDbContext context) {
            _context = context;
        }

        #region Artists
        [HttpGet("artists")]
        public async Task<ActionResult<object>> GetArtists() {
            if (_context.ArtistsProfiles == null) {
                return NotFound();
            }
            var list = await _context.ArtistsProfiles.Select(a => new { 
                id = a.ArtistProfileId, 
                name = a.Name, 
                image = a.Image,
                rank = a.Followers.Count() +
                   a.DiscussionPosts.Count() +
                   a.OrganizedEvents.Count() +
                   a.Albums.Count()
            }).OrderByDescending(c => c.rank)
            .ToListAsync();

            return list.Select((a, index) => new {
                id = a.id,
                name = a.name,
                imnage = a.image,
                rank = index + 1
            }).ToList();
        }
        #endregion

        #region Groups
        [HttpGet("groups")]
        public async Task<ActionResult<object>> GetGroups() {
            if (_context.Groups == null) {
                return NotFound();
            }
            var list = await _context.Groups.Select(g => new {
                id = g.GroupId,
                name = g.Name,
                image = g.Image,
                rank = g.Users.Count() +
                   g.DiscussionPosts.Count() +
                   g.OrganizedEvents.Count()
            }).OrderByDescending(c => c.rank)
            .ToListAsync();

            return list.Select((a, index) => new {
                id = a.id,
                name = a.name,
                imnage = a.image,
                rank = index + 1
            }).ToList();
        }
        #endregion

        #region Members
        [HttpGet("members")]
        public async Task<ActionResult<object>> GetMembers() {
            if (_context.Users == null) {
                return NotFound();
            }
            var list = await _context.Users.Select(u => new {
                id = u.UserId,
                name = u.UserName,
                image = u.Avatar,
                rank = u.FollowedArtists.Count() +
                   u.DiscussionPosts.Count() +
                   u.ParticipatedEvents.Count()
            }).OrderByDescending(c => c.rank)
            .ToListAsync();

            return list.Select((a, index) => new {
                id = a.id,
                name = a.name,
                imnage = a.image,
                rank = index + 1
            }).ToList();
        }
        #endregion
    }
}