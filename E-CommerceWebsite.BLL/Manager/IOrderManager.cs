//using System;
//using System.Collections.Generic;
//using System.Threading.Tasks;

//public interface IOrderManager
//{
//    // Creates a cash order with the provided details
//    Task CreateCashOrderAsync(OrderCreateDto orderCreateDto);

//    // Retrieves all orders with optional filters like pagination
//    Task<IEnumerable<OrderDto>> GetAllOrdersAsync();

//    // Retrieves orders belonging to a specific user by their user ID
//    Task<IEnumerable<OrderDto>> GetUserOrdersAsync(int userId);

//    // Processes the checkout for an order (marks as completed, etc.)
//    Task CheckoutSessionAsync(int orderId);
//}
