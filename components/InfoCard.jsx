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
  console.log(hexagon)
  return (
    <div className="bg-white rounded-md fixed top-8 left-8 bottom-8 z-50 w-1/4 shadow-lg p-4">
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

      {
        hexagon && (<BarChart 
          data={{
            Trabajos: hexagon.jobs_w,
            Empresas: hexagon.empress,
            Clínicas: hexagon.clinics,
            Escuelas: hexagon.escuels,
          }}
        />)
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
