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
import CityPicker from '../CityPicker';
import VisualizationPicker from '../VisualizationPicker';
import VariantPicker from '../VariantPicker';
import ButtonGroup from '../ButtonGroup';

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

function Controls({
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
}: ControlsProps) {
  const router = useRouter();
  const { state } = useMapParams();
  const selectedViz = city?.visualizations.find(
    (viz) => viz.code === state.visualizationCode
  );
  const selectedVariant = selectedViz?.variants.find(
    (variant) => variant.code === state.variantCode
  );
  const showVisualizationPicker = city?.visualizations?.length;
  const showVariantPicker = selectedViz?.variants?.length;

  return (
    <>
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
      {selectedViz?.filters?.map((filter) => (
        <>
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
    </>
  );
}

export default Controls;
