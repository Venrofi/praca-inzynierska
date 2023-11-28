using Backend.Core.Entities;
using Backend.Core.Requests;
using Backend.Data.Context;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.InMemory.Query.Internal;
using Microsoft.IdentityModel.Tokens;
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
        public async Task<ActionResult<object>> GetSideRecommendations(Guid? id) {
            if (_context.DiscussionPosts == null || _context.ArtistsProfiles == null || _context.Users == null || _context.Groups == null) {
                return NotFound();
            }

            User user = null;
            if (id != null) {
                user = await _context.Users.FindAsync(id);
                if (user == null)
                    return NotFound(new { code = "user-not-found" });
            }

            DateTime today = DateTime.Now;
            int daysToLastMonday = ((int)today.DayOfWeek - (int)DayOfWeek.Monday + 7) % 7;
            DateTime lastMonday = today.AddDays(-daysToLastMonday);

            var topDiscussions = await _context.DiscussionPosts
                .Where(dp => dp.TopicType == DiscussionPost.TopicTypes.Artist)
                .Where(dp => dp.ArtistProfileId != null)
                .Where(dp => dp.NumberOfComments > 0)
                .Where(dp => dp.CreationTime >= lastMonday)
                .Where(dp => !id.HasValue || !(dp.ArtistProfile.Followers.Contains(user)))  //to test
                .OrderByDescending(dp => dp.NumberOfComments)
                .Select(dp => new { id = dp.DiscussionPostId, name = dp.Title })
                .Take(5)
                .ToListAsync();

            var topArtists = await _context.ArtistsProfiles
                .Where(ap => ap.DiscussionPosts != null)
                .Where(ap => !id.HasValue || !(ap.Followers.Contains(user)))  //to test
                .OrderByDescending(ap => ap.DiscussionPosts.Count(dp => dp.CreationTime >= lastMonday))
                .Select(ap => new { id = ap.ArtistProfileId, name = ap.Name })
                .Take(5)
                .ToArrayAsync();

            var topMembers = await _context.Users
                .Where(u => u.DiscussionPosts != null)
                .OrderByDescending(u => u.DiscussionPosts.Count(dp=>dp.CreationTime >= lastMonday))
                .Select(u => new { id = u.UserId, name = u.UserName })
                .Take(5)
                .ToListAsync();

            var recommendedGroups = await _context.Groups
                .Where(g => g.DiscussionPosts != null)
                .Where(g => !id.HasValue || !(g.Users.Contains(user)))  //to test
                .OrderByDescending(g => g.DiscussionPosts.Count(dp => dp.CreationTime >= lastMonday))
                .Select(gr => new { id = gr.GroupId, name = gr.Name })
                .Take(5)
                .ToListAsync();

            //SideRecommendations new {TopDiscussions, TopArtists, TopUsers, RecommendedGroups}
            object sideRecommendations = new { 
                TopDiscussions = new { title = "Najlepsze dyskusje" , content = topDiscussions },
                TopArtists = new { title = "Najpopularniejsi artyści", content = topArtists },
                TopMembers = new { title = "Najbardziej aktywni", content = topMembers },
                RecommendedGroups = new { title = "Polecane grupy", content = recommendedGroups }
            };

            return sideRecommendations;
        }
        #endregion

        #region MainPageLists

        [HttpGet("discussion-posts")]
        public async Task<ActionResult<IEnumerable<object>>> GetDiscussionsList(Guid? id)
        {
            if (_context.DiscussionPosts == null)
                return NotFound(new { code = "posts-not-found"});

            User user = null;
            if (id != null) {
                user = await _context.Users.FindAsync(id);
                if(user == null) 
                    return NotFound(new { code = "user-not-found"});
                return await _context.DiscussionPosts.Include(d => d.ArtistProfile).Include(d => d.Group)
                    .Where(d => d.Group.Users.Contains(user) || d.ArtistProfile.Followers.Contains(user))
                    .OrderByDescending(d => d.CreationTime)
                    .Select(d => new {
                        id = d.DiscussionPostId,
                        author = new { id = d.User.UserId, name = d.User.UserName, avatar = !d.User.Avatar.IsNullOrEmpty() ? (d.User.Avatar) : ("")},
                        topic = new { id = d.GroupId.HasValue ? d.GroupId : d.ArtistProfileId, name = d.Topic, type = d.TopicType.ToString().ToUpper() },
                        title = d.Title,
                        creationTime = d.CreationTime,
                        numberOfComments = d.NumberOfComments
                    }).ToListAsync();
            }

            return await _context.DiscussionPosts.Where(d => d.TopicType == DiscussionPost.TopicTypes.Artist)
                .OrderByDescending(d => d.CreationTime)
                .Select(d => new {
                    id = d.DiscussionPostId,
                    author = new { id = d.User.UserId, name = d.User.UserName, avatar = !d.User.Avatar.IsNullOrEmpty() ? (d.User.Avatar) : ("") },
                    topic = new { id = d.GroupId.HasValue ? d.GroupId : d.ArtistProfileId, name = d.Topic, type = d.TopicType.ToString().ToUpper() },
                    title = d.Title,
                    creationTime = d.CreationTime,
                    numberOfComments = d.NumberOfComments
                }).ToListAsync();
        }

        [HttpGet("events")]
        public async Task<ActionResult<IEnumerable<object>>> GetEventsList(Guid? id)
        {
            if (_context.Events == null)
                return NotFound(new { code = "events-not-found"});

            User user = null;
            if (id != null) {
                user = await _context.Users.FindAsync(id);
                if (user == null)
                    return NotFound(new { code = "user-not-found" });
                return await _context.Events.Include(e => e.Participants)
                    .OrderByDescending(e => e.Participants.Contains(user))
                    .ThenByDescending(e => e.Group.Users.Contains(user))
                    .ThenByDescending(e=> e.ArtistProfile.Followers.Contains(user))                   
                    .ThenBy(e=>e.Date)
                    .Select(e => new {
                        id = e.EventId,
                        name = e.Title,
                        image = e.Cover,
                        date = e.Date,
                        location = e.Location,
                        description = e.Description,
                        promoter = new { id = e.GroupId.HasValue ? e.GroupId : e.ArtistProfileId, name = e.Group.Name != null ? e.Group.Name : e.ArtistProfile.Name },
                        participants = e.Participants.Select(p => new { id = p.UserId, name = p.UserName })
                }).ToListAsync();
            }

            return await _context.Events.Include(e=>e.Participants)
                .OrderByDescending(e=>e.Date)
                .Select(e => new {
                    id = e.EventId,
                    name = e.Title,
                    image = e.Cover,
                    date = e.Date,
                    location = e.Location,
                    description = e.Description,
                    promoter = new { id = e.GroupId.HasValue ? e.GroupId : e.ArtistProfileId, name = e.Group.Name != null ? e.Group.Name : e.ArtistProfile.Name },
                    participants = e.Participants.Select(p => new { id = p.UserId, name = p.UserName })
            }).ToListAsync();
        }

        [HttpGet("premiere-albums")]
        public async Task<ActionResult<IEnumerable<object>>> GetPremiersList(Guid? id)
        {
            if (_context.PremiereAlbums == null)
                return NotFound(new { code = "premiere-albums-not-found"});

            User user = null;
            if (id != null) {
                user = await _context.Users.FindAsync(id);
                if (user == null)
                    return NotFound(new { code = "user-not-found" });
                return await _context.PremiereAlbums.Include(p => p.ArtistProfile)
                    .OrderByDescending(p => p.ArtistProfile.Followers.Contains(user))
                    .ThenBy(p => p.ReleaseDate)
                    .Select(p => new {
                        id = p.PremiereAlbumId,
                        title = p.Title,
                        artist = new {
                            id = p.ArtistProfileId,
                            name = p.ArtistProfile.Name
                        },
                        cover = p.Cover,
                        releaseDate = p.ReleaseDate
                }).ToListAsync();
            }

            return await _context.PremiereAlbums.Include(p => p.ArtistProfile)
                .OrderByDescending(p => p.ReleaseDate)
                .Select(p => new {
                    id = p.PremiereAlbumId,
                    title = p.Title,
                    artist = new {
                        id = p.ArtistProfileId,
                        name = p.ArtistProfile.Name
                    },
                    cover = p.Cover,
                    releaseDate = p.ReleaseDate
            }).ToListAsync();
        }

        #endregion

    }
}
