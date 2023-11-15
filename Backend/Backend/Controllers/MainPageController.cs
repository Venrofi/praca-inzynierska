using Backend.Core.Entities;
using Backend.Data.Context;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.InMemory.Query.Internal;

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

        #region InitSideRecommendations
        [HttpGet("get-side-recommendations")]
        public async Task<ActionResult<IEnumerable<object>>> GetSideRecommendations() {
            if (_context.DiscussionPosts == null) {
                return NotFound();
            }
            //SideRecommendations new {TopDiscussions, TopArtists, TopUsers, RecommendedGroups}
            
            //todo
            return await _context.DiscussionPosts.Where(dp => dp.NumberOfComments > 0).OrderByDescending(dp => dp.NumberOfComments).Select(dp => new { dp.DiscussionPostId, dp.Title, dp.NumberOfComments }).ToListAsync();
        }

        [HttpGet("get-discussions-for-side-recommendations")]
        public async Task<ActionResult<IEnumerable<object>>> GetDiscussionsForSideRecommendations()
        {
            //TopDiscussions {new {title = "Najlepsze posty", content = new {
            //id = id,
            //label = string // nazwa postu, artysty, itp
            //}}}
            if (_context.DiscussionPosts == null)
            {
                return NotFound();
            }

            //todo
            return await _context.DiscussionPosts.Where(dp => dp.NumberOfComments > 0).OrderByDescending(dp => dp.NumberOfComments).Select(dp => new { dp.DiscussionPostId, dp.Title, dp.NumberOfComments}).ToListAsync();
        }

        [HttpGet("get-artists-for-side-recommendations")]
        public async Task<ActionResult<IEnumerable<object>>> GetArtistsForSideRecommendations()
        {
            //TopDiscussions {new {title = "Najlepsi artyści", content = new {
            //id = id,
            //label = string // nazwa postu, artysty, itp
            //}}}
            if (_context.ArtistsProfiles == null)
                return NotFound();

            if (_context.DiscussionPosts == null)
                return NotFound();

            //todo
            return await _context.ArtistsProfiles.Where(ap => ap.DiscussionPosts != null).OrderByDescending(ap => ap.DiscussionPosts.Count).Select(ap => new { ap.ArtistProfileId, ap.Name, ap.DiscussionPosts.Count}).Take(5).ToArrayAsync();

        }

        /*[HttpGet("get-top-users")]
        public async Task<ActionResult<IEnumerable<User>>> GetTopUsers()
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            //todo sort by number of posts in week maybe
            return await _context.Users.Where(u => u.DiscussionPosts != null).OrderByDescending(u => u.DiscussionPosts.Count).Take(5).ToListAsync();
        }*/

        [HttpGet("get-users-for-side-recommendations")]
        public async Task<ActionResult<IEnumerable<object>>> GetUsersForSideRecommendations()
        {
            //TopDiscussions {new {title = "Najlepsi użytkownicy", content = new {
            //id = id,
            //label = string // nazwa postu, artysty, itp
            //}}}
            if (_context.Users == null)
            {
                return NotFound();
            }

            //todo
            return await _context.Users.Where(u => u.DiscussionPosts != null).OrderByDescending(u => u.DiscussionPosts.Count).Select(u => new {u.UserId, u.UserName, u.DiscussionPosts.Count }).Take(5).ToListAsync();
        }

        [HttpGet("get-groups-for-side-recommendations")]
        public async Task<ActionResult<IEnumerable<object>>> GetGroupsForSideRecommendations(Guid userId)
        {
            //TopDiscussions {new {title = "Polecane grupy", content = new {
            //id = id,
            //label = string // nazwa postu, artysty, itp
            //}}}
            if (_context.Groups == null)
                return NotFound();

            //na podstawie czego? ilosc uzytkownikow w grupie, ilosc postow/komentarzy w grupie, AI do recomendacji xd
            GroupsRecommendationAlgorithm gra = new GroupsRecommendationAlgorithm(_context);
            var user = _context.Users.Where(u => u.UserId == userId).FirstOrDefault();
            var recommendedList = gra.GetRecommendedGroups(user);
            var list = (from groupt in _context.Groups
                        join listgroup in recommendedList on groupt.Name equals listgroup.Name
                        select new { groupt.GroupId, groupt.Name }).ToListAsync();

            //todo?
            return await list;
        }
        #endregion

        #region MainPageLists

        [HttpGet("discussion-posts")]
        public async Task<ActionResult<IEnumerable<DiscussionPost>>> GetDiscussionsList()
        {
            if (_context.Events == null)
            {
                return NotFound();
            }
            return await _context.DiscussionPosts.OrderByDescending(d => d.CreationTime).ToListAsync();
        }

        [HttpGet("events")]
        public async Task<ActionResult<IEnumerable<Event>>> GetEventsList()
        {
            if (_context.Events == null)
            {
                return NotFound();
            }
            return await _context.Events.OrderByDescending(e=>e.Date).ToListAsync();
        }

        [HttpGet("premiere-albums")]
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
