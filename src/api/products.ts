import axios, { AxiosResponse } from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

interface ProductsResponse {
  products: Product[];
}

export const fetchProducts = async (page: number): Promise<Product[]> => {
  try {
    const response: AxiosResponse<ProductsResponse> = await axios.get(
      `http://localhost:8000/products?page=${page}`
    );
    return response.data.products;
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    throw error;
  }
};
