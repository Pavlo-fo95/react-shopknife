import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();  

  
  return (
    <div>
      <h1>Детальная информация о продукте {id}</h1>
      {/* Отображение полной информации о товаре */}
    </div>
  );
};

export default ProductDetails;