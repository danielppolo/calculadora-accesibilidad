import React from 'react';


function CancunLegend() {
  return (
    <div className="bg-white h-1/3 shadow-lg p-4 md:h-auto w-full">
      <h3 className="text-xs font-semibold pb-2 uppercase">Simbología</h3>
      <div className="space-y-1">
        <div className="flex items-center">
          <div className="h-1 w-4 bg-[#ba955c]"></div>
          <span className="ml-2 text-xs">Línea de tren maya</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 flex items-center justify-center">
            <div div className=" bg-[#8c3951] border-2 border-white rounded-md h-3 w-3"></div>
          </div>
          <span className="ml-2 text-xs">Punto de interés</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 flex items-center justify-center">
            <div div className=" bg-black border-2 border-white rounded-md h-3 w-3"></div>
          </div>
          <span className="ml-2 text-xs">Transporte público</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 flex items-center justify-center">
          <div className="h-3 w-3" style={{backgroundColor: '#00534C'}}></div>
          </div>
          <span className="ml-2 text-xs">Comunidades</span>
        </div>
      </div>
    </div>
  );
}

CancunLegend.propTypes = {

};

export default CancunLegend;
