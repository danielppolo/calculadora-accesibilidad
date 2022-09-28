import React from 'react';
import Card from './Card';

function ControlsCard() {
  return (
    <Card className="p-6 fixed bottom-0 left-0 right-0 shadow-xl z-30 md:bottom-0 md:top-4 md:right-4 md:left-auto md:w-1/3 md:max-w-xl overflow-y-auto">
      <h1 className="text-3xl font-bold mb-4 text-black">
        Calculadora
        {' '}
        <span className="font-medium">de accesibilidad de oportunidades</span>
      </h1>
      <p className="text-sm mb-6">La accesibilidad a oportunidades estima el acceso a empleos, hospitales, escuelas y puntos turísticos en diferentes modos de transporte sustentable para cada zona de una ciudad. Este proyecto tiene como objetivo mostrar las oportunidades en un radio de 150 kilómetros de Cancún a través de una herramienta interactiva.</p>
    </Card>
  );
}

export default ControlsCard;
