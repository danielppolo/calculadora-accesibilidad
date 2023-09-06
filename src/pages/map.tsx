/* eslint-disable react/no-unknown-property */
import React from 'react';

import MapProvider from 'src/context/map';
import MapParamsProvider from 'src/context/mapParams';
import LoadingOverlay from 'src/components/LoadingOverlay';
import MapboxLayerManagerProvider from 'src/context/mapboxLayerManager';
import MapboxTilesetManagerProvider from 'src/context/mapboxTilesetManager';
import Map from 'src/components/Map';
import { useIsFetching } from '@tanstack/react-query';
import { StaticFeedbackForm } from 'src/components/FeedbackForm';

function MapPage() {
  const isFetching = useIsFetching();

  return (
    <>
      <MapProvider>
        <MapboxTilesetManagerProvider>
          <MapboxLayerManagerProvider>
            <MapParamsProvider>
              <Map />
            </MapParamsProvider>
          </MapboxLayerManagerProvider>
        </MapboxTilesetManagerProvider>
        <LoadingOverlay open={isFetching > 0} />
      </MapProvider>
      <StaticFeedbackForm />
    </>
  );
}

export default MapPage;
