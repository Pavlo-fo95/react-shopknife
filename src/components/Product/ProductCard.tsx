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
  console.log(`Путь изображения: http://127.0.0.1:8000${product.image_url}`);
  return (
    <div className="product-card">
      <img src={`http://127.0.0.1:8000${product.image_url}`} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <strong>Цена: {product.price} грн</strong>
    </div>
  );
};

export default ProductCard;