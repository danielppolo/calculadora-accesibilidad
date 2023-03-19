import React, { useMemo } from 'react';
import { useMapParams } from 'src/context/mapParams';
import useCurrentCity from 'src/hooks/data/useCurrentCity';
import useCurrentVisualization from 'src/hooks/data/useCurrentVisualization';
import { Select } from 'antd';
import { Visualization } from 'src/types';
import { useIntl } from 'react-intl';

function VisualizationPicker() {
  const intl = useIntl();
  const { onVisualizationChange, current } = useMapParams();
  const getCurrentCity = useCurrentCity();
  const currentCity = getCurrentCity(current);
  const visualizations = currentCity?.visualizations.filter(
    (visualization) => visualization.active
  );
  const getCurrentVisualization = useCurrentVisualization();
  const currentVisualization = getCurrentVisualization(current);
  const isDisabled = !currentCity;

  const options = useMemo(() => {
    const otherKey = intl.formatMessage({
      defaultMessage: 'Otros',
      id: 'Wdu5tQ',
    });
    const groups =
      visualizations?.reduce((acc: Record<string, Visualization[]>, viz) => {
        const { visualizationGroup } = viz;
        const type = visualizationGroup?.name;
        if (type) {
          if (acc[type]) {
            acc[type] = [...acc[type], viz];
          } else {
            acc[type] = [viz];
          }
        } else if (acc[otherKey]) {
          acc[otherKey] = [...acc[otherKey], viz];
        } else {
          acc[otherKey] = [viz];
        }
        return acc;
      }, {}) ?? {};

    return Object.entries(groups)
      .map(([label, visualizationOptions]) => ({
        label,
        options: visualizationOptions.map((viz) => ({
          label: viz?.metadata?.name ?? '',
          value: viz.code,
          title: viz?.metadata?.shortDescription ?? viz?.metadata?.name ?? '',
        })),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [intl, visualizations]);

  if (isDisabled) {
    return null;
  }

  return (
    <Select
      size="large"
      defaultValue={currentVisualization?.metadata?.name ?? ''}
      value={currentVisualization?.metadata?.name ?? ''}
      onChange={(nextViz) => {
        if (current.cityCode) {
          onVisualizationChange?.({
            cityCode: current.cityCode,
            visualizationCode: nextViz,
          });
        }
      }}
      options={options}
      placeholder={intl.formatMessage({
        defaultMessage: 'Selecciona una visualización',
        id: 'KF4v6o',
      })}
      disabled={isDisabled}
      style={{ width: '100%' }}
    />
  );
}

export default VisualizationPicker;
