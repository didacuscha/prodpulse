import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`jp-card p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card; 