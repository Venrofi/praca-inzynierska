using Backend.Core.Entities;
using Backend.Data.Context;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers {
    public class ActionController :ControllerBase{

        private readonly ApplicationDbContext _context;

        public ActionController(ApplicationDbContext context) {
            _context = context;
        }

        #region Follow
        [HttpPost("follow{artist_id}&{user_id}")]
        public async Task<IActionResult> FollowArtist(Guid artistId, Guid userId) {

            return Ok($"New group was created.");
        }
        #endregion

        #region Join
        [HttpPost("join{group_id}&{user_id}")]
        public async Task<IActionResult> JoinGroup(Guid groupId, Guid userId) {

            return Ok($"New group was created.");
        }
        #endregion

        #region Attend
        [HttpPost("attend{event_id}&{user_id}")]
        public async Task<IActionResult> AttendEvent(Guid EventId, Guid userId) {

            return Ok($"New group was created.");
        }
        #endregion
    }
}
