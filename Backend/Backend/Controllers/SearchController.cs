using Backend.Core.Entities;
using Backend.Data.Context;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase {
        private readonly ApplicationDbContext _context;
        private readonly ProfanitySearchAlgorithm _psa;

        public SearchController(ApplicationDbContext context) {
            _context = context;
            _psa = new ProfanitySearchAlgorithm(_context);
        }

        #region Search
        [HttpGet("search")]
        public async Task<ActionResult<object>> Search(Guid? id, string input) {

            if (_context.DiscussionPosts == null || _context.ArtistsProfiles == null || _context.Users == null || _context.Groups == null || _context.Events == null) {
                return NotFound(new { code = "entity-error"});
            }
            if (input == null || input == string.Empty || input.Length < 3) return BadRequest(new { code = "input-error"});

            User? user = null;
            if (id.HasValue) {
                user = await _context.Users.Where(u => u.UserId == id).FirstOrDefaultAsync();
                if (user == null)
                    return NotFound(new { code = "user-not-found" });
            }

            var artists = await _context.ArtistsProfiles
                .Include(ap => ap.Followers)
                .Where(ap => ap.Name.Contains(input) || ap.Description.Contains(input))
                .OrderBy(a => a.Name)
                .Select(ap => new { 
                    id = ap.ArtistProfileId, 
                    name = ap.Name
                })
                .ToListAsync();

            var events = await _context.Events
                .Include(e => e.Group.Users)
                .Where(e => id.HasValue ? (e.Promotor == Event.PromotorType.Artist || (e.Promotor == Event.PromotorType.Group && e.Group.Users.Contains(user))) : (e.Promotor == Event.PromotorType.Artist))
                .Where(e => id.HasValue ? (e.Group != null || e.ArtistProfile != null) : (e.ArtistProfile != null))
                .Where(e => e.Title.Contains(input) || e.Description.Contains(input))
                .OrderBy(e => e.Title)
                .ThenBy(e => e.Date)
                .Select(e => new { 
                    id = e.EventId, 
                    name = e.Title,
                })
                .ToListAsync();

            var posts = await _context.DiscussionPosts
                .Include(dp => dp.DiscussionPostDetails)
                .Include(dp => dp.Group.Users)
                .Where(dp => id.HasValue ? (dp.TopicType == DiscussionPost.TopicTypes.Artist || (dp.TopicType == DiscussionPost.TopicTypes.Group && dp.Group.Users.Contains(user))) : (dp.TopicType == DiscussionPost.TopicTypes.Artist))
                .Where(dp => id.HasValue ? (dp.Group != null || dp.ArtistProfile != null) : (dp.ArtistProfile != null))
                .Where(dp => dp.Title.Contains(input) || dp.Topic.Contains(input) || dp.DiscussionPostDetails.Content.Contains(input))// || dp.DiscussionPostDetails.Comments.Any(c => c.Content.Contains(input)))
                .OrderBy(dp => dp.CreationTime)
                .Select(dp => new { id = dp.DiscussionPostId, name = dp.Title }) })
                .ToListAsync();

            var users = id.HasValue ? (await _context.Users
                .Where(u => u.UserName.Contains(input))
                .OrderBy(u => u.UserName)
                .Select(u => new { id = u.UserId, name = u.UserName })
                .ToListAsync()) : (null);

            var groups = id.HasValue ? (await _context.Groups
                .Where(g => g.Name.Contains(input))
                .OrderBy(g => g.Name)
                .Select(gr => new { 
                    id = gr.GroupId, 
                    name = gr.Name
                })
                .ToListAsync()) : (null);

            return new { artists, events, posts, users, groups };
        }
        #endregion
    }
}
