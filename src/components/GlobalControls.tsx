import LayerSwitch from 'src/components/LayerSwitch';
import React from 'react';
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import DirectionsIcon from '@mui/icons-material/Directions';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import useCurrentCity from 'src/hooks/data/useCurrentCity';
import { useMapParams } from 'src/context/mapParams';

function GlobalControls() {
  const { onReset, current } = useMapParams();
  const getCurrentCity = useCurrentCity();
  const currentCity = getCurrentCity(current);
  return (
    <div className="fixed bottom-4 left-[21rem]">
      <div className="flex justify-between gap-4">
        <LayerSwitch
          key="economic"
          disabled={!currentCity}
          title="Mostar marginación"
          // onChange={onEconomicLayerChange}
          // active={economicLayer}
        >
          <GppMaybeOutlinedIcon />
        </LayerSwitch>
        <LayerSwitch
          key="Density"
          disabled={!currentCity}
          title="Mostar densidad"
          // onChange={onDensityLayerChange}
          // active={densityLayer}
        >
          <AccessibilityNewIcon />
        </LayerSwitch>
        <LayerSwitch
          key="Roads"
          disabled={!currentCity}
          title="Mostar red vial"
          // onChange={onRoadsLayerChange}
          // active={roadsLayer}
        >
          <DirectionsIcon />
        </LayerSwitch>
        <LayerSwitch
          disabled={!currentCity}
          title="Regresar"
          onChange={onReset}
        >
          <RestartAltIcon />
        </LayerSwitch>
      </div>
    </div>
  );
}

export default GlobalControls;
