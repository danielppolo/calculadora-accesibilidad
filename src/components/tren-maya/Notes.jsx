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
        className="flex justify-center w-full h-screen place-items-center z-[1600]"
      >
        <div className="max-w-3xl max-h-screen bg-white px-4 lg:px-8 py-6  overflow-y-auto">
          <div className="mb-4 lg:hidden">
            <Button startIcon={<ArrowBackIcon />} size="medium" onClick={() => setOpen(false)}>
              Regresar
            </Button>
          </div>
          <div className="text-sm mb-6">
            <h3 className="text-sm font-bold mb-1">Proyectos de movilidad propuestos:</h3>
            <p className="text-xs">Información obtenida del “Plan de accesibilidad”, ITDP, y a través de Talleres de generación de conocimiento.</p>
          </div>
          {/* <div className="text-sm mb-6">
            <h3 className="text-sm font-bold mb-1">Usos de Suelo Urbano:</h3>
            <p className="text-xs">
              Elaborada a partir del Programa de Desarrollo Urbano del Centro de Población Cancún, Municipio Benito Juárez, Quintana Roo (2014-2030).
            </p>
          </div> */}
          <div className="text-sm mb-6">
            <h3 className="text-sm font-bold mb-1">Densidad de población::</h3>
            <p className="text-xs">Elaborada a partir del Censo de Población y Vivienda (INEGI, 2020)</p>
          </div>
          <div className="text-xs mb-6">
            <h3 className="text-sm font-bold mb-1">Otros:</h3>
            <ul className="list-disc list-inside">
              <li>
              OpenTripPlanner (2021), Configuring OpenTripPlanner. Disponible en: <a href="https://docs.opentripplanner.org/en/latest/Configuration/#routing-defaults">https://docs.opentripplanner.org/en/latest/Configuration/#routing-defaults</a>
              </li>
              <li>
              INEGI (2019) Directorio Estadístico Nacional de Unidades Económicas (DENUE) Noviembre 2019.
              </li>
              <li>
              Pereira, R. H. M., Braga, C. K. V., Serra, B., & Nadalin, V. G. (2019). Desigualdades socioespaciais de acesso a oportunidades nas cidades brasileiras – 2019. Instituto de Pesquisa Econômica Aplicada – ipea 2020 58.
              </li>
              <li>
              Red Nacional de Caminos, 2021, Instituto Mexicano del Transporte.
              </li>
              <li>
              Saraiva, M., Herszenhut, D., Pereira, R. H. M., Braga, C. K. V., & Matthew Wigginton Conway. (2021). Package ‘r5r.’ Disponible en: https://cloud.r-project.org/web/packages/r5r/r5r.pdf
              </li>
              <li>
              SEDATU, CONAPO e INEGI (2018). Delimitación de las zonas metropolitanas de México 2015. Disponible en: <a href="https://www.inegi.org.mx/contenido/productos/prod_serv/contenidos/espanol/bvinegi/productos/nueva_estruc/702825006792.pdf">https://www.inegi.org.mx/contenido/productos/prod_serv/contenidos/espanol/bvinegi/productos/nueva_estruc/702825006792.pdf</a>
              </li>
              {/* <li>
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
              </li> */}
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Notes;
