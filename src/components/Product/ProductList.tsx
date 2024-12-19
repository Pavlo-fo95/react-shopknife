import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string; 
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Запрос к API
        const response = await axios.get<Product[]>('http://127.0.0.1:8000/products/');
        setProducts(response.data); // Сохраняем массив продуктов
      } catch (error) {
        setError("Ошибка при загрузке продуктов");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Получение продуктов для текущей страницы
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Продукты не найдены</p>
        )}
      </div>

      {/* Пагинация */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          style={{ margin: '0 5px', padding: '5px 10px' }}
        >
          Назад
        </button>
        {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
            style={{
              margin: '0 5px',
              padding: '5px 10px',
              backgroundColor: page === currentPage ? '#007bff' : '#fff',
              color: page === currentPage ? '#fff' : '#000',
              border: '1px solid #ccc',
              cursor: 'pointer',
            }}
          >
            {page}
          </button>
        ))}
        <button
          disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
          onClick={() => handlePageChange(currentPage + 1)}
          style={{ margin: '0 5px', padding: '5px 10px' }}
        >
          Вперед
        </button>
      </div>
    </div>
  );
};

export default ProductList;