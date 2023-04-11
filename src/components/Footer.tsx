import React from 'react';
import LanguagePicker from './LanguagePicker';

function Footer() {
  return (
    <div className="bg-black h-16 sticky text-white items-center justify-between px-16 md:flex">
      <div className="space-x-4 flex items-center">
        <a
          href="https://mexico.itdp.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="h-5" src="/itdp.png" alt="ITDP Logo" />
        </a>
        <a href="https://ideamos.mx/">
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
      <div>
        <LanguagePicker />
      </div>
    </div>
  );
}

export default Footer;
