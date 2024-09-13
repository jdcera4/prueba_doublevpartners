namespace OnlineStoreApi.Models
{
    public class WishlistItem
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public string UserId { get; set; } // o el tipo adecuado para el ID del usuario

        // Constructor para inicialización
        public WishlistItem() { }

        public WishlistItem(int productId, string userId)
        {
            ProductId = productId;
            UserId = userId;
        }
    }
}
