import React from 'react';
import Legend from 'src/components/Legend';
import { useMapboxLayerManager } from 'src/context/mapboxLayerManager';
import { useMapParams } from 'src/context/mapParams';
import { MapboxLayerManager } from 'src/types';

interface LegendBarProps {
  economicLayer: MapboxLayerManager;
  densityLayer: MapboxLayerManager;
  roadLayer: MapboxLayerManager;
}

function LegendBar({ economicLayer, densityLayer, roadLayer }: LegendBarProps) {
  const { current } = useMapParams();
  const { legend } = useMapboxLayerManager();

  if (!current.cityCode || !legend?.title || !legend?.intervals) {
    return null;
  }

  return (
    <div>
      <Legend title={legend?.title} items={legend?.intervals} />
      {economicLayer.isActive && (
        <Legend
          title={economicLayer.legend.title}
          items={economicLayer.legend.intervals}
        />
      )}
      {densityLayer.isActive && (
        <Legend
          title={densityLayer.legend.title}
          items={densityLayer.legend.intervals}
        />
      )}
      {roadLayer.isActive && (
        <Legend
          title={roadLayer.legend.title}
          items={roadLayer.legend.intervals}
        />
      )}
    </div>
  );
}

export default LegendBar;
