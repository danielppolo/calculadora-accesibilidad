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
      <div className="pb-4">
        <TextField
          select
          label="Selecciona una categoría"
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
        hexagon && (
        <div>
          <div className="pb-4">
            <ButtonGroup size="large" aria-label="large button group" fullWidth>
              {
                MEDIUMS.map((md) => (
                  <Button variant={medium === md ? 'contained' : 'outlined'} key={md} onClick={() => { onMediumChange(md); }}>
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
                  <Button variant={timeStep === step ? 'contained' : 'outlined'} key={step} onClick={() => { onTimeStepChange(step); }}>
                    {step}
                    min
                  </Button>
                ))
              }
            </ButtonGroup>
          </div>
            
            <BarChart 
              data={{
                Trabajos: hexagon.jobs_w,
                Empresas: hexagon.empress,
                Clínicas: hexagon.clinics,
                Escuelas: hexagon.escuels,
              }}
            />
        </div>
        )
      }
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
