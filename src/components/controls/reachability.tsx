import React from 'react';
import {
  TRANSPORTS,
  TRANSPORT_COLORS,
  OPPORTUNITIES,
  TRANSPORT_ICONS,
  OPPORTUNITY_TIMEFRAMES,
} from 'src/constants';
import Select from 'src/components/Select';
import ButtonGroup from 'src/components/ButtonGroup';

interface ReachabilityControlsProps {
  transport?: string[];
  timeframe?: number;
  opportunity?: string;
  cityDisabled?: boolean;
  onMediumChange?: (medium: string) => void;
  onTimeStepChange?: (timeStep: number) => void;
  onOpportunityChange?: (opportunity: string) => void;
}

function ReachabilityControls({
  transport,
  timeframe,
  opportunity,
  cityDisabled,
  onMediumChange,
  onTimeStepChange,
  onOpportunityChange,
}: ReachabilityControlsProps) {
  return (
    <>
      <Select
        value={
          opportunity &&
          OPPORTUNITIES[opportunity as keyof typeof OPPORTUNITIES]
        }
        disabled={cityDisabled}
        options={Object.keys(OPPORTUNITIES).map((op) => ({
          label: OPPORTUNITIES[op as keyof typeof OPPORTUNITIES],
          value: op,
        }))}
        onChange={onOpportunityChange}
        placeholder="Selecciona una oportunidad"
      />
      <div className="m-2 md:m-4" />
      <ButtonGroup
        options={TRANSPORTS.map((mdm) => ({
          icon: TRANSPORT_ICONS[mdm],
          disabled: cityDisabled,
          color: TRANSPORT_COLORS[mdm],
          active: transport?.includes(mdm) ?? false,
          onClick: () => onMediumChange?.(mdm),
        }))}
      />
      <div className="m-2 md:m-4" />
      <ButtonGroup
        options={OPPORTUNITY_TIMEFRAMES.map((step) => ({
          label: `${step} min`,
          onClick: () => onTimeStepChange?.(step),
          disabled: cityDisabled,
          active: timeframe === step,
        }))}
      />
      <div className="m-2 md:m-4" />
    </>
  );
}

export default ReachabilityControls;
