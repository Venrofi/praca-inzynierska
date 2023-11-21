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
            if (_context.ArtistsProfiles == null) {
                return NotFound();
            }
            return await _context.ArtistsProfiles.Select(a => new { id = a.ArtistProfileId, name = a.Name, image = a.Image }).ToListAsync();
        }
        #endregion

        #region Groups
        [HttpGet("groups")]
        public async Task<ActionResult<object>> GetGroups() {
            if (_context.Groups == null) {
                return NotFound();
            }
            return await _context.Groups.Select(g => new { id = g.GroupId, name = g.Name, image = g.Image }).ToListAsync();
        }
        #endregion

        #region Members
        [HttpGet("members")]
        public async Task<ActionResult<object>> GetMembers() {
            if (_context.Users == null) {
                return NotFound();
            }
            return await _context.Users.Select(u => new { id = u.UserId, name = u.UserName, avatar = u.Avatar}).ToListAsync();
        }
        #endregion
    }
}