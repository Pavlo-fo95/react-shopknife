import React from 'react';
import './AdminPanel.css';

const AdminPanel: React.FC = () => {
  return (
    <div className="admin-panel">
      <h1 className="admin-panel__title">Панель администратора</h1>
      <p className="admin-panel__description">Здесь можно управлять товарами</p>
    </div>
  );
};

export default AdminPanel;