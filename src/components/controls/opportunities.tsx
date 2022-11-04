import React from 'react';
import { OPPORTUNITIES } from 'src/constants';
import Select from 'src/components/Select';

interface OpportunityControlsProps {
  opportunity?: string;
  cityDisabled?: boolean;
  onOpportunityChange?: (opportunity: string) => void;
}

function OpportunityControls({
  opportunity,
  cityDisabled,
  onOpportunityChange,
}: OpportunityControlsProps) {
  return (
    <Select
      value={
        opportunity && OPPORTUNITIES[opportunity as keyof typeof OPPORTUNITIES]
      }
      disabled={cityDisabled}
      options={Object.keys(OPPORTUNITIES).map((op) => ({
        label: OPPORTUNITIES[op as keyof typeof OPPORTUNITIES],
        value: op,
      }))}
      onChange={onOpportunityChange}
      placeholder="Selecciona una oportunidad"
    />
  );
}

export default OpportunityControls;
