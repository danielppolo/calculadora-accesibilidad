import React from 'react';

function Card({ children, className, ...otherProps }) {
  return (
    <div className={`bg-white py-6 px-6 ${className}`} {...otherProps}>
      {children}
    </div>
  );
}

export default Card;
