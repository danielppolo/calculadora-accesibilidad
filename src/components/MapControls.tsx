import React from 'react';
import PropTypes from 'prop-types';
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import DirectionsIcon from '@mui/icons-material/Directions';
import { VISUALIZATIONS } from '../constants';
import Select from './Select';
import LayerSwitch from './LayerSwitch';
import OpportunityControls from './controls/opportunities';
import ReachabilityControls from './controls/reachability';
import IsochronesControls from './controls/isochrones';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
function MapControls({
  visualization,
  onVisualizationChange,
  transport,
  onMediumChange,
  timeframe,
  opportunity,
  onTimeStepChange,
  onScenarioChange,
  onOpportunityChange,
  cityDisabled,
  hexagonDisabled,
  city,
  onCityChange,
  cities,
  scenario,
  economicLayer,
  onEconomicLayerChange,
  densityLayer,
  onDensityLayerChange,
  roadsLayer,
  onRoadsLayerChange,
  resetMap,
}) {
  const selectedScenario = city && city.scenarios.find((sc) => sc.fields.bucketName === scenario);
  return (
    <div className="fixed top-2 left-2 right-2 z-30 md:top-4 md:left-4 md:w-80 md:max-w-xl">
      <Select
        value={city && city.name}
        options={cities.sort((a, b) => a.name.localeCompare(b.name)).map((ct) => ({
          label: ct.name,
          value: ct.bucketName,
        }))}
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
        value={VISUALIZATIONS[visualization]}
        options={Object.keys(VISUALIZATIONS).map((key) => ({
          label: VISUALIZATIONS[key],
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
        visualization === 'isocrones' && (
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

MapControls.propTypes = {
  transport: PropTypes.array.isRequired,
  timeframe: PropTypes.number.isRequired,
  hexagonDisabled: PropTypes.bool.isRequired,
  cityDisabled: PropTypes.bool.isRequired,
  city: PropTypes.string.isRequired,
  scenario: PropTypes.string.isRequired,
  cities: PropTypes.object.isRequired,
  onMediumChange: PropTypes.func.isRequired,
  onTimeStepChange: PropTypes.func.isRequired,
  onScenarioChange: PropTypes.func.isRequired,
  onOpportunityChange: PropTypes.func.isRequired,
  onCityChange: PropTypes.func.isRequired,
  economicLayer: PropTypes.bool.isRequired,
  onEconomicLayerChange: PropTypes.func.isRequired,
  densityLayer: PropTypes.bool.isRequired,
  onDensityLayerChange: PropTypes.func.isRequired,
  roadsLayer: PropTypes.bool.isRequired,
  onRoadsLayerChange: PropTypes.func.isRequired,
  resetMap: PropTypes.func.isRequired,
};

export default MapControls;
