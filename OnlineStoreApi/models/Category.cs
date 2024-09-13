namespace OnlineStoreApi.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

        // Relación con Product
        public ICollection<Product> Products { get; set; }
    }
}
