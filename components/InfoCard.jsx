import React, { useState } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import FlareIcon from '@mui/icons-material/Flare';
import { MEDIUMS, TIME_STEPS } from '../constants';
import BarChart from './BarChart';
import Notes from './tren-maya/Notes';
import Credits from './tren-maya/Credits';
import LayerSwitch from './LayerSwitch';

const MEDIUM_TRANSLATIONS = {
  caminando: 'Caminando',
  bicicleta: 'Bicicleta',
  bus_actual: 'Transporte público local',
  TM_caminando: 'Tren Maya',
  bus_actual_TM: 'Tren Maya + Transporte público local',
  bicicleta_TM: 'Tren Maya + Bicicleta',
  bus_mejora_TM: 'Tren Maya + Rutas propuestas de TP',
};

function InfoCard({
  cityData,
  medium,
  onMediumChange,
  timeStep,
  onTimeStepChange,
  hexagon,
  reachableOpportunities,
  economicTiles,
  onEconomicTilesChange,
  populationDensity,
  onPopulationDensityChange,
  pedestrian,
  onPedestrianChange,
  vehicular,
  onVehicularChange,
  publicTransport,
  onPublicTransportChange,
  ciclopath,
  onCiclopathChange,
  pedestrianProposal,
  onPedestrianProposalChange,
  vehicularProposal,
  onVehicularProposalChange,
  publicTransportProposal,
  onPublicTransportProposalChange,
  ciclopathProposal,
  onCiclopathProposalChange,
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`bg-white fixed bottom-0 left-0 right-0 h-1/3 z-30 shadow-2xl border-2 m border-[#e6e6dc] py-6 px-6 md:top-4 md:bottom-auto md:left-4 md:right-auto md:w-1/3 md:max-w-xl md:h-auto overflow-y-auto ${expanded && 'md:bottom-4'}`}>
      <h1 className="text-2xl font-bold mb-4 text-[#00534C]"> Plataforma de visualización de accesibilidad urbana, Cancún, Quintana Roo</h1>
      <p className="text-sm mb-6">La accesibilidad a oportunidades estima el acceso el acceso a trabajos, hospitales, escuelas y puntos turísticos en diferentes modos de transporte sustentable para cada zona de una ciudad. Este proyecto tiene como objetivo mostrar las oportunidades en la Zona de la Península de Yucatán a través de una herramienta interactiva.</p>

      <Button
        variant="outlined"
        onClick={() => { setExpanded(!expanded); }}
      >
        {expanded ? 'Cerrar' : 'Abrir'}
        {' '}
        controles
      </Button>

      { expanded && (
        <div>
          <div className="mb-6 mt-6">
            <Divider light />
          </div>
          <h2 className="text-base font-medium mb-2 text-[#00534C]">Zona Metropolitana de Cancún</h2>
          <p className="text-sm mb-4">Para toda la Zona, se cuentan con el siguiente número de oportunidades totales:</p>
          <div>
            {
          Object.keys(cityData).map((key) => (
            <div key={key} className="flex flex-row items-center justify-between mb-0">
              <p className="text-sm">
                <span className="font-semibold" key={key}>{key}</span>
                :
                {' '}
                <span>{Intl.NumberFormat().format(cityData[key])}</span>
              </p>
            </div>
          ))
        }
          </div>
          <div className="mb-6 mt-4" />

          <div className="mb-4 mt-8">
            <h3 className="text-sm font-medium mb-2 text-[#00534C]">
              Paso 1. Da click en un hexágono
            </h3>
            <Alert severity="info">Da click sobre un hexágono para habilitar los controles</Alert>
          </div>

          <div className="pb-4v mt-8">
            <h3 className="text-sm font-medium mb-2 text-[#00534C]">
              Paso 2. Selecciona el tiempo
            </h3>
            <ButtonGroup size="medium" aria-label="large button group" fullWidth>
              {
            TIME_STEPS.map((step) => (
              <Button disabled={!hexagon} variant={timeStep === step ? 'contained' : 'outlined'} key={step} onClick={() => { onTimeStepChange(step); }}>
                {step}
                min
              </Button>
            ))
          }
            </ButtonGroup>
          </div>

          <div className="mb-4 mt-8">
            <h3 className="text-sm font-medium text-[#00534C] mb-4">
              Paso 3. Selecciona un modo de transporte sustentable.
            </h3>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <h4 className="text-sm text-center font-semibold uppercase">Situación actual</h4>
              </Grid>
              <Grid item xs={6}>
                <h4 className="text-sm text-center font-semibold uppercase">Tren Maya</h4>
              </Grid>
              <Grid item xs={6}>
                <Button startIcon={<DirectionsWalkIcon />} fullWidth disabled={!hexagon} variant={medium === 'caminando' ? 'contained' : 'outlined'} key="caminando" onClick={() => { onMediumChange('caminando'); }}>
                  Caminando
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Caminando + Tren Maya" arrow={false} placement="right">
                  <Button startIcon={<DirectionsWalkIcon />} fullWidth disabled={!hexagon} variant={medium === 'TM_caminando' ? 'contained' : 'outlined'} key="TM_caminando" onClick={() => { onMediumChange('TM_caminando'); }}>
                    Caminando
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Button startIcon={<DirectionsBikeIcon />} fullWidth disabled={!hexagon} variant={medium === 'bicicleta' ? 'contained' : 'outlined'} key="bicicleta" onClick={() => { onMediumChange('bicicleta'); }}>
                  Bicicleta
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Bicicleta + Tren Maya" arrow={false} placement="right">
                  <Button startIcon={<DirectionsBikeIcon />} fullWidth disabled={!hexagon} variant={medium === 'bicicleta_TM' ? 'contained' : 'outlined'} key="bicicleta_TM" onClick={() => { onMediumChange('bicicleta_TM'); }}>
                    Bicicleta
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Button startIcon={<DirectionsBusFilledIcon />} fullWidth disabled={!hexagon} variant={medium === 'bus_actual' ? 'contained' : 'outlined'} key="bus_actual" onClick={() => { onMediumChange('bus_actual'); }}>
                  T. público
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Transporte Público + Tren Maya" arrow={false} placement="right">
                  <Button startIcon={<DirectionsBusFilledIcon />} fullWidth disabled={!hexagon} variant={medium === 'bus_actual_TM' ? 'contained' : 'outlined'} key="bus_actual_TM" onClick={() => { onMediumChange('bus_actual_TM'); }}>
                    T. público
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item xs={6} />
              <Grid item xs={6}>
                <Tooltip title="Propuesta de Transporte Público + Tren Maya" arrow={false} placement="right">
                  <Button startIcon={<FlareIcon />} fullWidth disabled={!hexagon} variant={medium === 'bus_mejora_TM' ? 'contained' : 'outlined'} key="bus_mejora_TM" onClick={() => { onMediumChange('bus_mejora_TM'); }}>
                    Propuesta de TP
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </div>

          <div className="mb-4 mt-8">
            <h3 className="text-sm font-medium mb-2 text-[#00534C]">
              Paso 4. Observa la isocrona y el histograma.
            </h3>
            {
          reachableOpportunities ? (
            <>
              <p className="text-sm font-medium mb-2 mt-4">Número de oportunidades al alcance</p>
              <BarChart
                data={reachableOpportunities}
              />
            </>
          ) : (
            <Alert severity="info">Da click sobre un hexágono para obtener más información</Alert>
          )
        }
          </div>

          <div className="mb-4 mt-8">
            <h3 className="text-sm mb-4 font-medium text-[#00534C]">
              Paso 5. Mostrar capa de referencia
            </h3>
            {/* <LayerSwitch
          title="Usos de Suelo y Vegetación."
          legend={(
            <span>
              Fuente:
              {' '}
              <a className="uppercase underline" href="http://www.conabio.gob.mx/informacion/metadata/gis/usv250s6gw.xml?_httpcache=yes&_xsl=/db/metadata/xsl/fgdc_html.xsl&_indent=no">CONABIO</a>
            </span>
          )}
          checked={economicTiles}
          onChange={onEconomicTilesChange}
        /> */}
            {/* TODO: Upload layers to Mapbox. */}
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <h4 className="text-sm font-semibold uppercase">Infraestructura existente</h4>
              </Grid>
              <Grid item xs={6}>
                <h4 className="text-sm font-semibold uppercase">Propuesta de proyectos de movilidad</h4>
              </Grid>
              <Grid item xs={6}>
                <LayerSwitch
                  title="Transporte público"
                  checked={publicTransport}
                  onChange={onPublicTransportChange}
                />
              </Grid>
              <Grid item xs={6}>
                <LayerSwitch
                  title="Transporte público"
                  checked={publicTransportProposal}
                  onChange={onPublicTransportProposalChange}
                />
              </Grid>
              <Grid item xs={6}>
                <LayerSwitch
                  title="Peatonal"
                  checked={pedestrian}
                  onChange={onPedestrianChange}
                />
              </Grid>
              <Grid item xs={6}>
                <LayerSwitch
                  title="Peatonal"
                  checked={pedestrianProposal}
                  onChange={onPedestrianProposalChange}
                />
              </Grid>
              <Grid item xs={6}>
                <LayerSwitch
                  title="Ciclista"
                  checked={ciclopath}
                  onChange={onCiclopathChange}
                />
              </Grid>
              <Grid item xs={6}>
                <LayerSwitch
                  title="Ciclista"
                  checked={ciclopathProposal}
                  onChange={onCiclopathProposalChange}
                />
              </Grid>
              <Grid item xs={6}>
                <LayerSwitch
                  title="Vehicular"
                  checked={vehicular}
                  onChange={onVehicularChange}
                />
              </Grid>
              <Grid item xs={6}>
                <LayerSwitch
                  title="Vehicular"
                  checked={vehicularProposal}
                  onChange={onVehicularProposalChange}
                />
              </Grid>
            </Grid>
            <div className="mb-6 mt-6">
              <Divider light />
            </div>
            <LayerSwitch
              title="Usos de suelo urbano"
              legend="Fuente: ITDP 2021"
              checked={economicTiles}
              onChange={onEconomicTilesChange}
            />
            <LayerSwitch
              title="Densidad de población"
              legend="Fuente: INEGI 2020"
              checked={populationDensity}
              onChange={onPopulationDensityChange}
            />

          </div>

          <div className="mb-4 mt-4">
            <Divider light />
          </div>

          <div>
            <Notes />
            <Credits />
          </div>
        </div>
      ) }
    </div>
  );
}

InfoCard.propTypes = {
  medium: PropTypes.string.isRequired,
  opportunity: PropTypes.string.isRequired,
  timeStep: PropTypes.number.isRequired,
  onOpportunityChange: PropTypes.func.isRequired,
  onTimeStepChange: PropTypes.func.isRequired,
  onMediumChange: PropTypes.func.isRequired,
};

export default InfoCard;
