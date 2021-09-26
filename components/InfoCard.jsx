import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import PropTypes from 'prop-types';
import BarChart from './BarChart';
import { MEDIUMS, TIME_STEPS, OPPORTUNITIES } from '../constants/transport';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';

const icon = {
  walk: <DirectionsWalkIcon />,
  bike: <DirectionsBikeIcon />,
  car: <DirectionsCarFilledIcon />,
};

function InfoCard({
  onOpportunityChange,
  opportunity,
  medium,
  onMediumChange,
  timeStep,
  onTimeStepChange,
  hexagon,
}) {
  return (
    <div className="bg-white rounded-md overflow-y-auto fixed bottom-4 left-4 right-4 h-1/3 z-50 shadow-lg p-4 md:top-8 md:bottom-8 md:left-8 md:right-auto md:w-1/4 md:h-auto">
      <h1 className="text-lg font-bold mb-2">Calculadora de accesibilidad</h1>
      <p className="text-xs mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id feugiat ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque tempor nulla vitae augue porttitor sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque blandit ultrices bibendum. Nullam sit amet accumsan mauris. Mauris nec sem efficitur magna egestas pharetra. Suspendisse gravida ex at velit facilisis gravida.</p>
      <div className="mb-4 mt-4">
      <Divider light/>
      </div>
      <div className="mb-6">
      <p className="text-base font-medium mb-2">Controles</p>
      <p className="text-xs mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id feugiat ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque tempor nulla vitae augue porttitor sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; </p>
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
      {
        hexagon ? (
          <p className="text-sm font-medium mb-2">Cambia el medio de transporte y el tiempo</p>
          ) : (
            <p className="text-sm font-medium mb-2">Cambia el medio de transporte y el tiempo</p>
            
        )
      }
        <div className="pb-4">
          <div className="pb-4">
            <ButtonGroup size="large" aria-label="large button group" fullWidth>
              {
                MEDIUMS.map((md) => (
                  <Button disabled={!hexagon} variant={medium === md ? 'contained' : 'outlined'} key={md} onClick={() => { onMediumChange(md); }}>
                    {icon[md]}
                  </Button>
                ))
              }
            </ButtonGroup>
          </div>
          <div className="pb-4">
            <ButtonGroup size="large" aria-label="large button group" fullWidth>
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
          hexagon ? (
          <>
          <p className="text-sm font-medium mb-2">Número de oportunidades al alcance</p>
            <BarChart 
              data={{
                Trabajos: hexagon.jobs_w,
                Empresas: hexagon.empress,
                Clínicas: hexagon.clinics,
                Escuelas: hexagon.escuels,
              }}
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
