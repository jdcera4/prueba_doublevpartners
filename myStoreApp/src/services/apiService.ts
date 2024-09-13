import axios from 'axios';

export interface Product {
  id: number;
  name: string;
  price: number;
}

// Configuración de la base URL para la API
const api = axios.create({
  baseURL: 'https://fakeapi.platzi.com/'  // URL base de la API
});

// Función para obtener todos los productos
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Función para obtener un producto por su ID
export const getProductById = async (productId: number): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
};

// Función para guardar un producto en la lista de deseados
export const saveFavoriteProduct = (product: Product): void => {
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]') as Product[];
  favorites.push(product);
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

// Función para obtener los productos deseados
export const getFavoriteProducts = (): Product[] => {
  return JSON.parse(localStorage.getItem('favorites') || '[]') as Product[];
};

// Función para eliminar un producto de la lista de deseados
export const removeFavoriteProduct = (productId: number): void => {
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]') as Product[];
  favorites = favorites.filter(product => product.id !== productId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
};
