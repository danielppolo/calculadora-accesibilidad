import React from 'react';
import { VisualizationVariant } from 'src/types';
import Select from './Select';

interface VariantPickerProps {
    variants?: VisualizationVariant[];
    value?: string;
    disabled?: boolean;
    onChange?: (city: string) => void;
}

function VariantPicker({
  variants = [],
  value,
  disabled,
  onChange,
}: VariantPickerProps) {
  if (variants?.length <= 1) {
    return null;
  }

  return (
    <Select
      disabled={disabled}
      value={value}
      options={variants.map((variant) => ({
        label: variant.name,
        value: variant.code,
      }))}
      onChange={onChange}
      placeholder="Selecciona un escenario"
    />
  );
}

export default VariantPicker;
