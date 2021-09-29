import React from 'react';

const Swatch = ({
  color,
}) => (
  <div className="h-4 w-4" style={{backgroundColor: color}}></div>
)


function DefaultLegend() {
  return (
    <div className="bg-white rounded-md overflow-y-auto fixed top-4 left-4 right-4 h-1/3 z-50 shadow-lg p-4 md:top-auto md:top-8 md:right-8 md:left-auto md:w-52 md:h-auto">
      <h3 className="text-xs font-semibold pb-2">Simbología</h3>
      <div className="flex items-center">
        <Swatch color='#00534C' />
        <span className="ml-2 text-xs">Tren maya</span>
      </div>
      <div className="flex items-center">
        <Swatch color='#00534C' />
        <span className="ml-2 text-xs">Punto de interés</span>
      </div>
      <div className="flex items-center">
        <div className="bg-white border-2 border-gray-900 rounded-md h-3 w-3"></div>
        <span className="ml-2 text-xs">Estaciones</span>
      </div>
      <div className="flex items-center">
        <Swatch color='#00534C' />
        <span className="ml-2 text-xs">Comunidades</span>
      </div>
    </div>
  );
}

DefaultLegend.propTypes = {

};

export default DefaultLegend;
