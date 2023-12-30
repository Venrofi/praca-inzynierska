using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Core.Entities;
using Backend.Data.Context;
using Microsoft.IdentityModel.Tokens;
using Backend.Core.Requests;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        #region Get

        [HttpGet("basic-user")]
        public async Task<ActionResult<object>> GetBasicUser(Guid id) {
            if (_context.Users == null) {
                return NotFound();
            }
            var resUser = await _context.Users.Include(u => u.Groups).Include(u => u.DiscussionPosts).Include(u => u.UserType).Include(u => u.ParticipatedEvents).Include(u => u.FollowedArtists).Where(u => u.UserId == id).FirstOrDefaultAsync();

            if (resUser == null) {
                return NotFound();
            }

            var res = new {
                Id = resUser.UserId,
                Name = resUser.UserName,
                Avatar = !resUser.Avatar.IsNullOrEmpty() ? (resUser.Avatar) : (""),
                Bio = resUser.Bio,
                Email = resUser.Email,
                Posts = resUser.DiscussionPosts.Select(dp => new { id = dp.DiscussionPostId, name = dp.Title }),
                JoinedGroups = resUser.Groups.Select(g => new { id = g.GroupId, name = g.Name }),
                AttendedEvents = resUser.ParticipatedEvents.Select(pe => new { id = pe.EventId, name = pe.Title }),
                FollowedArtists = resUser.FollowedArtists.Select(fa => new { id = fa.ArtistProfileId, name = fa.Name }),
                Role = resUser.UserType.Description,
                AccountDays = Math.Floor((resUser.VerificationTime.HasValue) ? ((DateTime.UtcNow - resUser.VerificationTime.Value) > TimeSpan.Zero ? ((DateTime.UtcNow - resUser.VerificationTime.Value)).TotalDays : 0) : 0)
            };


            return res;
        }

        #endregion

        #region Update

        [HttpPut("update-user")]
        public async Task<ActionResult<object>> UpadteBasicUser(UpdateUserRequest request) {

            try {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                if (_context.Users == null) {
                    return NotFound();
                }

                var resUser = await _context.Users.Include(u => u.Groups).Include(u => u.DiscussionPosts).Include(u => u.UserType).Include(u => u.ParticipatedEvents).Include(u => u.FollowedArtists).Where(u => u.UserId == request.MemberId).FirstOrDefaultAsync();
                if (resUser == null) return NotFound();


                resUser.Bio = request.Data.Bio;
                await _context.SaveChangesAsync();

                return await GetBasicUser(resUser.UserId);

            }
            catch (Exception ex) {
                return StatusCode(500, $"An error occurred while updating the user. | {ex.Message}");
            }

        }

        #endregion

    }
}
