﻿using Backend.Core.Entities;
using Backend.Core.Requests;
using Backend.Data.Context;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : ControllerBase {

        private readonly ApplicationDbContext _context;
        private readonly ProfanitySearchAlgorithm _psa;

        public GroupController(ApplicationDbContext context) {
            _context = context;
            _psa = new ProfanitySearchAlgorithm(_context);
        }

        #region Create
        [HttpPost("create")]
        public async Task<IActionResult> Create(CreateGroupRequest request) {
            try {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                var user = await _context.Users.Include(u => u.Groups).Where(u => u.UserId == request.UserId).FirstOrDefaultAsync();
                if (user == null) return NotFound(new { code = "user-not-found" });

                var userType = await _context.UserTypes.Where(ut => ut.Description == "USER").FirstOrDefaultAsync();
                if (userType == null) return BadRequest(new { code = "user-type-error"});

                if (request.Name == string.Empty) return BadRequest(new { code = "empty-name"});

                var group = new Group() {
                    GroupId = Guid.NewGuid(),
                    Name = request.Name,
                    Open = true,
                    Description = request.Description,
                    Image = request.Image,
                    Users = new List<User>(),
                    DiscussionPosts = new List<DiscussionPost>(),
                    OrganizedEvents = new List<Event>(),
                    OwnerId = user.UserType == userType ? (user.UserId):(null),
                    Owner = user.UserType == userType ? (user) : (null)
                };
                group.Users.Add(user);
                _context.Groups.Add(group);
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
