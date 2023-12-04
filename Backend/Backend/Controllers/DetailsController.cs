using Backend.Core.Entities;
using Backend.Data.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics.CodeAnalysis;
using System.Reflection.Metadata.Ecma335;
using System.Runtime.Intrinsics.Arm;

namespace Backend.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class DetailsController : ControllerBase {
        private readonly ApplicationDbContext _context;

        public DetailsController(ApplicationDbContext context) {
            _context = context;
        }

        #region Artist

        [HttpGet("artist")]
        public async Task<ActionResult<object>> GetArtistDetails(Guid id) {
            if (_context.ArtistsProfiles == null) return NotFound(new { code = "entity-error"});

            var artist = await _context.ArtistsProfiles
                .Include(a => a.OrganizedEvents)
                .Include(a => a.DiscussionPosts)
                .Include(a => a.Followers)
                .Include(a => a.Albums)
                .Where(a => a.ArtistProfileId == id)
                .Select( a => new {
                    id = a.ArtistProfileId,
                    name = a.Name,
                    image = a.Image,
                    description = a.Description,
                    albums = a.Albums.Select(a => new { id = a.PremiereAlbumId, name = a.Title, cover = a.Cover, releaseDate = a.ReleaseDate }),
                    events = a.OrganizedEvents.Select(e => new { id = e.EventId, name = e.Title }),
                    followers = a.Followers.Select(f => new { id = f.UserId, name = f.UserName }),
                    discussionPosts = a.DiscussionPosts.Select(d => new { id = d.DiscussionPostId, name = d.Title })
                }).FirstOrDefaultAsync();

            return artist == null ? (BadRequest(new { code = "artist-not-found"})) : (artist);
        }

        #endregion

        #region Group
        [HttpGet("group")]
        public async Task<ActionResult<object>> GetGroupDetails(Guid id) {
            if (_context.Groups == null) return NotFound(new { code = "entity-error" });

            var group = await _context.Groups
                .Include(g => g.OrganizedEvents)
                .Include(g => g.Users)
                .Include(g => g.DiscussionPosts)
                .Where(g => g.GroupId == id)
                .Select(g => new {
                    id = g.GroupId,
                    name = g.Name,
                    image = g.Image,
                    description = g.Description,
                    events = g.OrganizedEvents.Select(e => new {
                        id = e.EventId,
                        name = e.Title
                    }),
                    members = g.Users.Select(u => new {
                        id = u.UserId,
                        name = u.UserName
                    }),
                    discussionPosts = g.DiscussionPosts.Select(d => new {
                        id = d.DiscussionPostId,
                        name = d.Title
                    })
                })
                .FirstOrDefaultAsync();

            return group == null ? (BadRequest(new { code = "group-not-found" })) :(group);
        }
        #endregion

        #region Event
        [HttpGet("event")]
        public async Task<ActionResult<object>> GetEventDetails(Guid id) {
            if (_context.Events == null) return NotFound(new { code = "entity-error" });

            var eve = await _context.Events
                .Include(e => e.Participants)
                .Include(e => e.Group)
                .Include(e => e.ArtistProfile)
                .Where(e => e.EventId == id)
                .Select(e => new {
                    id = e.EventId,
                    name = e.Title,
                    date = e.Date,
                    image = e.Cover,
                    type = e.Promotor.ToString().ToUpper(),
                    location = e.Location,
                    description = e.Description,
                    promoter = new {
                        id = e.ArtistProfileId.HasValue ? e.ArtistProfileId : e.GroupId,
                        name = e.ArtistProfile != null ? e.ArtistProfile.Name : e.Group.Name
                    },
                    participants = e.Participants.Select(p => new {
                        id = p.UserId,
                        name = p.UserName
                    })
                })
                .FirstOrDefaultAsync();

            return eve == null ? (BadRequest(new { code = "event-not-found" })) : (eve);
        }
        #endregion

        #region Discussion
        [HttpGet("discussion")]
        public async Task<ActionResult<object>> GetDiscussionDetails(Guid id) {
            if (_context.DiscussionPosts == null || _context.DiscussionPostsDetails == null) return NotFound(new { code = "entity-error" });

            var post = await _context.DiscussionPosts
                .Include(dp => dp.User)
                .Include(dp => dp.ArtistProfile)
                .Include(dp => dp.Group.Users)
                .Include(dp => dp.DiscussionPostDetails.Comments)
                .Where(dp => dp.DiscussionPostId == id)
                .Select(d => new {
                    id = d.DiscussionPostId,
                    author = new {
                        id = d.UserId,
                        name = d.User.UserName,
                        avatar = !d.User.Avatar.IsNullOrEmpty() ? (d.User.Avatar) : (""),
                        active = (d.TopicType == DiscussionPost.TopicTypes.Artist) ? (true) : (d.Group.Users.Contains(d.User) ? (true) : (false))
                    },
                    topic = new {
                        id = (d.TopicType == DiscussionPost.TopicTypes.Artist) ? (d.ArtistProfileId) : (d.GroupId),
                        name = (d.TopicType == DiscussionPost.TopicTypes.Artist) ? (d.ArtistProfile.Name) : (d.Group.Name),
                        type = d.TopicType.ToString().ToUpper()
                    },
                    title = d.Title,
                    creationTime = d.CreationTime,
                    numberOfComments = d.DiscussionPostDetails.Comments != null ? (d.DiscussionPostDetails.Comments.Count): (0),
                    comments = d.DiscussionPostDetails.Comments.Select(c => new {
                        author = new {
                            id = c.UserId,
                            name = c.User.UserName
                        },
                        creationTime = c.CreationTime,
                        content = c.Content
                    }).OrderBy(o => o.creationTime).ToList(),
                    content = d.DiscussionPostDetails.Content
                })
                .FirstOrDefaultAsync();

            return post == null ? (BadRequest(new { code = "post-not-found" })) :(post);
        }
        #endregion

        #region Album
        [HttpGet("album")]
        public async Task<ActionResult<object>> GetAlbumDetails(Guid id) {
            if (_context.PremiereAlbums == null || _context.PremiereAlbumDetails == null) return NotFound(new { code = "entity-error" });

            var album = await _context.PremiereAlbumDetails
                .Include(pad => pad.PremiereAlbum)
                .Include(pad => pad.Tracks)
                .Where(pad => pad.PremiereAlbumId == id)
                .Select(a => new {
                    id = a.PremiereAlbumId,
                    name = a.PremiereAlbum.Title,
                    artist = new { 
                        id = a.PremiereAlbum.ArtistProfileId, 
                        name = a.PremiereAlbum.ArtistProfile.Name
                    },
                    cover = a.PremiereAlbum.Cover,
                    releaseDate = a.PremiereAlbum.ReleaseDate,
                    tracks = a.Tracks.Select(t => new {
                        title = t.Title,
                        duration = $"{t.Duration:mm\\:ss}"
                    }),
                    description = a.Description,
                    duration = $"{a.Duration:hh\\:mm\\:ss}",
                    genre = a.Genre,
                    rating = Math.Round(a.Rating, 2).ToString("0.00")
                })
                .FirstOrDefaultAsync();

            return album == null ? (BadRequest(new { code = "album-not-found" })) :(album);
        }
        #endregion
    }
}
