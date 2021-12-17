import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import { MEDIUMS } from '../constants';

const MEDIUM_ICONS = {
  caminando: <DirectionsWalkIcon />,
  bicicleta: <DirectionsBikeIcon />,
  bus_actual: <DirectionsBusFilledIcon />,
};

function TransportControls({
  medium,
  onMediumChange,
  hexagon,
}) {
  return (
    <div>
      <ButtonGroup size="medium" aria-label="large button group" fullWidth>
        {
          MEDIUMS.map((mdm) => (
            <Button disabled={!hexagon} variant={medium === mdm ? 'contained' : 'outlined'} key={mdm} onClick={() => { onMediumChange(mdm); }}>
              {MEDIUM_ICONS[mdm]}
            </Button>
          ))
        }
      </ButtonGroup>
    </div>
  );
}

export default TransportControls;
