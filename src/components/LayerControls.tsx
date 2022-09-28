import React from 'react';
import PropTypes from 'prop-types';
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import LayerSwitch from './LayerSwitch';

function LayerControls({
  economicLayer,
  onEconomicLayerChange,
}) {
  return (
    <div className="fixed left-1/2 top-4 z-30">
      <LayerSwitch
        title="Mostar marginación"
        onChange={onEconomicLayerChange}
        active={economicLayer}
      >
        <GppMaybeOutlinedIcon />
      </LayerSwitch>
    </div>
  );
}

LayerControls.propTypes = {
  economicLayer: PropTypes.bool.isRequired,
  onEconomicLayerChange: PropTypes.func.isRequired,
};

export default LayerControls;
