import React from 'react';

type CardProps = React.HTMLAttributes<HTMLDivElement>;

function Card({ children, className, ...otherProps }: CardProps) {
  return (
    <div
      className={`bg-white border border-gray-300 rounded-md shadow-sm ${className}`}
      {...otherProps}
    >
      {children}
    </div>
  );
}

export default Card;
