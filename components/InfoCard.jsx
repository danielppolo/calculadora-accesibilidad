import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import BarChart from './BarChart';
import { MEDIUMS, TIME_STEPS } from '../constants';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import FlareIcon from '@mui/icons-material/Flare';

const MEDIUM_TRANSLATIONS = {
  caminando: "Caminando",
  bicicleta:  "Bicicleta",
  bus_actual: "Transporte público local",
  TM_caminando:  "Tren Maya",
  bus_actual_TM:  "Tren Maya + Transporte público local" ,
  bicicleta_TM: "Tren Maya + Bicicleta",
  bus_mejora_TM:   "Tren Maya + Rutas propuestas de TP",
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
}) {
  return (
    <div className="bg-white overflow-y-auto fixed bottom-0 left-0 right-0 h-1/3 z-30 shadow-2xl border-t-4  border-[#e6e6dc] py-6 px-6 md:top-4 md:bottom-4 md:left-4 md:right-auto md:w-1/3 md:max-w-xl md:h-auto md:border-2">
      <h1 className="text-2xl font-bold mb-4 text-[#00534C]">Calculadora de accesibilidad a oportunidades</h1>
      <p className="text-xs mb-6">La accesibilidad a oportunidades estima el acceso a trabajos, hospitales, escuelas y puntos turísticos en diferentes modos de transporte para cada zona de una ciudad. Este proyecto tiene como objetivo mostrar las oportunidades en la Zona de la Península de Yucatán a través de una herramienta interactiva.</p>
      <div className="mb-6 mt-6">
      <Divider light/>
      </div>
      <h2 className="text-base font-medium mb-2 text-[#00534C]">Zona Metropolitana de Cancún</h2>
      <p className="text-xs mb-4">Para toda la Zona, se cuentan con el siguiente número de oportunidades totales:</p>
      <div>
        {
          Object.keys(cityData).map(key => (
            <div key={key} className="flex flex-row items-center justify-between mb-0">
              <p className="text-sm"><span  className="font-semibold"key={key}>{key}</span>: <span>{Intl.NumberFormat().format(cityData[key])}</span></p>
            </div>
          ))
        }
      </div>
      <div className="mb-6 mt-4">
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2 text-[#00534C]">
          Paso 1. Da click en un hexágono
        </h3>
        <Alert severity="info">Da click sobre un hexágono para habilitar los controles</Alert>
      </div>

      <div className="pb-4">
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

      <div className="mb-4">
        <h3 className="text-sm font-medium text-[#00534C] mb-4">
          Paso 3. Selecciona modo de transporte.
        </h3>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <h4 className="text-sm text-center font-semibold uppercase">Situación actual</h4>
            </Grid>
            <Grid item xs={6}>
              <h4 className="text-sm text-center font-semibold uppercase">Tren Maya</h4>
            </Grid>
            <Grid item xs={6}>
              <Button startIcon={<DirectionsWalkIcon/>} fullWidth disabled={!hexagon} variant={medium === 'caminando' ? 'contained' : 'outlined'} key={'caminando'} onClick={() => { onMediumChange('caminando'); }}>
                Caminando
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Tooltip title="Caminando + Tren Maya" arrow={false} placement="right">
                <Button startIcon={<DirectionsWalkIcon/>} fullWidth disabled={!hexagon} variant={medium === 'TM_caminando' ? 'contained' : 'outlined'} key={'TM_caminando'} onClick={() => { onMediumChange('TM_caminando'); }}>
                  Caminando
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={6}>
              <Button startIcon={<DirectionsBikeIcon/>} fullWidth disabled={!hexagon} variant={medium === 'bicicleta' ? 'contained' : 'outlined'} key={'bicicleta'} onClick={() => { onMediumChange('bicicleta'); }}>
                Bicicleta
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Tooltip title="Bicicleta + Tren Maya" arrow={false} placement="right">
                <Button startIcon={<DirectionsBikeIcon/>} fullWidth disabled={!hexagon} variant={medium === 'bicicleta_TM' ? 'contained' : 'outlined'} key={'bicicleta_TM'} onClick={() => { onMediumChange('bicicleta_TM'); }}>
                  Bicicleta
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={6}>
                <Button startIcon={<DirectionsBusFilledIcon/>}  fullWidth disabled={!hexagon} variant={medium === 'bus_actual' ? 'contained' : 'outlined'} key={'bus_actual'} onClick={() => { onMediumChange('bus_actual'); }}>
                  T. público
                </Button>
            </Grid>
            <Grid item xs={6}>
              <Tooltip title="Transporte Público + Tren Maya" arrow={false} placement="right">
                <Button  startIcon={<DirectionsBusFilledIcon/>}  fullWidth disabled={!hexagon} variant={medium === 'bus_actual_TM' ? 'contained' : 'outlined'} key={'bus_actual_TM'} onClick={() => { onMediumChange('bus_actual_TM'); }}>
                  T. público
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <Tooltip title="Propuesta de Transporte Público + Tren Maya" arrow={false} placement="right">
                <Button startIcon={<FlareIcon/>}  fullWidth disabled={!hexagon} variant={medium === 'bus_mejora_TM' ? 'contained' : 'outlined'} key={'bus_mejora_TM'} onClick={() => { onMediumChange('bus_mejora_TM'); }}>
                  Propuesta de TP
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2 text-[#00534C]">
          Paso 4. Observa la isocrona y el histograma.
        </h3>
        <Alert severity="info">Da click sobre un hexágono para habilitar los controles</Alert>
      </div>

      <div className="flex mb-6 w-full justify-between">
        <div>
          <h3 className="text-sm font-medium mb-0 text-[#00534C]">Mostrar Usos de Suelo y Vegetación.</h3>
          <p className="text-[10px] text-gray-600 font-medium mb-2">Fuente: <a className="uppercase underline" href="http://www.conabio.gob.mx/informacion/metadata/gis/usv250s6gw.xml?_httpcache=yes&_xsl=/db/metadata/xsl/fgdc_html.xsl&_indent=no">CONABIO</a></p>
        </div>
        <Switch checked={economicTiles} onChange={onEconomicTilesChange} />
      </div>
      
      {
        reachableOpportunities && (
        <>
        <p className="text-sm font-medium mb-2 mt-4">Número de oportunidades al alcance</p>
          <BarChart 
            data={reachableOpportunities}
          />
        </>
        )
      }
      <div className="mb-4 mt-4">
        <Divider light/>
      </div>
      <div>
        {/* <p className="text-sm font-medium mb-4">Créditos</p> */}
        {/* <p className="text-xs mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id feugiat ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque tempor nulla vitae augue porttitor sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; </p> */}
        <img className="w-full" src="/fonatur.jpg" alt="Fonatur logotipo" />
      </div>
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
