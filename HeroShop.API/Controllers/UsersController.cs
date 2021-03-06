#nullable disable
using HeroShop.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HeroShop.API.Controllers
{
    [Route("api/Users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly HeroShopContext _context;

        public UsersController(HeroShopContext context)
        {
            _context = context;
        }

        //// GET: api/Users
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        //{
        //    List<User> users = await _context.Users.ToListAsync();
        //    return Ok(users);
        //}

        // GET: api/Users --- to validation
        [HttpGet("{username}/{password}")]
        public async Task<ActionResult<User>> GetUserByUsername(string username, string password)
        {

            User user = _context.Users.FirstOrDefault(e => e.Username == username);

            if (user == null)
            {
                return Ok();
            }

            if (user.Password == password)
            {
                return Ok(user);
            }

            return Ok();


        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }


        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }

    }
}
