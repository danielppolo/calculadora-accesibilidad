import React from 'react';

import MapProvider from 'src/context/map';
import MapParamsProvider from 'src/context/mapParams';
import LoadingOverlay from 'src/components/LoadingOverlay';
import MapboxLayerManagerProvider from 'src/context/mapboxLayerManager';
import Map from 'src/components/Map';
import { useIsFetching } from '@tanstack/react-query';

function MapPage() {
  const isFetching = useIsFetching();

  return (
    <>
      <MapProvider>
        <MapboxLayerManagerProvider>
          <MapParamsProvider>
            <Map />
          </MapParamsProvider>
        </MapboxLayerManagerProvider>
      </MapProvider>
      <LoadingOverlay open={isFetching > 0} />
      {/* Include all TW colors */}
      <div className="text-black text-blue text-red text-aqua text-green text-yellow text-purple text-pink text-orange hidden" />
    </>
  );
}

export default MapPage;
