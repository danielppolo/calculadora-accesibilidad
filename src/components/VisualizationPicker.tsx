import React from 'react';
import { useMapParams } from 'src/context/mapParams';
import useCurrentCity from 'src/hooks/data/useCurrentCity';
import useCurrentVisualization from 'src/hooks/data/useCurrentVisualization';
import { Select } from 'antd';

function VisualizationPicker() {
  const { onVisualizationChange, current } = useMapParams();
  const getCurrentCity = useCurrentCity();
  const currentCity = getCurrentCity(current);
  const visualizations = currentCity?.visualizations.filter(
    (visualization) => visualization.active
  );
  const getCurrentVisualization = useCurrentVisualization();
  const currentVisualization = getCurrentVisualization(current);
  const isDisabled = !currentCity;

  if (isDisabled) {
    return null;
  }

  return (
    <Select
      size="large"
      defaultValue={currentVisualization?.name}
      value={currentVisualization?.name}
      onChange={(nextViz) => {
        if (current.cityCode) {
          onVisualizationChange?.(current.cityCode, nextViz);
        }
      }}
      options={[
        {
          label: 'Mapas',
          options:
            visualizations?.map((viz) => ({
              label: viz.name,
              value: viz.code,
            })) ?? [],
        },
      ]}
      placeholder="Selecciona una visualización"
      disabled={isDisabled}
      style={{ width: '100%' }}
    />
  );
}

export default VisualizationPicker;
