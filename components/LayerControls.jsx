import React from 'react';
import LayerSwitch from './LayerSwitch';

function LayerControls({
  economicTiles,
  onEconomicTilesChange,
}) {
  return (
    <div>
      <LayerSwitch
        title="Usos de suelo urbano"
      />
    </div>
  );
}

export default LayerControls;
