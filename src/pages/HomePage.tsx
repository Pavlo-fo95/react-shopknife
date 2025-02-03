import React from 'react';
import ProductList from '../components/Product/ProductList';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h1>Добро пожаловать в магазин ножей</h1>
      <ProductList />
    </div>
  );
};

export default HomePage;