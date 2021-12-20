import React from 'react';
import PropTypes from 'prop-types';
import LayerSwitch from './LayerSwitch';

function LayerControls({
  economicLayer,
  onEconomicLayerChange,
}) {
  return (
    <div className="fixed bottom-4 left-4">
      <LayerSwitch
        title="Capa de marginación"
        onChange={onEconomicLayerChange}
        checked={economicLayer}
      />
    </div>
  );
}

LayerControls.propTypes = {
  economicLayer: PropTypes.bool.isRequired,
  onEconomicLayerChange: PropTypes.func.isRequired,
};

export default LayerControls;
