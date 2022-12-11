import React from 'react';

import useConfig from 'src/hooks/data/useConfig';
import MapProvider from 'src/context/map';
import MapParamsProvider from 'src/context/mapParams';
import Sidebar from 'src/components/Sidebar';
import LoadingOverlay from 'src/components/LoadingOverlay';
import CreditsCard from 'src/components/CreditsCard';
import CitiesOverview from 'src/components/CitiesOverview';

function Map() {
  const { data: config, isLoading } = useConfig();

  return (
    <>
      <LoadingOverlay open={isLoading} />
      <MapProvider>
        <MapParamsProvider config={config}>
          <Sidebar config={config} />
          <CreditsCard />

          {config ? (
            <CitiesOverview cities={Object.values(config || {})} />
          ) : null}
        </MapParamsProvider>
      </MapProvider>
    </>
  );
}

export default Map;
