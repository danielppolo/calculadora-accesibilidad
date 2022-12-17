import LayerSwitch from 'src/components/LayerSwitch';
import React from 'react';
import { useMapParams } from 'src/context/mapParams';

function GlobalControls() {
  const { onReset, current } = useMapParams();

  return (
    <div className="fixed z-20 bottom-4 left-[26rem]">
      <div className="flex justify-between gap-4">
        <LayerSwitch
          disabled={!current.cityCode}
          title="Regresar"
          onChange={() => onReset({ flyToOrigin: true })}
        >
          <span className="material-symbols-outlined">zoom_out_map</span>
        </LayerSwitch>
      </div>
    </div>
  );
}

export default GlobalControls;
