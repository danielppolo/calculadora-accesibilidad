import React from 'react';

import MapProvider from 'src/context/map';
import MapParamsProvider from 'src/context/mapParams';
import LoadingOverlay from 'src/components/LoadingOverlay';
import MapboxLayerManagerProvider from 'src/context/mapboxLayerManager';
import Map from 'src/components/Map';
import { useIsFetching } from 'react-query';

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
    </>
  );
}

export default MapPage;
