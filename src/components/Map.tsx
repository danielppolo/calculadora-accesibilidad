import React from 'react';

import Sidebar from 'src/components/Sidebar';
import Credits from 'src/components/CreditsCard';
import useCityMarkers from 'src/hooks/useCityMarkers';
import useMapFit from 'src/hooks/useMapFit';
import useGridRender from 'src/hooks/data/useGridRender';
import useIsochroneVisualizationRender from 'src/hooks/data/useIsochroneVisualizationRender';
import useVariantVisualizationRender from 'src/hooks/data/useVariantVisualizationRender';
import useGridClickListeners from 'src/hooks/data/useGridClickListeners';
import useZoomToReset from 'src/hooks/useZoomToReset';

import useEconomicZones from 'src/hooks/useEconomicZones';
import usePopulationDensity from 'src/hooks/usePopulationDensity';
import useNationalRoadNetwork from 'src/hooks/useNationalRoadNetwork';
import { message } from 'antd';
import GlobalControls from './GlobalControls';
import CityPicker from './CityPicker';
import VisualizationPicker from './VisualizationPicker';

function Map() {
  const [messageApi, contextHolder] = message.useMessage();

  useMapFit();
  useZoomToReset();

  useCityMarkers();

  useGridRender();
  useIsochroneVisualizationRender({
    onError: () => {
      messageApi.error('Algo salió mal, intenta de nuevo');
    },
  });
  useVariantVisualizationRender({
    onError: () => {
      messageApi.error('Algo salió mal, intenta de nuevo');
    },
  });

  useGridClickListeners();

  const economicLayer = useEconomicZones();
  const densityLayer = usePopulationDensity();
  const roadLayer = useNationalRoadNetwork();

  return (
    <>
      <div className="fixed z-20 top-4 left-4 w-[21.5rem] space-y-4">
        <CityPicker />
        <VisualizationPicker />
      </div>
      <Sidebar
        economicLayer={economicLayer}
        densityLayer={densityLayer}
        roadLayer={roadLayer}
      />
      <GlobalControls />

      <Credits />
      {contextHolder}
    </>
  );
}

export default Map;
