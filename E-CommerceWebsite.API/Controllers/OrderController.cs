//using E_CommerceWebsite.BLL.Dtos;
//using E_CommerceWebsite.BLL.Dtos.AccountDto;
//using E_CommerceWebsite.BLL.Manager;
//using Microsoft.AspNetCore.Mvc;
//using System.Collections.Generic;
//using System.Threading.Tasks;

//namespace E_CommerceWebsite.API.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class OrderController : Controller
//    {
//        private readonly IOrderManager _orderManager;

//        // Constructor to inject IOrderManager into the controller
//        public OrderController(IOrderManager orderManager)
//        {
//            _orderManager = orderManager;
//        }

//        // Endpoint to create a new cash order
//        [HttpPost("create")]
//        public async Task<IActionResult> CreateOrder([FromBody] OrderCreateDto orderCreateDto)
//        {
//            if (orderCreateDto == null)
//            {
//                return BadRequest("Order data is required.");
//            }

//            // Handle order creation with cash payment
//            await _orderManager.CreateCashOrderAsync(orderCreateDto);
//            return Ok("Order created successfully.");
//        }

//        // Endpoint to get all orders
//        [HttpGet("all")]
//        public async Task<IActionResult> GetAllOrders()
//        {
//            var orders = await _orderManager.GetAllOrdersAsync();
//            if (orders == null)
//            {
//                return NotFound("No orders found.");
//            }

//            return Ok(orders);
//        }

//        // Endpoint to get orders for a specific user
//        [HttpGet("user/{userId}")]
//        public async Task<IActionResult> GetUserOrders(int userId)
//        {
//            var orders = await _orderManager.GetUserOrdersAsync(userId);
//            if (orders == null)
//            {
//                return NotFound($"No orders found for user {userId}.");
//            }

//            return Ok(orders);
//        }

//        // Endpoint to handle the checkout process for an order
//        [HttpPost("checkout/{orderId}")]
//        public async Task<IActionResult> CheckoutOrder(int orderId, [FromBody] CheckoutDto checkoutDto)
//        {
//            if (checkoutDto == null || checkoutDto.OrderId != orderId)
//            {
//                return BadRequest("Order data is invalid.");
//            }

//            // Handle the checkout process
//            await _orderManager.CheckoutSessionAsync(orderId);
//            return Ok("Order checkout completed successfully.");
//        }
//    }
//}
