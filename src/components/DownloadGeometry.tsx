import React from 'react';

import Download from 'src/components/Download';
import { useMapboxLayerManager } from 'src/context/mapboxLayerManager';
import { useMapParams } from 'src/context/mapParams';

function DownloadGeometry() {
  const { current } = useMapParams();
  const { legend, geojson } = useMapboxLayerManager();

  return current.cityCode && geojson && Object.keys(geojson).length > 0 ? (
    <div className="fixed z-20 bottom-12 right-4 cursor-pointer">
      <Download data={geojson} filename={legend?.title} />
    </div>
  ) : null;
}

export default DownloadGeometry;
