import React, { memo } from 'react';

function CreditsCard() {
  return (
    <div className="fixed z-20 left-0 bottom-0 bg-black space-x-4 flex items-center p-2 rounded-tr-md h-8">
      <a
        href="https://mexico.itdp.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="h-5" src="/itdp.png" alt="ITDP Logo" />
      </a>
      <a href="http://ideamos.mx" target="_blank" rel="noopener noreferrer">
        <img className="h-3" src="/logo-ideamos-blanco.png" alt="Logotipo" />
      </a>
      <a
        href="https://www.iadb.org/es"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="h-5" src="/bid.png" alt="BID Logo" />
      </a>
      <a href="https://bidlab.org/es" target="_blank" rel="noopener noreferrer">
        <img className="h-5" src="/bid-lab.png" alt="BID LAB Logo" />
      </a>
    </div>
  );
}

export default memo(CreditsCard);
