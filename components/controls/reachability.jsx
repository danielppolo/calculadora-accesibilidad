import React from 'react';
import PropTypes from 'prop-types';
import {
  TRANSPORTS,
  TRANSPORT_COLORS,
  OPPORTUNITIES,
  TRANSPORT_ICONS,
  OPPORTUNITY_TIMEFRAMES,
} from '../../constants';
import Select from '../Select';
import ButtonGroup from '../ButtonGroup';

function ReachabilityControls({
  transport,
  onMediumChange,
  timeframe,
  opportunity,
  onTimeStepChange,
  onOpportunityChange,
  cityDisabled,
}) {
  return (
    <>
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
      <ButtonGroup
        options={TRANSPORTS.map((mdm) => ({
          icon: TRANSPORT_ICONS[mdm],
          disabled: cityDisabled,
          color: TRANSPORT_COLORS[mdm],
          active: transport.includes(mdm),
          onClick: () => onMediumChange(mdm),
        }))}
      />
      <div className="m-2 md:m-4" />
      <ButtonGroup
        options={OPPORTUNITY_TIMEFRAMES.map((step) => ({
          label: `${step} min`,
          onClick: () => onTimeStepChange(step),
          disabled: cityDisabled,
          active: timeframe === step,
        }))}
      />
      <div className="m-2 md:m-4" />
    </>
  );
}

ReachabilityControls.propTypes = {
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

export default ReachabilityControls;
