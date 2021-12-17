import React from 'react';

function Button({
  children,
  bgColor,
  className,
  variant = 'solid',
  disabled,
  ...otherProps
}) {
  return (
    <button
      type="button"
      className={`${variant === 'outlined' ? 'bg-white' : (bgColor || 'bg-black')} ${bgColor ? 'text-black' : 'text-white'} ${disabled && 'opacity-50'}  w-full h-10 text-lg flex items-center justify-center ${className}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;
