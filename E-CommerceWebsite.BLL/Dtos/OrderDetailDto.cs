using System;

public class OrderDetailDto
{
    public int ProductId { get; set; }  // ID of the product being ordered
    public int Amount { get; set; }  // Quantity of the product ordered
    public decimal Price { get; set; }  // Price of the product
    public string ProductName { get; set; }  // Product name (optional)
    public string ProductDescription { get; set; }  // Product description (optional)
}
