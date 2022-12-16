import LayerSwitch from 'src/components/LayerSwitch';
import React from 'react';
import { useMapParams } from 'src/context/mapParams';
import { MapboxLayerManager } from 'src/types';

interface GlobalControlsProps {
  economicLayer: MapboxLayerManager;
  densityLayer: MapboxLayerManager;
  roadLayer: MapboxLayerManager;
}

function GlobalControls({
  economicLayer,
  densityLayer,
  roadLayer,
}: GlobalControlsProps) {
  const { onReset, current } = useMapParams();

  return (
    <div className="fixed z-20 bottom-4 left-[26rem]">
      <div className="flex justify-between gap-4">
        <LayerSwitch
          key="economic"
          disabled={!current.cityCode}
          title="Mostar marginación"
          onChange={economicLayer.toggle}
          active={economicLayer.isActive}
        >
          <span className="material-symbols-outlined">credit_card</span>
        </LayerSwitch>
        <LayerSwitch
          key="Density"
          disabled={!current.cityCode}
          title="Mostar densidad"
          onChange={densityLayer.toggle}
          active={densityLayer.isActive}
        >
          <span className="material-symbols-outlined">credit_card</span>
        </LayerSwitch>
        <LayerSwitch
          key="Roads"
          disabled={!current.cityCode}
          title="Mostar red vial"
          onChange={roadLayer.toggle}
          active={roadLayer.isActive}
        >
          <span className="material-symbols-outlined">credit_card</span>
        </LayerSwitch>
        <LayerSwitch
          disabled={!current.cityCode}
          title="Regresar"
          onChange={() => onReset({ flyToOrigin: true })}
        >
          <span className="material-symbols-outlined">credit_card</span>
        </LayerSwitch>
      </div>
    </div>
  );
}

export default GlobalControls;
