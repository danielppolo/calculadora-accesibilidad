import React, { memo } from 'react';
import LanguagePicker from './LanguagePicker';

function CreditsCard() {
  return (
    <div className="fixed z-20 left-0 bottom-0 right-0 md:right-auto bg-black space-x-10 flex items-center p-2 md:rounded-tr-md h-8">
      <div className="flex space-x-4 items-center">
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
        <a
          href="https://bidlab.org/es"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="h-5" src="/bid-lab.png" alt="BID LAB Logo" />
        </a>
      </div>
      <LanguagePicker />
    </div>
  );
}

export default memo(CreditsCard);
