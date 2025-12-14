using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Orders.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrdersController : ControllerBase
{
    private static readonly List<Order> Orders = new()
    {
        new Order(1, 1, "Product A", 2, 29.99m, DateTime.UtcNow.AddDays(-1)),
        new Order(2, 2, "Product B", 1, 49.99m, DateTime.UtcNow.AddHours(-2))
    };

    [HttpGet]
    public ActionResult<IEnumerable<Order>> GetOrders()
    {
        return Ok(Orders);
    }

    [HttpGet("{id}")]
    public ActionResult<Order> GetOrder(int id)
    {
        var order = Orders.FirstOrDefault(o => o.Id == id);
        return order == null ? NotFound() : Ok(order);
    }

    [HttpGet("client/{clientId}")]
    public ActionResult<IEnumerable<Order>> GetOrdersByClient(int clientId)
    {
        var orders = Orders.Where(o => o.ClientId == clientId);
        return Ok(orders);
    }

    [HttpPost]
    public ActionResult<Order> CreateOrder([FromBody] CreateOrderRequest request)
    {
        var order = new Order(
            Orders.Count + 1,
            request.ClientId,
            request.ProductName,
            request.Quantity,
            request.Price,
            DateTime.UtcNow);
        
        Orders.Add(order);
        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateOrder(int id, [FromBody] UpdateOrderRequest request)
    {
        var order = Orders.FirstOrDefault(o => o.Id == id);
        if (order == null) return NotFound();

        var index = Orders.IndexOf(order);
        Orders[index] = order with 
        { 
            ProductName = request.ProductName,
            Quantity = request.Quantity,
            Price = request.Price
        };
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteOrder(int id)
    {
        var order = Orders.FirstOrDefault(o => o.Id == id);
        if (order == null) return NotFound();

        Orders.Remove(order);
        return NoContent();
    }
}

public record Order(int Id, int ClientId, string ProductName, int Quantity, decimal Price, DateTime OrderDate);
public record CreateOrderRequest(int ClientId, string ProductName, int Quantity, decimal Price);
public record UpdateOrderRequest(string ProductName, int Quantity, decimal Price);