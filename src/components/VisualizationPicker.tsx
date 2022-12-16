import React from 'react';
import { useMapParams } from 'src/context/mapParams';
import useCurrentCity from 'src/hooks/data/useCurrentCity';
import useCurrentVisualization from 'src/hooks/data/useCurrentVisualization';
import { Select, Radio, Space } from 'antd';
import type { RadioChangeEvent } from 'antd';

function VisualizationPicker() {
  const { onVisualizationChange, current } = useMapParams();
  const getCurrentCity = useCurrentCity();
  const currentCity = getCurrentCity(current);
  const visualizations = currentCity?.visualizations;
  const getCurrentVisualization = useCurrentVisualization();
  const currentVisualization = getCurrentVisualization(current);
  const isDisabled = !currentCity;

  if (currentCity?.visualizationSelectorType === 'radio') {
    return (
      <Radio.Group
        onChange={(e: RadioChangeEvent) => {
          if (current.cityCode) {
            onVisualizationChange?.(current.cityCode, e.target.value);
          }
        }}
        value={currentVisualization?.code}
      >
        <Space direction="vertical">
          {visualizations?.map((viz) => (
            <Radio value={viz?.code}>{viz?.name}</Radio>
          ))}
        </Space>
      </Radio.Group>
    );
  }

  return (
    <Select
      defaultValue={currentVisualization?.name}
      value={currentVisualization?.name}
      onChange={(nextViz) => {
        if (current.cityCode) {
          onVisualizationChange?.(current.cityCode, nextViz);
        }
      }}
      options={
        visualizations?.map((viz) => ({
          label: viz.name,
          value: viz.code,
        })) || []
      }
      placeholder="Selecciona una visualización"
      disabled={isDisabled}
      style={{ width: '100%' }}
    />
  );
}

export default VisualizationPicker;
