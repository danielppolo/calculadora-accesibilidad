import React from 'react';

function Card({ children, className, ...otherProps }) {
  return (
    <div className={`bg-white border border-gray-300 rounded-md shadow-sm ${className}`} {...otherProps}>
      {children}
    </div>
  );
}

export default Card;
