import React, { useEffect, useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonButton,
  IonImg,
} from '@ionic/react';
import { getFavoriteProducts, removeFavoriteProduct, Product } from '../services/apiService';
import './FavoritesList.css'; // Importa el archivo CSS específico

const FavoritesList: React.FC = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    setFavorites(getFavoriteProducts());
  }, []);

  const handleRemoveFavorite = (productId: number) => {
    removeFavoriteProduct(productId);
    setFavorites(getFavoriteProducts());
  };

  return (
    <div className="favorites-list-container">
      <h1 className="favorites-list-title">Favorites List</h1>
      <div className="favorites-list">
        {favorites.length > 0 ? (
          favorites.map(product => {
            const categoryImageUrl = product.category.image; // Usar la imagen de la categoría
            return (
              <IonCard key={product.id} className="favorites-card">
                {categoryImageUrl && <IonImg className="favorites-img" src={categoryImageUrl} alt={product.title} />}
                <IonCardContent className="favorites-info">
                  <div className="favorites-title">{product.title}</div>
                  <div className="favorites-description">{product.description}</div>
                  <div className="favorites-price">${product.price}</div>
                  <div className="favorites-buttons">
                    <IonButton color="danger" onClick={() => handleRemoveFavorite(product.id)}>
                      Remove from Favorites
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            );
          })
        ) : (
          <p>No favorite products added.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesList;
