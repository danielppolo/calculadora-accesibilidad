import React from 'react';
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
import { City } from 'src/types';
import CityPicker from './CityPicker';
import VisualizationPicker from './VisualizationPicker';
import VariantPicker from './VariantPicker';

interface MapControlsProps {
  cityCode?: string,
  visualizationCode?: string,
  variantCode?: string,

  visualization?: string;
  transport?: string[];
  timeframe?: number;
  opportunity?: string;
  hexagonDisabled?: boolean;
  city?: City;
  cities?: City[],
  scenario?: string;
  economicLayer?: boolean;
  densityLayer?: boolean;
  roadsLayer?: boolean;
  onDensityLayerChange?: () => void;
  onVisualizationChange?: (viz: string) => void;
  onMediumChange?: (medium: string) => void;
  onTimeStepChange?: (timeStep: number) => void;
  onScenarioChange?: (scenario: string) => void;
  onOpportunityChange?: (opportunity: string) => void;
  onCityChange?: (city: string) => void;
  onEconomicLayerChange?: () => void;
  onRoadsLayerChange?: () => void;
  resetMap?: () => void;
}

function MapControls({
  cityCode,
  visualizationCode,
  variantCode,

  visualization,
  timeframe,
  transport,
  opportunity,
  hexagonDisabled = false,
  city,
  cities,
  scenario,
  economicLayer,
  densityLayer,
  roadsLayer,
  onCityChange,
  onEconomicLayerChange,
  onDensityLayerChange,
  onVisualizationChange,
  onMediumChange,
  onTimeStepChange,
  onScenarioChange,
  onOpportunityChange,
  onRoadsLayerChange,
  resetMap,
}: MapControlsProps) {
  const selectedViz = city?.visualizations.find((viz) => viz.code === visualizationCode);
  const selectedVariant = selectedViz?.variants.find((variant) => variant.code === variantCode);
  const showVisualizationPicker = city?.visualizations?.length;
  const showVariantPicker = selectedViz?.variants?.length;

  return (
    <div className="fixed top-2 left-2 right-2 z-30 md:top-4 md:left-4 md:w-80 md:max-w-xl">
      <CityPicker
        cities={cities}
        value={city?.name}
        onChange={onCityChange}
      />
      {
        showVisualizationPicker ? (
          <>
            <div className="m-2 md:m-4" />
            <VisualizationPicker
              visualizations={city.visualizations}
              disabled={!city}
              value={selectedViz?.name}
              onChange={onScenarioChange}
            />
          </>
        ) : null
      }
      {
        showVariantPicker && (
          <>
            <div className="m-2 md:m-4" />
            <VariantPicker
              variants={selectedViz?.variants}
              disabled={!city}
              value={selectedVariant?.name}
              onChange={onVisualizationChange}
            />
          </>
        )
      }
      <div className="m-2 md:m-4" />
      {
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
      }
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
        <LayerSwitch
          disabled={!city}
          title="Regresar"
          onChange={resetMap}
        >
          <RestartAltIcon />
        </LayerSwitch>
      </div>
      <div className="text-black text-blue text-red text-aqua text-green text-yellow text-purple text-pink text-orange hidden" />
    </div>
  );
}

export default MapControls;
