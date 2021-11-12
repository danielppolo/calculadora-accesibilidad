import { Button, Modal } from '@mui/material';
import React, { useState } from 'react';
import LaunchIcon from '@mui/icons-material/Launch';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Notes() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex items-end cursor-pointer mb-4" onClick={() => setOpen(true)}>
        <p className="text-sm font-medium">
          Ver notas
        </p>
        <LaunchIcon className="h-4 ml-1" />
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center w-full h-screen place-items-center"
      >
        <div className="max-w-3xl max-h-screen bg-white px-4 lg:px-8 py-6  overflow-y-auto">
          <div className="mb-4 lg:hidden">
            <Button startIcon={<ArrowBackIcon />} size="medium" onClick={() => setOpen(false)}>
              Regresar
            </Button>
          </div>
          <div className="text-sm mb-6">
            <h3 className="text-sm font-medium mb-1 text-[#00534C]">Trazo:</h3>
            <p>
              Corresponde al pre-trazo conceptual del Tren Maya, no debe considerarse como la ubicación definitiva de las vías férreas.
            </p>
          </div>
          <div className="text-sm mb-6">
            <h3 className="text-sm font-medium mb-1 text-[#00534C]">Estación Cancún Centro:</h3>
            <p>El proyecto de estación Cancún Centro corresponde a una fase posterior del Tren Maya.</p>
          </div>
          <div className="text-sm mb-6">
            <h3 className="text-sm font-medium mb-1 text-[#00534C]">Accesibilidad:</h3>
            <p>
              Cada hexágono mide 450 metros de lado y 737,000 metros cuadrados.
            </p>
            <p>
              La velocidad aproximada considerada para cada modo fue de:
            </p>
            <ul className="list-disc list-inside">
              <li>Caminar: 3.6 km/h</li>
              <li>Bicicleta: 12 km/h</li>
              <li>Transporte Público: 12 km/h</li>
              <li>Corredores exclusivos de transporte público: 22 km/h</li>
              <li>Vehículos motorizados: Límite de velocidad máxima permitida en vías</li>
              <li>Tren Maya: Características de operación a partir de documentos técnicos.</li>
            </ul>
            <p>
              Para el cálculo del tiempo de viaje utilizando transporte público se utilizó una cadena de viaje multimodal en el que para llegar a una estación se consideró el tiempo y velocidad a pie.
            </p>
          </div>
          <div className="text-sm mb-6">
            <h3 className="text-sm font-medium mb-1 text-[#00534C]">Infraestructura existente:</h3>
            <p>Información obtenida a través de trabajos de levantamiento desarrollados por ITDP y a través de Talleres de generación de conocimiento.</p>
          </div>
          <div className="text-sm mb-6">
            <h3 className="text-sm font-medium mb-1 text-[#00534C]">Proyectos de movilidad: </h3>
            <p>Información obtenida del “Plan de accesibilidad”, ITDP, y a través de Talleres de generación de conocimiento.</p>
          </div>
          <div className="text-sm mb-6">
            <h3 className="text-sm font-medium mb-1 text-[#00534C]">Usos de Suelo Urbano: </h3>
            <p>Elaborada a partir del Programa de Desarrollo Urbano del Centro de Población Cancún, Municipio Benito Juárez, Quintana Roo (2014-2030).</p>
          </div>
          <div className="text-sm mb-6">
            <h3 className="text-sm font-medium mb-1 text-[#00534C]">Densidad de población: </h3>
            <p>Elaborada a partir del Censo 2020 del INEGI.</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Notes;
