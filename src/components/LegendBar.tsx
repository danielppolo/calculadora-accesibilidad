import React from 'react';
import Legend from 'src/components/Legend';
import { useMapboxLayerManager } from 'src/context/mapboxLayerManager';
import { useMapboxTilesetManager } from 'src/context/mapboxTilesetManager';
import { useMapParams } from 'src/context/mapParams';

function LegendBar() {
  const { current } = useMapParams();
  const { legend } = useMapboxLayerManager();
  const { legends = {}, state = {} } = useMapboxTilesetManager();

  if (!current.cityCode) {
    return null;
  }

  return (
    <div>
      {legend?.title && legend.scales && (
        <Legend title={legend?.title} scales={legend?.scales} />
      )}

      {Object.keys(state)
        .filter((key) => state[key])
        .map((key) => (
          <div key={key}>
            <div className="mx-0 my-4" />
            <Legend title={legends[key].title} scales={legends[key].scales} />
          </div>
        ))}
    </div>
  );
}

export default LegendBar;
