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
            <h3 className="text-sm font-medium mb-1 text-[#00534C]">Pretrazo:</h3>
            <p>
              Corresponde al la ruta preliminar de las vías del tren, la cual puede ser sujeta a cambios derivados de necesidades operativas y que responderá a los estudios técnicos necesarios.
            </p>
          </div>
          <div className="text-sm mb-6">
            <h3 className="text-sm font-medium mb-1 text-[#00534C]">Estación Cancún Centro:</h3>
            <p>El proyecto de estación Cancún Centro corresponde a una fase posterior del Tren Maya.</p>
          </div>

          <div className="text-sm mb-6">
            <h3 className="text-sm font-medium mb-1 text-[#00534C]">Accesibilidad:</h3>
            <p>La metodología de cálculo siguió a Pereira et al. (2019), que propone un método estandarizado para medir los niveles de accesibilidad. Para el cálculo de indicadores se tomaron las siguientes consideraciones:</p>
            <p>
              Cada hexágono mide 450 metros de lado y 737,000 metros cuadrados.
            </p>
            <p>
              La velocidad aproximada considerada para cada modo y su fuente es:
            </p>
            <ul className="list-disc list-inside">
              <li>Caminar: 3.6 km/h (Saraiva, et al., 2021)</li>
              <li>Bicicleta: 12 km/h (Saraiva, et al., 2021)</li>
              <li>Transporte Público: 12 km/h (DGTV Cancún, 2021)</li>
              <li>Corredores exclusivos de transporte público: 22 km/h (DGTV, 2021). </li>
              <li>Vehículos motorizados: Límite de velocidad máxima permitida en vías  (Red Nacional de Caminos, 2021).</li>
              <li>Tren Maya: Características de operación a partir de documentos técnicos. (Consorcio de Ingeniería Básica Tren Maya, 2021)</li>
            </ul>
          </div>
          <div className="text-sm mb-6">
            <h3 className="text-sm font-medium mb-1 text-[#00534C]">Destinos:</h3>
            <p>Los destinos evaluados fueron obtenidos del Directorio Estadístico Nacional de Unidades Económicas (DENUE) (INEGI, 2019).</p>
          </div>
          <div className="text-sm mb-6">
            <h3 className="text-sm font-medium mb-1 text-[#00534C]">Ruteos:</h3>
            <p>Para el cálculo del tiempo de viaje utilizando transporte público se utilizó una cadena de viaje multimodal en la que para llegar a una estación se consideró el tiempo y velocidad a pie.</p>
            <p>Para viajes en transporte público, se estima la accesibilidad considerando que el usuario se desplaza a pie al llegar y al salir de la estación. Los tiempos de espera son determinados por las frecuencias aproximadas de cada ruta.</p>
            <p>Una descripción detallada de la configuración predeterminada de ruteo puede consultarse en OpenTripPlanner, 2021.</p>
          </div>
          <div className="text-sm mb-6">
            <h3 className="text-sm font-medium mb-1 text-[#00534C]">Zona Metropolitana de Cancún:</h3>
            <p>La zona metropolitana considera los municipios de Benito Juárez e Isla Mujeres. (SEDATU, CONAPO e INEGI, 2018)</p>
          </div>
          <div className="text-sm mb-6">
            <h3 className="text-sm font-medium mb-1 text-[#00534C]">Infraestructura existente:</h3>
            <p>Sistema de transporte público local de la ZMC: Para generar una red de transporte público útil para el análisis, se partió de la información disponible para la ZMC proveída por la DGTV de Cancún (2021). Debido a que no existe una red funcional disponible para este modo, se programó una aproximación de la cobertura de la red en un estándar abierto en el formato GTFS (General Transit Feed Specification), considerando la cobertura a nivel metropolitano. </p>
            <p>
              Infraestructura peatonal: Para representar la infraestructura peatonal existente se utilizó la información de banquetas disponibles contenidas en el Inventario Nacional de Vivienda (INEGI, 2016)
            </p>
          </div>
          <div className="text-sm mb-6">
            <h3 className="text-sm font-medium mb-1 text-[#00534C]">Proyectos de movilidad propuestos:</h3>
            <p>Información obtenida del “Plan de accesibilidad”, ITDP, y a través de Talleres de generación de conocimiento.</p>
          </div>
          <div className="text-sm mb-6">
            <h3 className="text-sm font-medium mb-1 text-[#00534C]">Usos de Suelo Urbano:</h3>
            <p>
              Elaborada a partir del Programa de Desarrollo Urbano del Centro de Población Cancún, Municipio Benito Juárez, Quintana Roo (2014-2030).
            </p>
          </div>
          <div className="text-sm mb-6">
            <h3 className="text-sm font-medium mb-1 text-[#00534C]">Densidad de población::</h3>
            <p>Elaborada a partir del Censo de Población y Vivienda (INEGI, 2020)</p>
          </div>
          <div className="text-xs mb-6">
            <h3 className="text-xs font-medium mb-1 text-[#00534C]">Fuentes:</h3>
            <ul className="list-disc list-inside">
              <li>
                Dirección General de Transporte y Vialidad de Cancún (DGTV Cancún) (2021) Sistema Integrado del Servicio Público de Transporte Urbano de Pasajeros en Autobuses en Ruta Establecida denominado “Corredores con Carriles Exclusivos y Confinados de Transporte Público de Pasajeros en Autobuses en Ruta Establecida” (Sin publicar)
              </li>
              <li>
                Ingeniería Básica Tren Maya - Plan de operación, 2021-03-22, (CIB) Consorcio de Ingeniería Básica (CIB). Preparado para Fonatur. (Confidencial)
              </li>
              <li>
                OpenTripPlanner (2021), Configuring OpenTripPlanner. Disponible en:
                {' '}
                <a href="https://docs.opentripplanner.org/en/latest/Configuration/#routing-defaults">https://docs.opentripplanner.org/en/latest/Configuration/#routing-defaults</a>
              </li>
              <li>INEGI (2019) Directorio Estadístico Nacional de Unidades Económicas (DENUE) Noviembre 2019.</li>
              <li>
                Pereira, R. H. M., Braga, C. K. V., Serra, B., & Nadalin, V. G. (2019). Desigualdades socioespaciais de acesso a oportunidades nas cidades brasileiras – 2019. Instituto de Pesquisa Econômica Aplicada – ipea 2020 58.
              </li>
              <li>
                Red Nacional de Caminos, 2021, Instituto Mexicano del Transporte. Disponible en:
                {' '}
                <a href="https://www.gob.mx/imt/acciones-y-programas/red-nacional-de-caminos" />
              </li>
              <li>
                Saraiva, M., Herszenhut, D., Pereira, R. H. M., Braga, C. K. V., & Matthew Wigginton Conway. (2021). Package ‘r5r.’ Disponible en:
                {' '}
                <a href="https://cloud.r-project.org/web/packages/r5r/r5r.pdf">https://cloud.r-project.org/web/packages/r5r/r5r.pdf</a>
              </li>
              <li>
                SEDATU, CONAPO e INEGI (2018). Delimitación de las zonas metropolitanas de México 2015. Disponible en:
                {' '}
                <a href="https://www.inegi.org.mx/contenido/productos/prod_serv/contenidos/espanol/bvinegi/productos/nueva_estruc/702825006792.pdf">https://www.inegi.org.mx/contenido/productos/prod_serv/contenidos/espanol/bvinegi/productos/nueva_estruc/702825006792.pdf</a>
              </li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Notes;
