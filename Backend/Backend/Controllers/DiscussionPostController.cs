using Backend.Core.Entities;
using Backend.Core.Requests;
using Backend.Data.Context;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;

namespace Backend.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class DiscussionpostController : ControllerBase {
        private readonly ApplicationDbContext _context;
        private readonly ProfanitySearchAlgorithm _psa;

        public DiscussionpostController(ApplicationDbContext context) {
            _context = context;
            _psa = new ProfanitySearchAlgorithm(_context);
        }

        #region Init
        [HttpPost("init-create-data")]
        public async Task<ActionResult<object>> Init(Guid id) {
            try {
                if (id == null) return BadRequest(new { code = "id-error"});
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
                    return BadRequest(new { code = "user-group-error"});

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

        }
}
