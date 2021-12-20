import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@mui/material';
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import {
  TRANSPORTS,
  TIMEFRAMES,
  TRANSPORT_COLORS,
  OPPORTUNITIES,
  TRANSPORT_ICONS,
} from '../constants';
import Select from './Select';
import ButtonGroup from './ButtonGroup';
import LayerSwitch from './LayerSwitch';

function MapControls({
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
        city && city.scenarios.length > 1 ?(<>
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
          </>) : null
      }
      <div className="m-2 md:m-4" />
      <Select
        value={OPPORTUNITIES[opportunity]}
        disabled={cityDisabled}
        options={Object.keys(OPPORTUNITIES).map((op) => ({
          label: OPPORTUNITIES[op],
          value: op,
        }))}
        onChange={onOpportunityChange}
        placeholder="Selecciona una oportunidad"
      />
      <div className="m-2 md:m-4" />
      {/* <Tooltip
        title="Da click sobre un hexágono"
        placement="right"
        open={!cityDisabled && hexagonDisabled}
        disableTouchListener
        classes="hidden opacity-0"
      > */}
      <div>
        <ButtonGroup
          options={TRANSPORTS.map((mdm) => ({
            icon: TRANSPORT_ICONS[mdm],
            // label: TRANSPORT_TRANSLATIONS[mdm],
            onClick: () => onMediumChange(mdm),
            disabled: hexagonDisabled,
            color: TRANSPORT_COLORS[mdm],
            active: transport.includes(mdm),
          }))}
        />
      </div>
      {/* </Tooltip> */}
      <div className="m-2 md:m-4" />
      <ButtonGroup
        options={TIMEFRAMES.map((step) => ({
          label: `${step} min`,
          onClick: () => onTimeStepChange(step),
          disabled: hexagonDisabled,
          active: timeframe === step,
        }))}
      />
      <div className="m-2 md:m-4" />
      <LayerSwitch
        title="Mostar marginación"
        onChange={onEconomicLayerChange}
        active={economicLayer}
      >
        <GppMaybeOutlinedIcon />
      </LayerSwitch>
      <div className="m-2 md:m-4" />
      <LayerSwitch
        title="Visualizar México"
        onChange={resetMap}
      >
        <MapOutlinedIcon />
      </LayerSwitch>
      <div className="text-black text-blue text-red text-green text-yellow text-purple text-pink text-orange hidden" />
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
  resetMap: PropTypes.func.isRequired,
};

export default MapControls;
