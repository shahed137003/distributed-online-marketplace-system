using System;
using System.Collections.Generic;

public class OrderDto
{
    public int OrderId { get; set; }  // Unique identifier for the order
    public int UserId { get; set; }  // The ID of the user who placed the order
    public string PaymentMethod { get; set; }  // Payment method (e.g., "Cash", "Credit Card")
    public string Status { get; set; }  // Order status (e.g., "Pending", "Completed")
    public decimal TotalAmount { get; set; }  // Total amount for the order
    public string ShippingAddress { get; set; }  // Shipping address for the order
    public DateTime OrderDate { get; set; }  // Date when the order was placed
    public List<OrderDetailDto> OrderDetails { get; set; }  // List of order details for the order
    public string? CouponCode { get; set; }  // Optional coupon code if used
}
