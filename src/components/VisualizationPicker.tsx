import React from 'react';
import { Visualization } from 'src/types';
import Select from './Select';

interface VisualizationPickerProps {
  visualizations?: Visualization[];
  value?: string;
  disabled?: boolean;
  onChange?: (city: string) => void;
}

function VisualizationPicker({
  visualizations,
  value,
  disabled,
  onChange,
}: VisualizationPickerProps) {
  return (
    <Select
      label="Mapa"
      value={value}
      options={
        visualizations?.map((viz) => ({
          label: viz.name,
          value: viz.code,
        })) || []
      }
      onChange={onChange}
      disabled={disabled}
      placeholder="Selecciona una visualización"
    />
  );
}

export default VisualizationPicker;
