import React, { useMemo } from 'react';
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import DirectionsIcon from '@mui/icons-material/Directions';
import { VISUALIZATIONS } from 'src/constants';
import Select from 'src/components/Select';
import LayerSwitch from 'src/components/LayerSwitch';
import OpportunityControls from 'src/components/controls/opportunities';
import ReachabilityControls from 'src/components/controls/reachability';
import IsochronesControls from 'src/components/controls/isochrones';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { City, Property } from 'src/types';
import CityPicker from './CityPicker';
import VisualizationPicker from './VisualizationPicker';
import VariantPicker from './VariantPicker';
import ButtonGroup from './ButtonGroup';

interface MapControlsProps {
  cityCode?: string;
  visualizationCode?: string;
  variantCode?: string;
  filterData?: any;
  onCityChange?: (cityCode: string) => void;
  onVariantChange?: (variantCode: string) => void;
  onVisualizationChange?: (visualizationCode: string) => void;

  visualization?: string;
  transport?: string[];
  timeframe?: number;
  opportunity?: string;
  hexagonDisabled?: boolean;
  city?: City;
  cities?: City[];
  economicLayer?: boolean;
  densityLayer?: boolean;
  roadsLayer?: boolean;
  onDensityLayerChange?: () => void;
  onMediumChange?: (medium: string) => void;
  onTimeStepChange?: (timeStep: number) => void;
  onOpportunityChange?: (opportunity: string) => void;
  onEconomicLayerChange?: () => void;
  onRoadsLayerChange?: () => void;
  resetMap?: () => void;
}

const buildFilters = (
  filterData: Record<string, any>,
  properties: Record<string, Property>
) => {
  // TODO: Refactor
  const firstLevelKeys = Object.keys(filterData);
  const secondLevelKeys = Object.keys(filterData[firstLevelKeys[0]]);
  const thirdLevelKeys = Object.keys(
    filterData[firstLevelKeys[0]][secondLevelKeys[0]]
  );

  return [
    firstLevelKeys.map((key) => properties[key]).filter(Boolean),
    secondLevelKeys.map((key) => properties[key]).filter(Boolean),
    thirdLevelKeys.map((key) => properties[key]).filter(Boolean),
  ];
};

function MapControls({
  cityCode,
  visualizationCode,
  variantCode,
  filterData,

  visualization,
  timeframe,
  transport,
  opportunity,
  hexagonDisabled = false,
  city,
  cities,
  economicLayer,
  densityLayer,
  roadsLayer,
  onCityChange,
  onEconomicLayerChange,
  onDensityLayerChange,
  onVisualizationChange,
  onMediumChange,
  onTimeStepChange,
  onVariantChange,
  onOpportunityChange,
  onRoadsLayerChange,
  resetMap,
}: MapControlsProps) {
  const selectedViz = city?.visualizations.find(
    (viz) => viz.code === visualizationCode
  );
  const selectedVariant = selectedViz?.variants.find(
    (variant) => variant.code === variantCode
  );
  const showVisualizationPicker = city?.visualizations?.length;
  const showVariantPicker = selectedViz?.variants?.length;
  const filters = useMemo(() => {
    const properties: Record<string, Property> = {};

    if (selectedViz) {
      selectedViz.properties.forEach((property) => {
        properties[property.code] = property;
      });

      return buildFilters(filterData, properties);
    }
    return [];
  }, [filterData, selectedViz]);

  return (
    <div className="fixed top-2 left-2 right-2 p-4 z-30 backdrop-blur-2xl md:top-0 md:left-0 bottom-0 md:w-80 md:max-w-xl">
      <CityPicker cities={cities} value={city?.name} onChange={onCityChange} />
      {showVisualizationPicker ? (
        <>
          <div className="m-2 md:m-4" />
          <VisualizationPicker
            visualizations={city.visualizations}
            disabled={!city}
            value={selectedViz?.name}
            onChange={onVisualizationChange}
          />
        </>
      ) : null}
      {showVariantPicker && (
        <>
          <div className="m-2 md:m-4" />
          <VariantPicker
            variants={selectedViz?.variants}
            disabled={!city}
            value={selectedVariant?.name}
            onChange={onVariantChange}
          />
        </>
      )}
      <div className="mb-6" />
      {filters.map((filter) => (
        <>
          <ButtonGroup
            options={filter.map((option) => ({
              label: option.name,
              value: option.code,
              active: true,
              onClick: () => undefined,
            }))}
          />
          <div className="mb-6" />
        </>
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
      <div className="flex justify-between">
        <LayerSwitch
          disabled={!city}
          title="Mostar marginación"
          onChange={onEconomicLayerChange}
          active={economicLayer}
        >
          <GppMaybeOutlinedIcon />
        </LayerSwitch>
        <LayerSwitch
          disabled={!city}
          title="Mostar densidad"
          onChange={onDensityLayerChange}
          active={densityLayer}
        >
          <AccessibilityNewIcon />
        </LayerSwitch>
        <LayerSwitch
          disabled={!city}
          title="Mostar red vial"
          onChange={onRoadsLayerChange}
          active={roadsLayer}
        >
          <DirectionsIcon />
        </LayerSwitch>
        <LayerSwitch disabled={!city} title="Regresar" onChange={resetMap}>
          <RestartAltIcon />
        </LayerSwitch>
      </div>
      <div className="text-black text-blue text-red text-aqua text-green text-yellow text-purple text-pink text-orange hidden" />
    </div>
  );
}

export default MapControls;
