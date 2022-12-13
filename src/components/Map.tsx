import React from 'react';

import Sidebar from 'src/components/Sidebar';
import Credits from 'src/components/CreditsCard';
import CitiesOverview from 'src/components/CitiesOverview';
import useCityMarkers from 'src/hooks/useCityMarkers';
import useMapFit from 'src/hooks/useMapFit';
import useGridRender from 'src/hooks/data/useGridRender';
import useIsochroneVisualizationRender from 'src/hooks/data/useIsochroneVisualizationRender';
import useVariantVisualizationRender from 'src/hooks/data/useVariantVisualizationRender';

function Map() {
  useMapFit();
  useCityMarkers();
  useGridRender();
  useIsochroneVisualizationRender();
  useVariantVisualizationRender();

  return (
    <>
      <Sidebar />
      <CitiesOverview />
      <Credits />
    </>
  );
}

export default Map;
