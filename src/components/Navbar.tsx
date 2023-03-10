import React, { useState } from 'react';

function NavBar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div className="bg-blue h-16 px-4 text-white flex items-center justify-between relative md:px-16">
        <a href="https://ideamos.mx/">
          <img className="h-6" src="/logo-ideamos-blanco.png" alt="Logotipo" />
        </a>
        <div id="desktop-menu" className="space-x-8 text-2xl hidden md:block">
          <a
            className="hover:opacity-70 duration-100"
            href="https://ideamos.mx/el-programa"
          >
            El programa
          </a>
          <a
            className="hover:opacity-70 duration-100"
            href="https://ideamos.mx/indice-de-pilotos"
          >
            Los pilotos
          </a>
          <a
            className="hover:opacity-70 duration-100"
            href="https://ideamos.mx/noticias"
          >
            Noticias
          </a>
          <a
            className="hover:opacity-70 duration-100"
            href="https://ideamos.mx/convocatoria"
          >
            Convocatoria
          </a>
        </div>
        <button
          type="button"
          className="material-symbols-outlined text-white md:hidden  leading-normal"
          onClick={() => setExpanded(!expanded)}
        >
          menu
        </button>
        <div
          id="mobile-menu"
          className={`absolute top-16 left-0 right-0 bg-blue opacity-90 duration-300 overflow-hidden ${
            expanded ? 'h-64' : 'h-0'
          }`}
        >
          <a
            className="duration-100 flex items-center text-2xl p-2 font-bold h-16 border-b border-white"
            href="https://ideamos.mx/el-programa"
          >
            El programa
          </a>
          <a
            className="duration-100 flex items-center text-2xl p-2 font-bold h-16 border-b border-white"
            href="https://ideamos.mx/indice-de-pilotos"
          >
            Los pilotos
          </a>
          <a
            className="duration-100 flex items-center text-2xl p-2 font-bold h-16 border-b border-white"
            href="https://ideamos.mx/noticias"
          >
            Noticias
          </a>
          <a
            className="duration-100 flex items-center text-2xl p-2 font-bold h-16"
            href="https://ideamos.mx/convocatoria"
          >
            Convocatoria
          </a>
        </div>
      </div>
      <div className="bg-blue h-32 px-4 text-white flex items-center justify-between md:px-16 md:h-16">
        <div className="md:items-center md:space-x-16 md:flex">
          <div className="space-x-8 flex items-center h-12">
            <p className="font-bold text-xl">Una iniciativa de:</p>
            <a
              target="_blank"
              href="https://mexico.itdp.org"
              rel="noopener noreferrer"
            >
              <img className="h-8" src="/itdp.png" alt="ITDP Logo" />
            </a>
          </div>
          <div className="space-x-8 flex items-center h-12">
            <p className="font-bold text-xl">Con apoyo de:</p>
            <a
              target="_blank"
              href="https://www.iadb.org/es"
              rel="noopener noreferrer"
            >
              <img className="h-8" src="/bid.png" alt="BID Logo" />
            </a>
            <a
              target="_blank"
              href="https://bidlab.org/es"
              rel="noopener noreferrer"
            >
              <img className="h-8" src="/bid-lab.png" alt="BID LAB Logo" />
            </a>
          </div>
        </div>
        <div className="hidden md:block">
          <a href="https://github.com/ITDPmx/calculadora-accesibilidad">
            <img className="h-6" src="/github.png" alt="Github Logo" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
