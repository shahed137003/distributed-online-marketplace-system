using System;
using System.Collections.Generic;

public class OrderReadDto
{
    public int OrderId { get; set; }  // Unique identifier for the order
    public int UserId { get; set; }  // The ID of the user who placed the order
    public string PaymentMethod { get; set; }  // Payment method (e.g., "Credit Card", "Cash")
    public string Status { get; set; }  // Order status (e.g., "Pending", "Shipped", "Completed")
    public decimal TotalAmount { get; set; }  // Total amount for the order
    public string ShippingAddress { get; set; }  // Shipping address for the order
    public DateTime OrderDate { get; set; }  // Date when the order was placed
    public List<string> ProductTitles { get; set; }  // List of product titles in the order
    public string? CouponCode { get; set; }  // Optional: Coupon code used for the order
}
