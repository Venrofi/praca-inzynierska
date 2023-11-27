using Backend.Core.Entities;
using Backend.Data.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ActionController :ControllerBase{

        private readonly ApplicationDbContext _context;

        public ActionController(ApplicationDbContext context) {
            _context = context;
        }
        //Warto dodać obsługę błędów (np. wrong id, can’t follow/join/attend) i zwrócenie odpowiedniego kodu błędu w celu prezentacji błędu w UI.

        #region Follow
        [HttpPost("follow")]
        public async Task<IActionResult> FollowArtist(Guid artistId, Guid userId) {
            var artist = await _context.ArtistsProfiles.Include(a => a.Followers).Where(a => a.ArtistProfileId == artistId).FirstOrDefaultAsync();
            var user = await _context.Users.Include(u => u.FollowedArtists).Where(u => u.UserId == userId).FirstOrDefaultAsync();

            if (user == null)
                return BadRequest(new { code = "wrong-id" });
            if (artist == null)
                return BadRequest(new { code = "wrong-id" });
            //check if included lists are nulles
            artist.Followers ??= new List<User>();
            user.FollowedArtists ??= new List<ArtistProfile>();
            //check if group already has user in users and vice versa
            if (artist.Followers.Contains(user) || user.FollowedArtists.Contains(artist))
                return BadRequest(new { code = "cant-follow" });

            artist.Followers.Add(user);
            //await _context.SaveChangesAsync();

            user.FollowedArtists.Add(artist);
            await _context.SaveChangesAsync();

            return Ok(new { code = "success" });
        }
        #endregion

        #region Join
        [HttpPost("join")]
        public async Task<IActionResult> JoinGroup(Guid groupId, Guid userId) {
            var group = await _context.Groups.Include(g => g.Users).Where(g => g.GroupId == groupId).FirstOrDefaultAsync();
            var user = await _context.Users.Include(u => u.Groups).Where(u => u.UserId == userId).FirstOrDefaultAsync();

            if (user == null)
                return BadRequest(new { code = "wrong-id" });
            if (group == null)
                return BadRequest(new { code = "wrong-id" });
            //check if included lists are nulles
            group.Users ??= new List<User>();
            user.Groups ??= new List<Group>();
            if (group.Users.Contains(user) || user.Groups.Contains(group))
                return BadRequest(new { code = "cant-join" });

            group.Users.Add(user);
            //await _context.SaveChangesAsync();

            user.Groups.Add(group);
            await _context.SaveChangesAsync();
            return Ok(new { code = "success" });
        }
        #endregion

        #region Attend
        [HttpPost("attend")]
        public async Task<IActionResult> AttendEvent(Guid eventId, Guid userId) {
            var eventt = await _context.Events.Include(e => e.Participants).Where(e => e.EventId == eventId).FirstOrDefaultAsync();
            var user = await _context.Users.Include(u => u.ParticipatedEvents).Where(u => u.UserId == userId).FirstOrDefaultAsync();

            if (user == null)
                return BadRequest(new { code = "wrong-id" });
            if (eventt == null)
                return BadRequest(new { code = "wrong-id" });
            //check if included lists are nulles
            eventt.Participants ??= new List<User>();
            user.ParticipatedEvents ??= new List<Event>();
            //check if event already has user in participants and vice versa
            if (eventt.Participants.Contains(user) || user.ParticipatedEvents.Contains(eventt))
                return BadRequest(new { code = "cant-attend" });

            eventt.Participants.Add(user);
            //await _context.SaveChangesAsync();

            user.ParticipatedEvents.Add(eventt);
            await _context.SaveChangesAsync();
            return Ok(new { code = "success" });
        }
        #endregion

        #region Unfollow
        [HttpPost("unfollow")]
        public async Task<IActionResult> UnfollowArtist(Guid artistId, Guid userId) {
            var artist = await _context.ArtistsProfiles.Include(a => a.Followers).Where(a => a.ArtistProfileId == artistId).FirstOrDefaultAsync();
            var user = await _context.Users.Include(u => u.FollowedArtists).Where(u => u.UserId == userId).FirstOrDefaultAsync();

            if (user == null)
                return BadRequest(new { code = "wrong-id" });
            if (artist == null)
                return BadRequest(new { code = "wrong-id" });

            if (!artist.Followers.Contains(user) || !user.FollowedArtists.Contains(artist))
                return BadRequest(new { code = "cant-unfollow" });

            artist.Followers.Remove(user);
            user.FollowedArtists.Remove(artist);
            await _context.SaveChangesAsync();

            return Ok(new { code = "success" });
        }
        #endregion

        #region Unjoin
        [HttpPost("unjoin")]
        public async Task<IActionResult> UnjoinGroup(Guid groupId, Guid userId) {
            return Ok();
        }
        #endregion

        #region Unattend
        [HttpPost("unattend")]
        public async Task<IActionResult> UnattendEvent(Guid eventId, Guid userId) {
            return Ok();
        }
        #endregion
    }
}
