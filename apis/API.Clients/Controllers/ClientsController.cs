using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Clients.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ClientsController : ControllerBase
{
    private static readonly List<Client> Clients = new()
    {
        new Client(1, "John Doe", "john@example.com"),
        new Client(2, "Jane Smith", "jane@example.com")
    };

    [HttpGet]
    public ActionResult<IEnumerable<Client>> GetClients()
    {
        return Ok(Clients);
    }

    [HttpGet("{id}")]
    public ActionResult<Client> GetClient(int id)
    {
        var client = Clients.FirstOrDefault(c => c.Id == id);
        return client == null ? NotFound() : Ok(client);
    }

    [HttpPost]
    public ActionResult<Client> CreateClient([FromBody] CreateClientRequest request)
    {
        var client = new Client(Clients.Count + 1, request.Name, request.Email);
        Clients.Add(client);
        return CreatedAtAction(nameof(GetClient), new { id = client.Id }, client);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateClient(int id, [FromBody] UpdateClientRequest request)
    {
        var client = Clients.FirstOrDefault(c => c.Id == id);
        if (client == null) return NotFound();

        var index = Clients.IndexOf(client);
        Clients[index] = client with { Name = request.Name, Email = request.Email };
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteClient(int id)
    {
        var client = Clients.FirstOrDefault(c => c.Id == id);
        if (client == null) return NotFound();

        Clients.Remove(client);
        return NoContent();
    }
}

public record Client(int Id, string Name, string Email);
public record CreateClientRequest(string Name, string Email);
public record UpdateClientRequest(string Name, string Email);