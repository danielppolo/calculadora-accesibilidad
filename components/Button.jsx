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
      className="relative w-full bg-black text-white flex items-center justify-center space-x-2 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 cursor-default focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm disabled:opacity-50"
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;
