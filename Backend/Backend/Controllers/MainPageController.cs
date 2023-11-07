using Backend.Core.Entities;
using Backend.Data.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MainPageController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        #region Init

        #endregion

        #region MainPageLists

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DiscussionPost>>> GetDiscussionsList()
        {
            if (_context.DiscossionPosts == null)
            {
                return NotFound();
            }
            return await _context.DiscossionPosts.OrderByDescending(dp => dp.CreationTime).ToListAsync();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEventsList()
        {
            if (_context.Events == null)
            {
                return NotFound();
            }
            return await _context.Events.OrderByDescending(e=>e.Date).ToListAsync();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PremiereAlbum>>> GetPremiersList()
        {
            if (_context.PremiereAlbums == null)
            {
                return NotFound();
            }
            return await _context.PremiereAlbums.OrderByDescending(dp => dp.ReleaseDate).ToListAsync();
        }

        #endregion
    }
}
