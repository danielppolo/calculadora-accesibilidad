import React, { memo } from 'react';
import Select from 'src/components/Select';
import OpportunityControls from 'src/components/controls/opportunities';
import ReachabilityControls from 'src/components/controls/reachability';
import IsochronesControls from 'src/components/controls/isochrones';
import { City, Property } from 'src/types';
import { useRouter } from 'next/router';
import { useMapParams } from 'src/context/mapParams';
import useCurrentCity from 'src/hooks/data/useCurrentCity';
import useCurrentVisualization from 'src/hooks/data/useCurrentVisualization';
import CityPicker from './CityPicker';
import VisualizationPicker from './VisualizationPicker';
import VariantPicker from './VariantPicker';
import ButtonGroup from './ButtonGroup';
import FilterPicker from './FilterPicker';

function Controls() {
  const getCurrentCity = useCurrentCity();
  const getCurrentVisualization = useCurrentVisualization();
  const { onFiltersChange, current } = useMapParams();
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
      {/* {
        visualization === 'opportunities' && (
          <OpportunityControls
            opportunity={opportunity}
            onOpportunityChange={onOpportunityChange}
            cityDisabled={!city}
          />
        )
      }
      {
        visualization === 'reachability' && (
          <ReachabilityControls
            transport={transport}
            onMediumChange={onMediumChange}
            timeframe={timeframe}
            opportunity={opportunity}
            onTimeStepChange={onTimeStepChange}
            onOpportunityChange={onOpportunityChange}
            cityDisabled={!city}
          />
        )
      }
      {
        visualization === 'isochrones' && (
          <IsochronesControls
            transport={transport}
            onMediumChange={onMediumChange}
            timeframe={timeframe}
            onTimeStepChange={onTimeStepChange}
            hexagonDisabled={hexagonDisabled}
          />
        )
      } */}
      <div className="m-2 md:m-4" />
    </>
  );
}

export default memo(Controls);
