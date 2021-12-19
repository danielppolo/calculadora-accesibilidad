import React, { memo } from 'react';
import Card from './Card';
import CitiesChart from './CitiesChart';
import Subtitle from './Subtitle';

function CitiesOverview({
  cities = []
}) {
  console.log(cities)
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:bottom-auto md:top-0 md:right-0 md:left-auto md:w-96 md:max-w-xl md:max-h-screen">
      <Card className="py-4 px-6 m-4 overflow-y-auto">
      <Subtitle>Calculadora accesibilidad</Subtitle>
      <p className='text-sm'>
      La accesibilidad a oportunidades estima el acceso a empleos, hospitales, escuelas y puntos turísticos en diferentes modos de transporte sustentable para cada zona de una ciudad. Este proyecto tiene como objetivo mostrar las oportunidades en un radio de 150 kilómetros de Cancún a través de una herramienta interactiva.
      </p>
      <div className='mb-4'></div>
      <CitiesChart
        data={{
          labels: cities.map(city => city.name),
          datasets: [{
            // label,
            data: cities.map(city => city.chart),
            backgroundColor: '#7054BC',
          }]
        }}
      />    
      </Card>
    </div>
  );
}

export default memo(CitiesOverview);