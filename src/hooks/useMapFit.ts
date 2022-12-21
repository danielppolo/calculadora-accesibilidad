import { LngLatBounds } from 'mapbox-gl';
import { useEffect } from 'react';
import { MAX_ZOOM } from 'src/constants';
import { useMap } from 'src/context/map';
import { useMapboxLayerManager } from 'src/context/mapboxLayerManager';

const useMapFit = () => {
  const map = useMap();
  const { geojson } = useMapboxLayerManager();
  const features = geojson?.features;

  useEffect(() => {
    // Fit map to selected features.
    if (features?.length) {
      const bounds = new LngLatBounds();
      const offsetX = window.innerWidth > 600 ? window.innerWidth / 12 : 0;
      features.forEach((feature) => {
        bounds.extend(feature.geometry.coordinates[0][0] as [number, number]);
      });

      map.fitBounds(bounds, {
        padding: 200,
        maxZoom: MAX_ZOOM,
        duration: 500,
        // offset: [offsetX, 0],
      });
    }
  }, [features, map]);
};

export default useMapFit;
