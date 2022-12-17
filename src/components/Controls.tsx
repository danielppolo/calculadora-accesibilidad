import React, { memo } from 'react';
import { useMapParams } from 'src/context/mapParams';
import useCurrentCity from 'src/hooks/data/useCurrentCity';
import useCurrentVisualization from 'src/hooks/data/useCurrentVisualization';
import CityPicker from './CityPicker';
import VisualizationPicker from './VisualizationPicker';
import VariantPicker from './VariantPicker';
import FilterPicker from './FilterPicker';

function Controls() {
  const getCurrentCity = useCurrentCity();
  const getCurrentVisualization = useCurrentVisualization();
  const { current } = useMapParams();
  const currentCity = getCurrentCity(current);
  const currentVisualization = getCurrentVisualization(current);
  const showVisualizationPicker = currentCity?.visualizations?.length;
  const showVariantPicker = (currentVisualization?.variants?.length ?? 0) > 1;

  return (
    <>
      {currentCity ? <CityPicker /> : null}

      {showVisualizationPicker ? (
        <>
          <div className="m-2 md:m-4" />
          <VisualizationPicker />
        </>
      ) : null}

      {showVariantPicker && (
        <>
          <div className="m-2 md:m-4" />
          <VariantPicker />
        </>
      )}

      {currentVisualization?.filters?.map((filter) => (
        <FilterPicker filter={filter} key={filter.code} />
      ))}

      <div className="m-2 md:m-4" />
    </>
  );
}

export default memo(Controls);
