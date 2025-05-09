//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using E_CommerceWebsite.BLL.Dtos;
//using E_CommerceWebsite.DAL.Data.Models;
//using E_CommerceWebsite.DAL.Repository;

//public class OrderManager : IOrderManager
//{
//    private readonly IOrderRepository _orderRepository;
//    private readonly ShoppingCart _shoppingCart; // Assuming you have this dependency

//    public OrderManager(IOrderRepository orderRepository, ShoppingCart shoppingCart)
//    {
//        _orderRepository = orderRepository;
//        _shoppingCart = shoppingCart; // Store it for future use
//    }

//    // Create Cash Order
//    public async Task CreateCashOrderAsync(OrderCreateDto orderCreateDto)
//    {
//        var newOrder = new Order
//        {
//            UserId = orderCreateDto.UserId,
//            OrderDetails = orderCreateDto.OrderDetails.Select(od => new OrderDetail
//            {
//                ProductId = od.ProductId,
//                Amount = od.Amount,
//                Price = od.Price
//            }).ToList(),
//            OrderTotal = orderCreateDto.TotalAmount,  // Order total from the DTO
//            PaymentMethod = "Cash",  // Setting the payment method to Cash
//            OrderPlaced = DateTime.Now,
//            Status = OrderStatus.Pending,  // Initial status is "Pending"
//        };

//        await _orderRepository.InsertAsync(newOrder);
//        await _orderRepository.SaveChangesAsync();  // Ensure changes are saved
//    }

//    // Get All Orders
//    public async Task<IEnumerable<OrderDto>> GetAllOrdersAsync()
//    {
//        var orders = await _orderRepository.GetAllOrdersAsync(); // Retrieve all orders
//        return orders.Select(order => new OrderDto
//        {
//            OrderId = order.OrderId,
//            UserId = order.UserId,
//            PaymentMethod = order.PaymentMethod,
//            Status = order.Status.ToString(),  // Convert Status enum to string
//            TotalAmount = order.OrderTotal,
//            ShippingAddress = $"{order.AddressLine1} {order.AddressLine2}",  // Combine address lines
//            OrderDate = order.OrderPlaced,  // Order placed date
//            OrderDetails = order.OrderDetails.Select(od => new OrderDetailDto
//            {
//                ProductId = od.ProductId,
//                Amount = od.Amount,
//                Price = od.Price,
//                ProductDescription = od.Product.ProductDescription
//            }).ToList(),
//            CouponCode = order.CouponCode // Assuming CouponCode exists in Order model
//        }).ToList();
//    }

//    // Get Orders for a Specific User
//    public async Task<IEnumerable<OrderDto>> GetUserOrdersAsync(int userId)
//    {
//        var orders = await _orderRepository.GetUserOrdersAsync(userId); // Get orders by user ID
//        return orders.Select(order => new OrderDto
//        {
//            OrderId = order.OrderId,
//            UserId = order.UserId,
//            PaymentMethod = order.PaymentMethod,
//            Status = order.Status.ToString(),  // Convert Status enum to string
//            TotalAmount = order.OrderTotal,
//            ShippingAddress = $"{order.AddressLine1} {order.AddressLine2}",  // Combine address lines
//            OrderDate = order.OrderPlaced,  // Order placed date
//            OrderDetails = order.OrderDetails.Select(od => new OrderDetailDto
//            {
//                ProductId = od.ProductId,
//                Amount = od.Amount,
//                Price = od.Price,
//                ProductDescription = od.Product.ProductDescription
//            }).ToList(),
//            CouponCode = order.CouponCode
//        }).ToList();
//    }

//    // Complete Checkout Session
//    public async Task CheckoutSessionAsync(int orderId)
//    {
//        var orders = await _orderRepository.GetAllOrdersAsync();  // Get all orders
//        var order = orders.FirstOrDefault(o => o.OrderId == orderId);  // Find the order by ID

//        if (order != null)
//        {
//            order.Status = OrderStatus.Completed;  // Change status to "Completed"
//            await _orderRepository.SaveChangesAsync();  // Save changes to the database
//        }
//    }
//}
