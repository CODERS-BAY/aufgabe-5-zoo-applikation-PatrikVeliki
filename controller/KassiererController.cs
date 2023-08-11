using Microsoft.AspNetCore.Mvc;
using ZooAPI.Model;
using ZooAPI.Service;

namespace ZooAPI.Controller
{
    [ApiController]
    [Route("api/[controller]")] // Basispfad: api/kassierer
    public class KassiererController : ControllerBase
    {
        private readonly KassiererService _service;

        // KassiererService Injektion
        public KassiererController(KassiererService service)
        {
            _service = service;
        }

        // Ticketkauf: api/kassierer/buy
        [HttpPost("buy")]
        public async Task<ActionResult<Ticket>> InsertTicket(Ticket ticket)
        {
            await _service.InsertTicketAsync(ticket);
            return Ok(ticket);
        }

        // Alle Tickets: api/kassierer/gettickets
        [HttpGet("gettickets")]
        public async Task<ActionResult<List<Ticket>>> GetAllTickets()
        {
            return await _service.GetAllSoldTicketsAsync();
        }

        // Tickets nach Datum: api/kassierer/tickets/date/{date}
        [HttpGet("tickets/date/{date}")]
        public async Task<ActionResult<List<Ticket>>> GetTicketsByDate(DateTime date)
        {
            var (tickets, total) = await _service.GetTicketsByDate(date);
            return Ok(new { Tickets = tickets, Total = total });
        }
    }
}