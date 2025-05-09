using System;
using System.Collections.Generic;

public class OrderCreateDto
{
    public int UserId { get; set; }  // ID of the user placing the order
    public List<OrderDetailDto> OrderDetails { get; set; }  // List of order details (products and their quantities)
    public decimal TotalAmount { get; set; }  // Total price of the order
    public string PaymentMethod { get; set; }  // Payment method (e.g., "Cash", "Credit Card")
    public string ShippingAddress { get; set; }  // Shipping address for the order
    public string? OrderNote { get; set; }  // Optional note for the order (e.g., special instructions)
    public DateTime OrderDate { get; set; }
}
