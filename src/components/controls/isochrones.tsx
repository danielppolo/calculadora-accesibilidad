import React from 'react';
import { Tooltip } from '@mui/material';
import {
  TRANSPORTS,
  TIMEFRAMES,
  TRANSPORT_COLORS,
  TRANSPORT_ICONS,
} from 'src/constants';
import ButtonGroup from 'src/components/ButtonGroup';


interface IsochronesControlsProps {
  transport?: string[];
  timeframe?: number;
  hexagonDisabled?: boolean;
  onMediumChange?: (medium: string) => void;
  onTimeStepChange?: (timeStep: number) => void;
}
function IsochronesControls({
  transport,
  timeframe,
  hexagonDisabled = false,
  onMediumChange,
  onTimeStepChange,
}: IsochronesControlsProps) {
  return (
    <>
      <Tooltip
        title={
          !hexagonDisabled && transport?.length === 1 ? 'Selecciona dos o más modos de transporte para comparar' : 'Selecciona un hexágono para habilitar transporte'
        }
        placement="right"
        open={hexagonDisabled || (!hexagonDisabled && transport?.length === 1)}
        disableTouchListener
      >
        <div>
          <ButtonGroup
            options={TRANSPORTS.map((mdm) => ({
              icon: TRANSPORT_ICONS[mdm],
              onClick: () => onMediumChange?.(mdm),
              disabled: hexagonDisabled,
              color: TRANSPORT_COLORS[mdm],
              active: transport?.includes(mdm) ?? false,
            }))}
          />
        </div>
      </Tooltip>
      <div className="m-2 md:m-4" />
      <Tooltip
        title="Selecciona el tiempo de traslado"
        placement="right"
        disableTouchListener
      >
        <div>
          <ButtonGroup
            options={TIMEFRAMES.map((step) => ({
              label: `${step} min`,
              onClick: () => onTimeStepChange?.(step),
              disabled: hexagonDisabled,
              active: timeframe === step,
            }))}
          />
        </div>
      </Tooltip>
      <div className="m-2 md:m-4" />
    </>
  );
}


export default IsochronesControls;
