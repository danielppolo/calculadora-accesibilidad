import LayerSwitch from 'src/components/LayerSwitch';
import React from 'react';
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import DirectionsIcon from '@mui/icons-material/Directions';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
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
          <GppMaybeOutlinedIcon />
        </LayerSwitch>
        <LayerSwitch
          key="Density"
          disabled={!current.cityCode}
          title="Mostar densidad"
          onChange={densityLayer.toggle}
          active={densityLayer.isActive}
        >
          <AccessibilityNewIcon />
        </LayerSwitch>
        <LayerSwitch
          key="Roads"
          disabled={!current.cityCode}
          title="Mostar red vial"
          onChange={roadLayer.toggle}
          active={roadLayer.isActive}
        >
          <DirectionsIcon />
        </LayerSwitch>
        <LayerSwitch
          disabled={!current.cityCode}
          title="Regresar"
          onChange={() => onReset({ flyToOrigin: true })}
        >
          <RestartAltIcon />
        </LayerSwitch>
      </div>
    </div>
  );
}

export default GlobalControls;
