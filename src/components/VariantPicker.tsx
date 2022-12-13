import React from 'react';
import { useMapParams } from 'src/context/mapParams';
import useCurrentVisualization from 'src/hooks/data/useCurrentVisualization';
import useCurrentVisualizationVariant from 'src/hooks/data/useCurrentVisualizationVariant';
import Select from './Select';

function VariantPicker() {
  const {
    onVariantChange,
    state: { cityCode, visualizationCode },
  } = useMapParams();
  const currentVisualization = useCurrentVisualization();
  const variants = currentVisualization?.variants;
  const currentVisualizationVariant = useCurrentVisualizationVariant();
  const isDisabled = !cityCode;

  return (
    <Select
      label="Escenario"
      disabled={isDisabled}
      value={currentVisualizationVariant?.name}
      options={
        variants?.map((variant) => ({
          label: variant.name,
          value: variant.code,
        })) ?? []
      }
      onChange={(nextVariant) => {
        if (cityCode && visualizationCode) {
          onVariantChange?.(cityCode, visualizationCode, nextVariant);
        }
      }}
      placeholder="Selecciona un escenario"
    />
  );
}

export default VariantPicker;
