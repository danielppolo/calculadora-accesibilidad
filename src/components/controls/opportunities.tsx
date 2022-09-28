import React from 'react';
import PropTypes from 'prop-types';
import {
  OPPORTUNITIES,
} from '../../constants';
import Select from '../Select';

function OpportunityControls({
  opportunity,
  onOpportunityChange,
  cityDisabled,
}) {
  return (
    <Select
      id="opportunity"
      label="Selecciona una oportunidad"
      value={OPPORTUNITIES[opportunity]}
      disabled={cityDisabled}
      options={Object.keys(OPPORTUNITIES).map((op) => ({
        label: OPPORTUNITIES[op],
        value: op,
      }))}
      onChange={onOpportunityChange}
      placeholder="Selecciona una oportunidad"
    />
  );
}

OpportunityControls.propTypes = {
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

export default OpportunityControls;
