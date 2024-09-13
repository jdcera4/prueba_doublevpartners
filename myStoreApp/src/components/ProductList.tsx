import React, { useEffect, useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonButton,
  IonImg,
  IonInput,
  IonLabel,
  IonItem,
} from '@ionic/react';
import { getProducts, saveFavoriteProduct, getFavoriteProducts, removeFavoriteProduct, Product } from '../services/apiService';
import './ProductList.css';
import LoadingSpinner from './LoadingSpinner';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchName, setSearchName] = useState('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data); // Inicialmente muestra todos los productos
        setFavorites(getFavoriteProducts());
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Cambia el estado de carga a false después de completar la solicitud
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filtrar productos cuando cambien los filtros
    const filtered = products.filter(product => {
      const nameMatch = product.title.toLowerCase().includes(searchName.toLowerCase());
      const minPriceMatch = minPrice !== '' ? product.price >= minPrice : true;
      const maxPriceMatch = maxPrice !== '' ? product.price <= maxPrice : true;
      return nameMatch && minPriceMatch && maxPriceMatch;
    });
    setFilteredProducts(filtered);
  }, [searchName, minPrice, maxPrice, products]);

  const handleAddFavorite = (product: Product) => {
    saveFavoriteProduct(product);
    setFavorites(getFavoriteProducts());
  };

  const handleRemoveFavorite = (productId: number) => {
    removeFavoriteProduct(productId);
    setFavorites(getFavoriteProducts());
  };

  if (loading) {
    return <LoadingSpinner />; // Muestra el spinner de carga mientras los datos se están recuperando
  }

  return (
    <div className="product-list-container">
      <div className="filter-container">
        <IonItem className="filter-item">
          <IonLabel position="floating">Search by Name</IonLabel>
          <IonInput value={searchName} onIonChange={(e: { detail: { value: React.SetStateAction<string>; }; }) => setSearchName(e.detail.value!)} />
        </IonItem>
        <IonItem className="filter-item">
          <IonLabel position="floating">Min Price</IonLabel>
          <IonInput type="number" value={minPrice} onIonChange={(e: { detail: { value: any; }; }) => setMinPrice(Number(e.detail.value) || '')} />
        </IonItem>
        <IonItem className="filter-item">
          <IonLabel position="floating">Max Price</IonLabel>
          <IonInput type="number" value={maxPrice} onIonChange={(e: { detail: { value: any; }; }) => setMaxPrice(Number(e.detail.value) || '')} />
        </IonItem>
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => {
            const categoryImageUrl = product.category.image;
            return (
              <IonCard key={product.id} className="product-card">
                {categoryImageUrl && <IonImg className="product-img" src={categoryImageUrl} alt={product.title} />}
                <IonCardContent className="product-info">
                  <div className="product-title">{product.title}</div>
                  <div className="product-description">{product.description}</div>
                  <div className="product-price">${product.price}</div>
                  <div className="product-buttons">
                    {favorites.some(fav => fav.id === product.id) ? (
                      <IonButton color="danger" onClick={() => handleRemoveFavorite(product.id)}>
                        Remove from Favorites
                      </IonButton>
                    ) : (
                      <IonButton color="primary" onClick={() => handleAddFavorite(product)}>
                        Add to Favorites
                      </IonButton>
                    )}
                  </div>
                </IonCardContent>
              </IonCard>
            );
          })
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
