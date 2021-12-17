import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { TIME_STEPS } from '../constants';

function TimeControls({
  timeStep,
  onTimeStepChange,
  hexagon,
}) {
  return (
    <div>
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
  );
}

export default TimeControls;
