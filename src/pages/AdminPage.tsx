import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Ошибка при загрузке продуктов:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении продукта:', error);
    }
  };

  return (
    <div>
      <h1>Панель администратора</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price} грн</td>
              <td>
                <button onClick={() => handleDelete(product.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;