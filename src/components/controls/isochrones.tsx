import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@mui/material';
import {
  TRANSPORTS,
  TIMEFRAMES,
  TRANSPORT_COLORS,
  TRANSPORT_ICONS,
} from '../../constants';
import ButtonGroup from '../ButtonGroup';

function IsochronesControls({
  transport,
  onMediumChange,
  timeframe,
  onTimeStepChange,
  hexagonDisabled,
}) {
  return (
    <>
      <Tooltip
        title={
          !hexagonDisabled && transport.length === 1 ? 'Selecciona dos o más modos de transporte para comparar' : 'Selecciona un hexágono para habilitar transporte'
        }
        placement="right"
        open={hexagonDisabled || (!hexagonDisabled && transport.length === 1)}
        disableTouchListener
      >
        <div>
          <ButtonGroup
            options={TRANSPORTS.map((mdm) => ({
              icon: TRANSPORT_ICONS[mdm],
              onClick: () => onMediumChange(mdm),
              disabled: hexagonDisabled,
              color: TRANSPORT_COLORS[mdm],
              active: transport.includes(mdm),
            }))}
          />
        </div>
      </Tooltip>
      <div className="m-2 md:m-4" />
      <Tooltip
        title="Selecciona el tiempo de traslado"
        placement="right"
        disableTouchListener
      >
        <div>
          <ButtonGroup
            options={TIMEFRAMES.map((step) => ({
              label: `${step} min`,
              onClick: () => onTimeStepChange(step),
              disabled: hexagonDisabled,
              active: timeframe === step,
            }))}
          />
        </div>
      </Tooltip>
      <div className="m-2 md:m-4" />
    </>
  );
}

IsochronesControls.propTypes = {
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

export default IsochronesControls;
