using Backend.Core.Entities;
using Backend.Core.Requests;
using Backend.Data.Context;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Reflection.Metadata.Ecma335;
using System.Runtime.Intrinsics.Arm;

namespace Backend.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class DiscussionPostController : ControllerBase {
        private readonly ApplicationDbContext _context;
        private readonly ProfanitySearchAlgorithm _psa;

        public DiscussionPostController(ApplicationDbContext context) {
            _context = context;
            _psa = new ProfanitySearchAlgorithm(_context);
        }

        #region Init
        [HttpPost("init-create-data")]
        public async Task<ActionResult<object>> Init(Guid id) {
            try {
                if (id == null) return BadRequest(new { code = "id-error" });
                var user = await _context.Users.Include(u => u.Groups).Where(u => u.UserId == id).FirstOrDefaultAsync();
                if (user == null) return NotFound(new { code = "user-not-found" });

                return await _context.Groups.Where(g => g.Users.Contains(user)).Select(g => new {
                    id = g.GroupId,
                    name = g.Name
                }).ToListAsync();
            }
            catch (Exception ex) {
                return StatusCode(500, $"An error occurred while getting groups. | {ex.Message}");
            }
        }
        #endregion

        #region Create
        [HttpPost("create")]
        public async Task<IActionResult> Create(DiscussionPostRequest request) {
            /*      public Guid AuthorId { get; set; }
                    public Guid GroupId { get; set; }
                    public string Title { get; set; } = string.Empty;
                    public string Content { get; set; } = string.Empty; */
            try {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                var user = await _context.Users.Include(u => u.Groups).Where(u => u.UserId == request.AuthorId).FirstOrDefaultAsync();
                if (user == null) return NotFound(new { code = "user-not-found" });
                var group = await _context.Groups.Include(g => g.Users).Where(g => g.GroupId == request.GroupId).FirstOrDefaultAsync();
                if (group == null) return NotFound(new { code = "group-not-found" });
                if (request.Title == null || request.Title == string.Empty)
                    return BadRequest(new { code = "empty-title" });
                if (request.Content == null || request.Content == string.Empty)
                    return BadRequest(new { code = "empty-content" });
                //check user in group and group in user
                if (!user.Groups.Where(g => g == group).Any() || !group.Users.Where(u => u == user).Any())
                    return BadRequest(new { code = "user-group-error" });

                //Profanities searching -- for now, not good implementation imo

                //string testTitle = await _psa.ChangeCharacters(request.Title.ToLower());
                //string testContent = await _psa.ChangeCharacters(request.Content.ToLower());
                //if (_psa.HasBadWords(testTitle).Result) //|| _psa.HasBadWords(testContent).Result)
                //    return Ok(new { code = "bad-words" });

                var dp = new DiscussionPost() {
                    DiscussionPostId = Guid.NewGuid(),
                    Title = request.Title,
                    Topic = group.Name,
                    TopicType = DiscussionPost.TopicTypes.Group,
                    CreationTime = DateTime.UtcNow,
                    User = user,
                    UserId = user.UserId,
                    DiscussionPostDetails = new DiscussionPostDetails(),
                    Group = group,
                    GroupId = group.GroupId,
                    ArtistProfile = null,
                    ArtistProfileId = null
                };
                dp.DiscussionPostDetails = new DiscussionPostDetails {
                    DiscussionPostDetailsId = Guid.NewGuid(),
                    Content = request.Content,
                    DiscussionPost = dp,
                    DiscussionPostId = dp.DiscussionPostId,
                    Comments = new List<Comment>()
                };
                _context.DiscussionPosts.Add(dp);
                _context.DiscussionPostsDetails.Add(dp.DiscussionPostDetails);
                await _context.SaveChangesAsync();
                return Ok(new { code = "success" });
            }
            catch (Exception ex) {
                return StatusCode(500, $"An error occurred while creating the discussion post. | {ex.Message}");
            }

        }
        #endregion

        #region Edit
        [HttpPut("edit")]
        public async Task<ActionResult<object>> UpadteBasicUser(EditDiscussionPostRequest request) {
            try {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                if (request.Data.Title.Length < 1) return BadRequest(new { code = "short-title"});
                if (request.Data.Content.Length < 1) return BadRequest(new { code = "short-content"});

                var user = await _context.Users.Include(u => u.Groups).Where(u => u.UserId == request.AuthorId).FirstOrDefaultAsync();
                if (user == null) return NotFound(new { code = "user-not-found" });
                var post = await _context.DiscussionPosts.Include(d => d.DiscussionPostDetails).Where(d => d.DiscussionPostId == request.PostId).FirstOrDefaultAsync();
                if (post == null) return NotFound(new { code = "post-not-found"});

                if (post.UserId != user.UserId) return BadRequest(new { code = "not-author"});

                post.Title = request.Data.Title;
                post.DiscussionPostDetails.Content = request.Data.Content;
                await _context.SaveChangesAsync();

                return Ok(new { code = "success" });
            }
            catch (Exception ex) {
                return StatusCode(500, $"An error occurred while creating the discussion post. | {ex.Message}");
            }
        }
        #endregion

        #region AddComment
        [HttpPost("add-comment")]
        public async Task<IActionResult> AddComment(CommentRequest request) {
            try {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                var user = await _context.Users.Include(u => u.Groups).Where(u => u.UserId == request.AuthorId).FirstOrDefaultAsync();
                if (user == null) return NotFound(new { code = "user-not-found" });
                var post = await _context.DiscussionPosts
                    .Include(dp => dp.Group)
                    .Include(dp => dp.ArtistProfile)
                    .Include(dp => dp.DiscussionPostDetails)
                    .Where(dp => dp.DiscussionPostId == request.DiscussionPostId)
                    .FirstOrDefaultAsync();
                if (post == null) return NotFound(new { code = "post-not-found" });
                if (post.DiscussionPostDetails == null) return NotFound(new { code = "details-not-found" });
                if (request.Content == null || request.Content == string.Empty) return BadRequest(new { code = "empty-content" });

                var group = await _context.Groups.Include(g => g.Users).Where(g => g == post.Group).FirstOrDefaultAsync();
                if (post.TopicType == DiscussionPost.TopicTypes.Group && (!group.Users.Contains(user) || !user.Groups.Contains(group)))
                    return BadRequest(new { code = "user-group-error" });

                var com = new Comment {
                    CommentId = Guid.NewGuid(),
                    Content = request.Content,
                    CreationTime = DateTime.UtcNow,
                    User = user,
                    UserId = user.UserId,
                    DiscussionPostDetails = post.DiscussionPostDetails,
                    DiscussionPostDetailsId = post.DiscussionPostDetails.DiscussionPostDetailsId
                };

                _context.Comments.Add(com);
                await _context.SaveChangesAsync();

                return Ok(new {
                    code = "success",
                    createdComment = new {
                        author = new {
                            id = com.UserId,
                            name = com.User.UserName,
                            avatar = !com.User.Avatar.IsNullOrEmpty() ? (com.User.Avatar) : (string.Empty),
                            active = (post.TopicType == DiscussionPost.TopicTypes.Artist) ? (true) : (post.Group.Users.Contains(user) ? (true) : (false))
                        },
                        creationTime = com.CreationTime,
                        content = com.Content
                    }
                });
            }
            catch (Exception ex) {
                return StatusCode(500, $"An error occurred while creating the discussion post. | {ex.Message}");
            }
        }
        #endregion

    }
}
