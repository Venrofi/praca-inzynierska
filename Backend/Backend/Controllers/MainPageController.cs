using Backend.Core.Entities;
using Backend.Data.Context;
using Backend.Repositories;
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
        public async Task<ActionResult<IEnumerable<string>>> GetTopDiscussions()
        {
            if (_context.DiscussionPosts == null)
            {
                return NotFound();
            }
            return await _context.DiscussionPosts.Where(dp => dp.NumberOfComments > 0).OrderByDescending(dp => dp.NumberOfComments).Select(dp => dp.Title).ToListAsync();
        }

        [HttpGet("get-top-artists-string")]
        public async Task<ActionResult<IEnumerable<string>>> GetTopArtists()
        {
            if (_context.ArtistsProfiles == null)
                return NotFound();

            if (_context.DiscussionPosts == null)
                return NotFound();

            /*var artistsPosts = _context.DiscossionPosts.Where(dp => dp.TopicType == DiscussionPost.TopicTypes.Artist).ToList();
            var topArtists = artistsPosts.GroupBy(ap => ap.Topic).Select(n => new
            {
                Name = n.Key,
                Count = n.Count()
            }).OrderBy(n => n.Name).Take(5);

            var list = (from profiles in _context.ArtistsProfiles
                        join artist in topArtists on profiles.Name equals artist.Name
                        select profiles.Name).ToListAsync();*/

            return await _context.ArtistsProfiles.Where(ap => ap.DiscussionPosts != null).OrderBy(ap => ap.DiscussionPosts.Count).Select(ap => ap.Name).Take(5).ToArrayAsync();

        }

        [HttpGet("get-top-users")]
        public async Task<ActionResult<IEnumerable<User>>> GetTopUsers()
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            return await _context.Users.Where(u => u.DiscussionPosts != null).OrderByDescending(u => u.DiscussionPosts.Count).Take(5).ToListAsync();
        }

        [HttpGet("get-top-users-string")]
        public async Task<ActionResult<IEnumerable<string>>> GetTopUsersTestString()
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            return await _context.Users.Where(u => u.DiscussionPosts != null).OrderByDescending(u => u.DiscussionPosts.Count).Select(u => u.UserName).Take(5).ToListAsync();
        }

        [HttpGet("get-recommended-groups-for-user-string")]
        public async Task<ActionResult<IEnumerable<string>>> GetRecommendedGroupsForUser(Guid userId)
        {
            if (_context.Groups == null)
            {
                return NotFound();
            }

            //na podstawie czego? ilosc uzytkownikow w grupie, ilosc postow/komentarzy w grupie, AI do recomendacji xd
            GroupsRecommendationAlgorithm gra = new GroupsRecommendationAlgorithm(_context);
            var user = _context.Users.Where(u => u.UserId == userId).FirstOrDefault();
            var recommendedList = gra.GetRecommendedGroups(user);
            var list = (from groupt in _context.Groups
                       join listgroup in recommendedList on groupt.Name equals listgroup.Name
                       select groupt.Name).ToListAsync();

            return await list;
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
            return await _context.DiscussionPosts.OrderByDescending(d => d.CreationTime).ToListAsync();
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
