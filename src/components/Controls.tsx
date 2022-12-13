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
import { useRouter } from 'next/router';
import { useMapParams } from 'src/context/mapParams';
import useCurrentCity from 'src/hooks/data/useCurrentCity';
import useCurrentVisualization from 'src/hooks/data/useCurrentVisualization';
import CityPicker from './CityPicker';
import VisualizationPicker from './VisualizationPicker';
import VariantPicker from './VariantPicker';
import ButtonGroup from './ButtonGroup';

interface ControlsProps {
  filterData?: any;
  onCityChange?: (cityCode: string) => void;
  onVariantChange?: (variantCode: string) => void;
  onVisualizationChange?: (visualizationCode: string) => void;

  visualization?: string;
  transport?: string[];
  timeframe?: number;
  opportunity?: string;
  hexagonDisabled?: boolean;
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

function Controls({
  filterData,

  visualization,
  timeframe,
  transport,
  opportunity,
  hexagonDisabled = false,
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
}: ControlsProps) {
  const router = useRouter();
  const currentCity = useCurrentCity();
  const currentVisualization = useCurrentVisualization();
  const showVisualizationPicker = currentCity?.visualizations?.length;
  const showVariantPicker = currentVisualization?.variants?.length;

  return (
    <>
      <CityPicker />
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
        <div key={filter.code}>
          <div className="m-2 md:m-4" />
          <Select
            label={filter.name}
            // disabled={disabled}
            value={filter.defaultProperty.name}
            options={filter.properties.map((option) => ({
              label: option.name,
              value: option.code,
            }))}
            onChange={(value) =>
              router.push(router, {
                query: {
                  ...router.query,
                  [filter.code]: value,
                },
              })
            }
            placeholder="Selecciona un escenario"
          />
        </div>
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
          key="economic"
          disabled={!currentCity}
          title="Mostar marginación"
          onChange={onEconomicLayerChange}
          active={economicLayer}
        >
          <GppMaybeOutlinedIcon />
        </LayerSwitch>
        <LayerSwitch
          key="Density"
          disabled={!currentCity}
          title="Mostar densidad"
          onChange={onDensityLayerChange}
          active={densityLayer}
        >
          <AccessibilityNewIcon />
        </LayerSwitch>
        <LayerSwitch
          key="Roads"
          disabled={!currentCity}
          title="Mostar red vial"
          onChange={onRoadsLayerChange}
          active={roadsLayer}
        >
          <DirectionsIcon />
        </LayerSwitch>
        <LayerSwitch
          disabled={!currentCity}
          title="Regresar"
          onChange={resetMap}
        >
          <RestartAltIcon />
        </LayerSwitch>
      </div>
      <div className="text-black text-blue text-red text-aqua text-green text-yellow text-purple text-pink text-orange hidden" />
    </>
  );
}

export default Controls;
