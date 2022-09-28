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

interface MapControlsProps {
  visualization?: string;
  transport?: string[];
  timeframe?: number;
  opportunity?: string;
  cityDisabled?: boolean;
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
  visualization,
  timeframe,
  transport,
  opportunity,
  cityDisabled = false,
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
  const selectedScenario = city && city.scenarios.find((sc) => sc.fields.bucketName === scenario);
  return (
    <div className="fixed top-2 left-2 right-2 z-30 md:top-4 md:left-4 md:w-80 md:max-w-xl">
      <Select
        value={city && city.name}
        options={cities?.sort((a, b) => a.name.localeCompare(b.name)).map((ct) => ({
          label: ct.name,
          value: ct.bucketName,
        })) ?? []}
        onChange={onCityChange}
        placeholder="Selecciona una ciudad"
      />
      {
        city && city.scenarios.length > 1 ? (
          <>
            <div className="m-2 md:m-4" />
            <Select
              value={selectedScenario && selectedScenario.fields.name}
              options={city ? city.scenarios.map((sc) => ({
                label: sc.fields.name,
                value: sc.fields.bucketName,
              })) : []}
              onChange={onScenarioChange}
              disabled={cityDisabled || city.scenarios.length <= 1}
              placeholder="Selecciona un escenario"
            />
          </>
        ) : null
      }
      <div className="m-2 md:m-4" />
      <Select
        disabled={cityDisabled}
        value={VISUALIZATIONS[visualization as keyof typeof VISUALIZATIONS]}
        options={Object.keys(VISUALIZATIONS).map((key) => ({
          label: VISUALIZATIONS[key as keyof typeof VISUALIZATIONS],
          value: key,
        }))}
        onChange={onVisualizationChange}
        placeholder="Selecciona un tipo de visualización"
      />
      <div className="m-2 md:m-4" />
      {
        visualization === 'opportunities' && (
          <OpportunityControls
            opportunity={opportunity}
            onOpportunityChange={onOpportunityChange}
            cityDisabled={cityDisabled}
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
            cityDisabled={cityDisabled}
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
          disabled={cityDisabled}
          title="Mostar marginación"
          onChange={onEconomicLayerChange}
          active={economicLayer}
        >
          <GppMaybeOutlinedIcon />
        </LayerSwitch>
        <LayerSwitch
          disabled={cityDisabled}
          title="Mostar densidad"
          onChange={onDensityLayerChange}
          active={densityLayer}
        >
          <AccessibilityNewIcon />
        </LayerSwitch>
        <LayerSwitch
          disabled={cityDisabled}
          title="Mostar red vial"
          onChange={onRoadsLayerChange}
          active={roadsLayer}
        >
          <DirectionsIcon />
        </LayerSwitch>
        <LayerSwitch
          disabled={cityDisabled}
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
