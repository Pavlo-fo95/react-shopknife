import React from 'react';

interface ProductProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
  };
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image_url} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <strong>Цена: {product.price} грн</strong>
    </div>
  );
};

export default ProductCard;