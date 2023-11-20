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

        // GET: api/Users/5
        [HttpGet("basic-user{id}")]
        public async Task<ActionResult<object>> GetBasicUser(Guid id) {
            //todo
            //id, username, email, groups, role, posts, avatar
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
                Avatar = resUser.Avatar,
                Bio = "", // TODO: Add Bio field!
                Email = resUser.Email,
                Posts = resUser.DiscussionPosts.Select(dp => new { id = dp.DiscussionPostId, name = dp.Title }),
                JoinedGroups = resUser.Groups.Select(g => new { id = g.GroupId, name = g.Name }),
                AttendedEvents = resUser.ParticipatedEvents.Select(pe => new { id = pe.EventId, name = pe.Title }),
                FollowedArtists = resUser.FollowedArtists.Select(fa => new { id = fa.ArtistProfileId, name = fa.Name }),
                Role = resUser.UserType.Description,
            };


            return res;
        }
    }
}
