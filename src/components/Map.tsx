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
import GlobalControls from './GlobalControls';
import DownloadGeometry from './DownloadGeometry';

function Map() {
  useMapFit();
  useZoomToReset();

  useCityMarkers();

  useGridRender();
  useIsochroneVisualizationRender();
  useVariantVisualizationRender();

  useGridClickListeners();

  const economicLayer = useEconomicZones();
  const densityLayer = usePopulationDensity();
  const roadLayer = useNationalRoadNetwork();

  return (
    <>
      <Sidebar
        economicLayer={economicLayer}
        densityLayer={densityLayer}
        roadLayer={roadLayer}
      />
      <GlobalControls />
      <DownloadGeometry />
      <Credits />
    </>
  );
}

export default Map;
