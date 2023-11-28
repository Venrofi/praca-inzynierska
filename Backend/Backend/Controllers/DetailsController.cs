using Backend.Core.Entities;
using Backend.Data.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using Microsoft.IdentityModel.Tokens;
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

            if (_context.ArtistsProfiles == null) {
                return NotFound();
            }

            var resArtist = await _context.ArtistsProfiles
                .Include(a => a.OrganizedEvents)
                .Include(a => a.DiscussionPosts)
                .Include(a => a.Followers)
                .Include(a => a.Albums)
                .Where(a => a.ArtistProfileId == id).FirstOrDefaultAsync();

            if (resArtist == null) {
                return NotFound();
            }

            //jesli cos niepotrzebne -> zakomentowac
            var res = new {
                id = resArtist.ArtistProfileId,
                name = resArtist.Name,
                image = resArtist.Image,
                description = resArtist.Description,
                albums = resArtist.Albums.Select(a => new { id = a.PremiereAlbumId, name = a.Title, cover = a.Cover, releaseDate = a.ReleaseDate }),
                events = resArtist.OrganizedEvents.Select(e => new { id = e.EventId, name = e.Title }),
                followers = resArtist.Followers.Select(f => new { id = f.UserId, name = f.UserName }),
                discussionPosts = resArtist.DiscussionPosts.Select(d => new { id = d.DiscussionPostId, name = d.Title })
            };
            return res;
        }

        #endregion

        #region Group
        [HttpGet("group")]
        public async Task<ActionResult<object>> GetGroupDetails(Guid id) {
            /*// GROUP
                export interface Group extends BaseWortalElement {
                  image: string;
                  description: string;
                  events: BaseWortalElement[]; // Events created by the Group
                  members: BaseWortalElement[]; // Members that joined the Group
                  discussionPosts: BaseWortalElement[]; // Discussion posts created by the Group
                }*/
            if (_context.Groups == null) {
                return NotFound();
            }

            var group = await _context.Groups.Include(g => g.OrganizedEvents).Include(g => g.Users).Include(g => g.DiscussionPosts).Where(g => g.GroupId == id).FirstOrDefaultAsync();

            if (group == null) {
                return NotFound();
            }

            var res = new {
                id = group.GroupId,
                name = group.Name,
                image = group.Image,
                description = group.Description,
                events = group.OrganizedEvents.Select(e => new {
                    id = e.EventId,
                    name = e.Title
                }),
                members = group.Users.Select(u => new {
                    id = u.UserId,
                    name = u.UserName
                }),
                discussionPosts = group.DiscussionPosts.Select(d => new {
                    id = d.DiscussionPostId,
                    name = d.Title
                })
            };
            return res;
        }
        #endregion

        #region Event
        [HttpGet("event")]
        public async Task<ActionResult<object>> GetEventDetails(Guid id) {
            if (_context.Events == null) {
                return NotFound();
            }

            var eventt = await _context.Events
                .Include(e => e.Participants)
                .Include(e => e.Group)
                .Include(e => e.ArtistProfile)
                .Where(e => e.EventId == id).FirstOrDefaultAsync();
            if (eventt == null) {
                return NotFound();
            }

            var res = new {
                id = eventt.EventId,
                name = eventt.Title,
                date = eventt.Date,
                image = eventt.Cover,
                location = eventt.Location,
                description = eventt.Description,
                promoter = new {
                    id = eventt.ArtistProfileId.HasValue ? eventt.ArtistProfileId : eventt.GroupId,
                    name = eventt.ArtistProfile != null ? eventt.ArtistProfile.Name : eventt.Group.Name
                },
                participants = eventt.Participants.Select(p => new {
                    id = p.UserId,
                    name = p.UserName
                })
            };
            return res;
        }
        #endregion

        #region Discussion
        [HttpGet("discussion")]
        public async Task<ActionResult<object>> GetDiscussionDetails(Guid id) {
            if (_context.DiscussionPosts == null || _context.DiscussionPostsDetails == null) {
                return NotFound();
            }

            var post = await _context.DiscussionPosts
                .Include(dp => dp.User)
                .Include(dp => dp.ArtistProfile)
                .Include(dp => dp.Group)
                .Where(dp => dp.DiscussionPostId == id).FirstOrDefaultAsync();

            var group = await _context.Groups
                .Include(g => g.Users)
                .Where(g => g == post.Group).FirstOrDefaultAsync();

            var details = await _context.DiscussionPostsDetails
                .Where(dpd => dpd.DiscussionPostId == id).FirstOrDefaultAsync();
            var comments = await _context.Comments
                .Include(c => c.User)
                .Where(c => c.DiscussionPostDetailsId == details.DiscussionPostDetailsId).ToListAsync();

            //var type = await _context.UserTypes.Where(u => u.Description == "USER").FirstOrDefaultAsync();

            if (post == null)
                return NotFound(new { code = "post-not-found" });
            if (details == null)
                return NotFound(new { code = "details-not-found" });
            if (comments == null)
                return NotFound(new { code = "comments-not-found" });
            //if (type == null)
            //    return NotFound(new { code = "user-type-not-found"});
            var res = new {
                id = post.DiscussionPostId,
                author = new {
                    id = post.UserId,
                    //name = (post.User.UserTypeId == type.UserTypeId) ? (post.User.UserName) : (string.Empty),
                    //avatar = (post.User.UserTypeId == type.UserTypeId) ? (post.User.Avatar) : (string.Empty)
                    name = post.User.UserName,
                    avatar = !post.User.Avatar.IsNullOrEmpty() ? (post.User.Avatar) : (""),
                    active = (post.TopicType == DiscussionPost.TopicTypes.Artist) ? (true) : (group.Users.Contains(post.User) ? (true) : (false))
                },
                topic = new {
                    id = (post.TopicType == DiscussionPost.TopicTypes.Artist) ? (post.ArtistProfileId) : (post.GroupId),
                    name = (post.TopicType == DiscussionPost.TopicTypes.Artist) ? (post.ArtistProfile.Name) : (post.Group.Name),
                    type = post.TopicType.ToString().ToUpper()
                },
                title = post.Title,
                creationTime = post.CreationTime,
                numberOfComments = post.NumberOfComments,
                comments = comments.Select(c => new {
                    author = new {
                        id = c.UserId,
                        name = c.User.UserName                  
                    },
                    creationTime = c.CreationTime,
                    content = c.Content
                }).OrderBy(o => o.creationTime),
                content = details.Content
            };
            return res;
        }
        #endregion

        #region Album
        [HttpGet("album")]
        public async Task<ActionResult<object>> GetAlbumDetails(Guid id) {
            if (_context.PremiereAlbums == null || _context.PremiereAlbumDetails == null) {
                return NotFound();
            }
            var details = await _context.PremiereAlbumDetails.Include(pad => pad.PremiereAlbum).Include(pad => pad.Tracks).Where(pad => pad.PremiereAlbumId == id).FirstOrDefaultAsync();

            if (details == null) {
                return NotFound();
            }

            var res = new {
                id = details.PremiereAlbumDetailsId,
                name = details.PremiereAlbum.Title,
                cover = details.PremiereAlbum.Cover,
                releaseDate = details.PremiereAlbum.ReleaseDate,
                tracks = details.Tracks.Select(t => new {
                    title = t.Title,
                    //duration = $"{t.Duration.Minutes}:{t.Duration.Seconds}"
                    duration = $"{t.Duration:mm\\:ss}"
                }),
                description = details.Description,
                duration = $"{details.Duration:hh\\:mm\\:ss}",
                genre = details.Genre,
                rating = Math.Round(details.Rating, 2).ToString("0.00")
            };
            return res;
        }
        #endregion
    }
}
