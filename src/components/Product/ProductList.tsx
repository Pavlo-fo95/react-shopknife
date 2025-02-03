import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

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
  const itemsPerPage = 3; // Совпадает с параметром page_size в backend

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/products?page=${currentPage}`
        );
        setProducts(response.data); // Используем данные с бэкенда
      } catch (err) {
        setError('Ошибка при загрузке продуктов');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]); // Перезагружаем данные при изменении текущей страницы

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
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Продукты не найдены</p>
        )}
      </div>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Назад
        </button>
        <span>Страница: {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={products.length < itemsPerPage}
        >
          Вперед
        </button>
      </div>
    </div>
  );
};

export default ProductList;