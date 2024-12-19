import React from 'react';
import ProductList from '../components/Product/ProductList';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Добро пожаловать в магазин ножей</h1>
      <ProductList />
    </div>
  );
};

export default HomePage;