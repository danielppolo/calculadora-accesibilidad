import React from 'react';
import Legend from 'src/components/Legend';
import { useMapboxLayerManager } from 'src/context/mapboxLayerManager';
import { useMapboxTilesetManager } from 'src/context/mapboxTilesetManager';
import { useMapParams } from 'src/context/mapParams';

function LegendBar() {
  const { current } = useMapParams();
  const { legend } = useMapboxLayerManager();
  const { legends = {}, state = {} } = useMapboxTilesetManager();

  if (!current.cityCode || !legend?.title || !legend?.intervals) {
    return null;
  }

  return (
    <div>
      <Legend title={legend?.title} items={legend?.intervals} />
      {Object.keys(state)
        .filter((key) => state[key])
        .map((key) => (
          <div key={key}>
            <div className="mx-0 my-4" />
            <Legend title={legends[key].title} items={legends[key].intervals} />
          </div>
        ))}
    </div>
  );
}

export default LegendBar;
