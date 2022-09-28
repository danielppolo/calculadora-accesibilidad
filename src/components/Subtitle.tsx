import React from 'react';

interface SutitleProps { children: React.ReactNode }

function Subtitle({ children }: SutitleProps) {
  return <h2 className="text-3xl font-medium mb-4">{children}</h2>;
}

export default Subtitle;
