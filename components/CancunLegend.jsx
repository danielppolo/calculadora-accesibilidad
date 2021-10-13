import React from 'react';


function CancunLegend() {
  return (
    <div className="bg-white h-1/3 border-2 border-[#e6e6dc] p-4 md:h-auto w-full">
      <h3 className="text-xs font-semibold pb-2 uppercase">Simbología</h3>
      <div className="space-y-1">
        <div className="flex items-center">
          <div className="h-[2px] w-4 flex-shrink-0	 bg-[#ba955c]"></div>
          <span className="ml-2 text-xs">Trazo del Tren Maya</span>
        </div>

        <div className="flex items-center">
          <div className="h-[2px] w-4 flex-shrink-0	 bg-[#fdbbcd]"></div>
          <span className="ml-2 text-xs">Zona Metropolitana de Cancún</span>
        </div>

        <div className="flex items-center">
          <div className="h-[2px] w-4 flex-shrink-0	 bg-[#96968c]"></div>
          <span className="ml-2 text-xs">Red vial</span>
        </div>

        <div className="flex items-center">
          <div className="h-[2px] w-4 flex-shrink-0	 bg-[#fd6541]"></div>
          <span className="ml-2 text-xs">Propuesta de Transporte Público</span>
        </div>

        <div className="flex items-center">
          <div className="h-[2px] w-4 flex-shrink-0	 bg-[#ff5079]"></div>
          <span className="ml-2 text-xs">Propuesta de rutas ciclistas</span>
        </div>

        <div className="flex items-center">
          <div className="w-4 flex-shrink-0	 h-4 flex items-center justify-center">
            <div div className=" bg-white border-2 border-black rounded-md h-3 w-3"></div>
          </div>
          <span className="ml-2 text-xs">Estaciones del Tren Maya</span>
        </div>
        
        <div className="flex items-center">
          <div className="w-4 flex-shrink-0	 h-4 flex items-center justify-center">
            <div div className=" bg-[#8c3951] border-2 border-white rounded-md h-3 w-3"></div>
          </div>
          <span className="ml-2 text-xs">Punto de interés</span>
        </div>

        <div className="flex items-center">
          <div className="w-4 h-4 flex-shrink-0	flex items-center justify-center">
          <div className="h-3 w-3" style={{backgroundColor: '#00534C'}}></div>
          </div>
          <span className="ml-2 text-xs">Comunidad Sustentable</span>
        </div>
      </div>
    </div>
  );
}

CancunLegend.propTypes = {

};

export default CancunLegend;
