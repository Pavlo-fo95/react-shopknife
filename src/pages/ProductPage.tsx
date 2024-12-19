import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [product, setProduct] = useState<Product | null>(null); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true); 
        const response = await axios.get<Product>(`http://127.0.0.1:8000/products/${id}`);
        setProduct(response.data); 
      } catch (error) {
        setError('Ошибка при загрузке деталей продукта');
        console.error('Ошибка при загрузке деталей продукта:', error);
      } finally {
        setLoading(false); 
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Продукт не найден</p>;
  }

  return (
    <div>
      <h1>Детальная информация о продукте</h1>
      {product.image_url && (
        <img
          src={product.image_url}
          alt={product.name}
          style={{ width: '100%', height: '400px', objectFit: 'cover' }}
        />
      )}
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Цена: {product.price} грн</p>
    </div>
  );
};

export default ProductPage;