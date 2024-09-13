namespace OnlineStoreApi.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }

        // Relación con Category
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
