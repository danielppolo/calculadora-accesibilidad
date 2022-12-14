import React from 'react';
import { useMapParams } from 'src/context/mapParams';
import useCurrentCity from 'src/hooks/data/useCurrentCity';
import useCurrentVisualization from 'src/hooks/data/useCurrentVisualization';
import Select from './Select';

function VisualizationPicker() {
  const { onVisualizationChange, current } = useMapParams();
  const getCurrentCity = useCurrentCity();
  const currentCity = getCurrentCity(current);
  const visualizations = currentCity?.visualizations;
  const getCurrentVisualization = useCurrentVisualization();
  const currentVisualization = getCurrentVisualization(current);
  const isDisabled = !currentCity;

  return (
    <Select
      label="Mapa"
      value={currentVisualization?.name}
      options={
        visualizations?.map((viz) => ({
          label: viz.name,
          value: viz.code,
        })) || []
      }
      onChange={(nextViz) => {
        if (current.cityCode) {
          onVisualizationChange?.(current.cityCode, nextViz);
        }
      }}
      disabled={isDisabled}
      placeholder="Selecciona una visualización"
    />
  );
}

export default VisualizationPicker;
