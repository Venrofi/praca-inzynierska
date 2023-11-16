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
        [HttpGet("basic-user-information")]
        public async Task<ActionResult<object>> GetBasicUser(Guid id) {
            //todo
            //id, username, email, groups, role, posts, avatar
            if (_context.Users == null) {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            var resUser = _context.Users.Include(u => u.Groups).Include(u => u.DiscussionPosts).Include(u=>u.UserType).Where(u => u == user).FirstOrDefault();

            if (user == null) {
                return NotFound();
            }

            var res = new { 
                Id = resUser.UserId,
                Name = resUser.UserName,
                Avatar = resUser.Avatar,
                Bio = "", // TODO: Add Bio field!
                Email = resUser.Email,
                Posts = resUser.DiscussionPosts.Select(dp=>new { dp.DiscussionPostId, dp.Title}),
                JoinedGroups = resUser.Groups.Select(g=>new {g.GroupId, g.Name }),
                AttendedEvents = new List<object>(), // TODO: SELECT AttenededEvents 
                FollowedArtists = new List<object>(), // TODO: SELECT FollowedArtists
                Role = resUser.UserType.Description,
            };


            return res;
        }
    }
}
