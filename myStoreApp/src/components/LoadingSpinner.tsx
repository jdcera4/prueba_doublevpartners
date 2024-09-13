import React from 'react';
import './LoadingSpinner.css'; // Asegúrate de tener un archivo CSS para el spinner

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
