import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import PropTypes from 'prop-types';
import BarChart from './BarChart';
import { MEDIUMS, TIME_STEPS, OPPORTUNITIES } from '../constants';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
const icon = {
  walk: <DirectionsWalkIcon />,
  bike: <DirectionsBikeIcon />,
  car: <DirectionsCarFilledIcon />,
  public: <DirectionsTransitIcon />,
  'public-bike': <><DirectionsTransitIcon /> <span className="mx-1">+</span> <DirectionsBikeIcon /></>,
  'public-car': <><DirectionsTransitIcon /> <span className="mx-1">+</span>  <DirectionsCarFilledIcon /></>,
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
    <div className="bg-white overflow-y-auto fixed bottom-4 left-4 right-4 h-1/3 z-50 shadow-2xl border-r-2 border-[#e6e6dc] py-6 px-6 md:top-0 md:bottom-0 md:left-0 md:right-auto md:w-1/3 md:h-auto">
      <h1 className="text-xl font-bold mb-2">Calculadora de accesibilidad</h1>
      <p className="text-xs mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id feugiat ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque tempor nulla vitae augue porttitor sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque blandit ultrices bibendum. Nullam sit amet accumsan mauris. Mauris nec sem efficitur magna egestas pharetra. Suspendisse gravida ex at velit facilisis gravida.</p>
      <div className="mb-4 mt-4">
      <Divider light/>
      </div>
      <p className="text-base font-medium mb-2">Cancún</p>
      <p className="text-xs mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id feugiat ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </p>
      <div>
        {
          Object.keys(cityData).map(key => (
            <div key={key} className="flex flex-row items-center justify-between mb-0">
              <p className="text-sm"><span  className="font-semibold"key={key}>{key}</span>: <span>{Intl.NumberFormat().format(cityData[key])}</span></p>
            </div>
          ))
        }
      </div>
      <div className="mb-4 mt-4">
      <Divider light/>
      </div>
      <div className="mb-6">
        <p className="text-base font-medium mb-2">Controles</p>
        <p className="text-xs mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id feugiat ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque tempor nulla vitae augue porttitor sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; </p>
          <TextField
            select
            label="Categoría"
            onChange={onOpportunityChange}
            value={opportunity}
            name="opportinuty"
            fullWidth
          >
          {
            Object.keys(OPPORTUNITIES).map((op) => <MenuItem value={op} key={op}>{OPPORTUNITIES[op]}</MenuItem>)
          }
        </TextField>
      </div>

      <div className="flex mb-6 w-full justify-between">
        <div>
          <p className="text-sm font-medium mb-0">Mostrar marginación por AGEB</p>
          <p className="text-[10px] text-gray-600 font-medium mb-2">Fuente: <a href="http://www.conapo.gob.mx/es/CONAPO/Indice_de_marginacion_urbana_2010" target="_blank" rel="noreferrer" className="underline">CONAPO</a></p>
        </div>
        <Switch checked={economicTiles} onChange={onEconomicTilesChange} />
      </div>

      <div>
          <div className="pb-4">
        <p className="text-sm font-medium mb-2">Cambia el medio de transporte</p>
            <ButtonGroup className="mb-1" size="medium" aria-label="large button group" fullWidth>
              {
                MEDIUMS.slice(0,3).map((md) => (
                  <Button disabled={!hexagon} variant={medium === md ? 'contained' : 'outlined'} key={md} onClick={() => { onMediumChange(md); }}>
                    {icon[md]}
                  </Button>
                ))
              }
            </ButtonGroup>
            <ButtonGroup size="medium" aria-label="large button group" fullWidth>
              {
                MEDIUMS.slice(3,6).map((md) => (
                  <Button disabled={!hexagon} variant={medium === md ? 'contained' : 'outlined'} key={md} onClick={() => { onMediumChange(md); }}>
                    {icon[md]}
                  </Button>
                ))
              }
            </ButtonGroup>
          </div>
          <div className="pb-4">
          <p className="text-sm font-medium mb-2">Cambia el tiempo de traslado</p>
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
      
      {
        reachableOpportunities ? (
        <>
        <p className="text-sm font-medium mb-2 mt-4">Número de oportunidades al alcance</p>
          <BarChart 
            data={reachableOpportunities}
          />
        </>
        ) : (
          <Alert severity="info">Da click sobre un hexágono para habilitar los controles</Alert>
        )
      }
      <div className="mb-4 mt-4">
        <Divider light/>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Créditos</p>
        <p className="text-xs mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id feugiat ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque tempor nulla vitae augue porttitor sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; </p>
        <img className="h-6" src="https://lh3.googleusercontent.com/proxy/K7F57RBg0D6HgDKnULZsU0D5Pj9LpK-p0LKEQf51RQhK7pRwmJsY-yuqtdmi-4br4ltc6St5SlANiR4E3iZaO6iBwpNp9VZZoNA" alt="Fonatur logotipo" />
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
