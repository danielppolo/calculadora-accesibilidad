import React from 'react';

function Button({
  children,
}) {
  return <button type="button" className="bg-black text-white w-full h-10 text-lg flex items-center justify-center">{children}</button>;
}

export default Button;
