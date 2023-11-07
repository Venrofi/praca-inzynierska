using Backend.Core.Entities;
using Backend.Data.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MainPageController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MainPageController(ApplicationDbContext context)
        {
            _context = context;

        }

        #region Init
        [HttpGet("get-top-discussions")]
        public async Task<ActionResult<IEnumerable<DiscussionPost>>> GetTopDiscussions()
        {
            if (_context.DiscossionPosts == null)
            {
                return NotFound();
            }
            return await _context.DiscossionPosts.Where(dp => dp.NumberOfComments > 0).OrderByDescending(dp => dp.NumberOfComments).ToListAsync();
        }

        [HttpGet("get-top-artists")]
        public async Task<ActionResult<IEnumerable<ArtistProfile>>> GetTopArtists()
        {
            if (_context.ArtistsProfiles == null)
                return NotFound();

            if (_context.DiscossionPosts == null)
                return NotFound();

            var artistsPosts = _context.DiscossionPosts.Where(dp => dp.TopicType == DiscussionPost.TopicTypes.Artist).ToList();
            var topArtists = artistsPosts.GroupBy(ap => ap.Topic).Select(n => new
            {
                Name = n.Key,
                Count = n.Count()
            }).OrderBy(n => n.Name).Take(5);

            var list = (from profiles in _context.ArtistsProfiles
                        join artist in topArtists on profiles.Name equals artist.Name
                        select profiles).ToListAsync();

            return await list;
        }

        [HttpGet("get-top-users")]
        public async Task<ActionResult<IEnumerable<User>>> GetTopUsers()
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            return await _context.Users.Where(u => u.DiscussionPosts != null).OrderByDescending(u => u.DiscussionPosts.Count).ToListAsync();
        }

        [HttpGet("get-top-users-test-string")]
        public async Task<ActionResult<IEnumerable<string>>> GetTopUsersTestString()
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            return await _context.Users.Where(u => u.DiscussionPosts != null).OrderByDescending(u => u.DiscussionPosts.Count).Select(u => u.UserName).ToListAsync();
        }

        #endregion

        #region MainPageLists

        [HttpGet("get-discussions")]
        public async Task<ActionResult<IEnumerable<DiscussionPost>>> GetDiscussionsList()
        {
            if (_context.Events == null)
            {
                return NotFound();
            }
            return await _context.DiscossionPosts.OrderByDescending(d => d.CreationTime).ToListAsync();
        }

        [HttpGet("get-events")]
        public async Task<ActionResult<IEnumerable<Event>>> GetEventsList()
        {
            if (_context.Events == null)
            {
                return NotFound();
            }
            return await _context.Events.OrderByDescending(e=>e.Date).ToListAsync();
        }

        [HttpGet("get-premiers")]
        public async Task<ActionResult<IEnumerable<PremiereAlbum>>> GetPremiersList()
        {
            if (_context.PremiereAlbums == null)
            {
                return NotFound();
            }
            return await _context.PremiereAlbums.OrderByDescending(dp => dp.ReleaseDate).ToListAsync();
        }

        #endregion

    }
}
