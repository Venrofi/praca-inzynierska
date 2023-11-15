using Backend.Core.Entities;
using Backend.Data.Context;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.InMemory.Query.Internal;
using System.Runtime.Intrinsics.Arm;

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
        [HttpGet("side-recommendations")]
        public async Task<ActionResult<object>> GetSideRecommendations() {
            if (_context.DiscussionPosts == null) {
                return NotFound();
            }
            //SideRecommendations new {TopDiscussions, TopArtists, TopUsers, RecommendedGroups}
            object sideRecommendations = new { 
                TopDiscussions = new { title = "Najlepsze dyskusje" , content = await GetDiscussionsForSideRecommendations() },
                TopArtists = new { title = "Najpopularniejsi artyści", content = await GetArtistsForSideRecommendations() },
                TopMembers = new { title = "Najbardziej aktywni", content = await GetUsersForSideRecommendations() },
                //RecommendedGroups = await GetGroupsForSideRecommendations(null)
            };

            //todo
            return sideRecommendations;
        }

        [HttpGet("get-discussions-for-side-recommendations")]
        public async Task<ActionResult<IEnumerable<object>>> GetDiscussionsForSideRecommendations()
        {
            if (_context.DiscussionPosts == null)
            {
                return NotFound();
            }

            //todo
            return await _context.DiscussionPosts
                .Where(dp => dp.NumberOfComments > 0)
                .OrderByDescending(dp => dp.NumberOfComments)
                .Select(dp => new { id = dp.DiscussionPostId, name = dp.Title })
                .Take(5)
                .ToListAsync();
        }

        [HttpGet("get-artists-for-side-recommendations")]
        public async Task<ActionResult<IEnumerable<object>>> GetArtistsForSideRecommendations()
        {
            if (_context.ArtistsProfiles == null)
                return NotFound();

            if (_context.DiscussionPosts == null)
                return NotFound();

            //todo
            return await _context.ArtistsProfiles
                .Where(ap => ap.DiscussionPosts != null)
                .OrderByDescending(ap => ap.DiscussionPosts.Count)
                .Select(ap => new { id = ap.ArtistProfileId, name = ap.Name })
                .Take(5)
                .ToArrayAsync();

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
            return await _context.Users
                .Where(u => u.DiscussionPosts != null)
                .OrderByDescending(u => u.DiscussionPosts.Count)
                .Select(u => new { id = u.UserId, name = u.UserName })
                .Take(5)
                .ToListAsync();
        }

        [HttpGet("get-groups-for-side-recommendations")]
        public async Task<ActionResult<IEnumerable<object>>> GetGroupsForSideRecommendations(Guid? userId)
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
        public async Task<ActionResult<IEnumerable<object>>> GetDiscussionsList()
        {
            if (_context.DiscussionPosts == null)
            {
                return NotFound();
            }

            return await _context.DiscussionPosts.OrderByDescending(d => d.CreationTime).Select(d => new {
                id = d.DiscussionPostId,
                author = new { id = d.User.UserId, name = d.User.UserName, avatar = d.User.Avatar },
                //topic = d.TopicType.ToString(),
                topic = new { id = d.GroupId, name = d.Topic, type = d.TopicType.ToString() },
                title = d.Title,
                creationTime = d.CreationTime,
                numberOfComments = d.NumberOfComments
            }).ToListAsync();
        }

        [HttpGet("events")]
        public async Task<ActionResult<IEnumerable<Event>>> GetEventsList()
        {
            if (_context.Events == null)
            {
                return NotFound();
            }

            /* return {
                        id: event.eventId,
                        name: event.title,
                        image: event.cover,
                        date: event.date,
                        location: event.location,
                        description: event.description,
                        promoter: [],
                        participants: [],
                      };*/

            
            return await _context.Events.OrderByDescending(e=>e.Date).ToListAsync();
        }

        [HttpGet("premiere-albums")]
        public async Task<ActionResult<IEnumerable<PremiereAlbum>>> GetPremiersList()
        {
            if (_context.PremiereAlbums == null)
            {
                return NotFound();
            }
            /*return {
                        id: album.premiereAlbumId,
                        title: album.title,
                        artist: {
                          id: album.artistProfileId,
                          name: album.artist,
                        },
                        cover: album.cover || `https://picsum.photos/${randomCoverSize}/${randomCoverSize * 2}`,
                        releaseDate: album.releaseDate,
                      };*/
            return await _context.PremiereAlbums.OrderByDescending(dp => dp.ReleaseDate).ToListAsync();
        }

        #endregion

    }
}
