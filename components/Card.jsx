import React from 'react';

function Card({ children, className, ...otherProps }) {
  return (
    <div className={`bg-white ${className}`} {...otherProps}>
      {children}
    </div>
  );
}

export default Card;
