import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import BarChart from './BarChart';
import { MEDIUMS, TIME_STEPS, OPPORTUNITIES } from '../constants';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';

const MEDIUM_TRANSLATIONS = {
  caminando: "Caminando",
  bus_actual: "Bicicleta",
  bicicleta:  "Transporte público local",
  TM_caminando:  "Transporte público local",
  bus_actual_TM:  "Tren Maya + Transporte público local" ,
  bicicleta_TM: "Tren Maya + Bicicleta",
  bus_mejora_TM:   "Tren Maya + Rutas propuestas de TP",
};

function InfoCard({
  onOpportunityChange,
  opportunity,
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
    <div className="bg-white overflow-y-auto fixed bottom-0 left-0 right-0 h-1/3 z-30 shadow-2xl border-t-4\\\\\\\\\\ md:border-r-2 border-[#e6e6dc] py-6 px-6 md:top-0 md:bottom-0 md:left-0 md:right-auto md:w-1/3 md:max-w-xl md:h-auto">
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
      {/* <Divider light/> */}
      </div>
      <div className="mb-6">
        {/* <p className="text-base font-medium mb-2">Controles</p> */}
        {/* <p className="text-xs mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id feugiat ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque tempor nulla vitae augue porttitor sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; </p> */}
        <h3 className="text-sm font-medium mb-2 text-[#00534C]">Oportunidad a visualizar</h3>
          <TextField
            select
            onChange={onOpportunityChange}
            value={opportunity}
            name="opportinuty"
            label={opportunity ? '' : 'Selecciona oportunidad'}
            fullWidth
            InputLabelProps={{
              shrink: false
            }}
          >
          {
            Object.keys(OPPORTUNITIES).map((op) => <MenuItem value={op} key={op}>{OPPORTUNITIES[op]}</MenuItem>)
          }
        </TextField>
      </div>

      <div className="mb-2">
        <h3 className="text-sm font-medium mb-2 text-[#00534C]">Oportunidades alcanzadas desde un hexágono</h3>
        {
          !reachableOpportunities && (
            <Alert severity="info">Da click sobre un hexágono para habilitar los controles</Alert>
          )
        }
      </div>
      <div>
          <div className="pb-4">
        <h3 className="text-sm font-medium mb-2 text-[#00534C]">Cambia el medio de transporte</h3>
            <Grid container spacing={1}>
            {
              MEDIUMS.map((md) => (
                <Grid key={md} item xs={12}>
                  <Button fullWidth disabled={!hexagon} variant={medium === md ? 'contained' : 'outlined'} key={md} onClick={() => { onMediumChange(md); }}>
                    {MEDIUM_TRANSLATIONS[md]}
                  </Button>
                </Grid>
                ))
              }
            </Grid>
          </div>
          <div className="pb-4">
          <h3 className="text-sm font-medium mb-2 text-[#00534C]">Cambia el tiempo de traslado</h3>
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
      </div>

      <div className="flex mb-6 w-full justify-between">
        <div>
          <h3 className="text-sm font-medium mb-0 text-[#00534C]">Mostrar marginación por AGEB</h3>
          <p className="text-[10px] text-gray-600 font-medium mb-2">Fuente: <a href="http://www.conapo.gob.mx/es/CONAPO/Indice_de_marginacion_urbana_2010" target="_blank" rel="noreferrer" className="underline">CONAPO</a></p>
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
