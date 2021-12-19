import React from 'react';
import LayerSwitch from './LayerSwitch';

function LayerControls({
  economicLayer,
  onEconomicLayerChange,
}) {
  return (
    <div className='fixed bottom-4 left-4'>
      <LayerSwitch
        title="Capa de marginación"
        onChange={onEconomicLayerChange}
        checked={economicLayer}
      />
    </div>
  );
}

export default LayerControls;
