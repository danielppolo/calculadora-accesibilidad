import React from 'react';
import { useMapParams } from 'src/context/mapParams';
import useCurrentVisualization from 'src/hooks/data/useCurrentVisualization';
import useCurrentVariant from 'src/hooks/data/useCurrentVariant';
import Select from './Select';

function VariantPicker() {
  const { onVariantChange, current } = useMapParams();
  const getCurrentVisualization = useCurrentVisualization();
  const currentVisualization = getCurrentVisualization(current);
  const variants = currentVisualization?.variants;
  const getCurrentVariant = useCurrentVariant();
  const currentVariant = getCurrentVariant(current);
  const isDisabled = !current.cityCode;

  return (
    <Select
      label="Escenario"
      disabled={isDisabled}
      value={currentVariant?.name}
      options={
        variants?.map((variant) => ({
          label: variant.name,
          value: variant.code,
        })) ?? []
      }
      onChange={(nextVariant) => {
        if (current.cityCode && current.visualizationCode) {
          onVariantChange?.(
            current.cityCode,
            current.visualizationCode,
            nextVariant
          );
        }
      }}
      placeholder="Selecciona un escenario"
    />
  );
}

export default VariantPicker;
