import React from 'react';

function CancunLegend({
  pedestrian,
  vehicular,
  publicTransport,
  ciclopath,
  pedestrianProposal,
  vehicularProposal,
  publicTransportProposal,
  ciclopathProposal,
}) {
  return (
    <div className="bg-white h-1/3 border-2 border-[#e6e6dc] p-4 md:h-auto w-full">
      <h3 className="text-xs font-semibold pb-2 uppercase">Simbología</h3>
      <div className="space-y-1">
        <div className="flex items-center">
          <div className="h-[2px] w-4 flex-shrink-0	 bg-[#ba955c]" />
          <span className="ml-2 text-xs">Pretrazo del Tren Maya</span>
        </div>

        <div className="flex items-center">
          <div className="h-[2px] w-4 flex-shrink-0	 bg-[#fdbbcd]" />
          <span className="ml-2 text-xs">Zona Metropolitana de Cancún</span>
        </div>

        <div className="flex items-center">
          <div className="h-[2px] w-4 flex-shrink-0	 bg-[#96968c]" />
          <span className="ml-2 text-xs">Red vial</span>
        </div>

        {
          publicTransport && (
            <div className="flex items-center">
              <div className="h-[2px] w-4 flex-shrink-0	 border-t-2 border-solid border-[#BF91F7]" />
              <span className="ml-2 text-xs">Principales rutas de Transporte</span>
            </div>
          )
        }

        {
          publicTransportProposal && (
            <div className="flex items-center">
              <div className="h-[2px] w-4 flex-shrink-0	border-t-2 border-[#9547f4] border-dashed" />
              <span className="ml-2 text-xs">Rutas propuestas</span>
            </div>
          )
        }

        {
          pedestrian && (
            <div className="flex items-center">
              <div className="h-[2px] w-4 flex-shrink-0	border-t-2  border-[#FF9CB3]" />
              <span className="ml-2 text-xs">Banquetas existentes</span>
            </div>
          )
        }

        {
          pedestrianProposal && (
            <div className="flex items-center">
              <div className="h-[2px] w-4 flex-shrink-0	border-t-2 border-dashed border-[#ff507a]" />
              <span className="ml-2 text-xs">Intervenciones en banquetas</span>
            </div>
          )
        }

        {
          ciclopath && (
            <div className="flex items-center">
              <div className="h-[2px] w-4 flex-shrink-0	border-t-2 border-solid border-[#9FC88C]" />
              <span className="ml-2 text-xs">Red ciclista actual</span>
            </div>
          )
        }

        {
          ciclopathProposal && (
            <div className="flex items-center">
              <div className="h-[2px] w-4 flex-shrink-0	border-t-2 border-dashed border-[#70bc4c]" />
              <span className="ml-2 text-xs">Ciclocarriles y prioridad ciclista</span>
            </div>
          )
        }

        {
          vehicular && (
            <div className="flex items-center">
              <div className="h-[2px] w-4 flex-shrink-0	border-t-2 border-solid border-[#FDA28E]" />
              <span className="ml-2 text-xs">Red vial actual</span>
            </div>
          )
        }

        {
          vehicularProposal && (
            <div className="flex items-center">
              <div className="h-[2px] w-4 flex-shrink-0	 border-t-2 border-dashed border-[#fd6541]" />
              <span className="ml-2 text-xs">Prolongación de vías</span>
            </div>
          )
        }

        <div className="flex items-center">
          <div className="w-4 flex-shrink-0	 h-4 flex items-center justify-center">
            <div className=" bg-white border-2 border-black rounded-md h-3 w-3" />
          </div>
          <span className="ml-2 text-xs">Estaciones del Tren Maya</span>
        </div>

        <div className="flex items-center">
          <div className="w-4 flex-shrink-0	 h-4 flex items-center justify-center">
            <div className=" bg-[#8c3951] border-2 border-white rounded-md h-3 w-3" />
          </div>
          <span className="ml-2 text-xs">Punto de interés</span>
        </div>

        <div className="flex items-center">
          <div className="w-4 h-4 flex-shrink-0	flex items-center justify-center">
            <div className="h-3 w-3" style={{ backgroundColor: '#00534C' }} />
          </div>
          <span className="ml-2 text-xs">Comunidad Sustentable</span>
        </div>

        <div className="flex items-center">
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="h-3 w-3" style={{ backgroundColor: '#e6e6dc' }} />
          </div>
          <span className="ml-2 text-xs">Cuerpos de agua y océanos</span>
        </div>
      </div>
    </div>
  );
}

CancunLegend.propTypes = {

};

export default CancunLegend;
