import { Feature, Polygon } from 'geojson';
import { LngLatBounds } from 'mapbox-gl';
import { useEffect } from 'react';
import useMap from './useMap';

const useMapFit = (features?: Feature<Polygon>[]) => {
  const map = useMap();

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
        maxZoom: 15,
        duration: 500,
        // offset: [offsetX, 0],
      });
    }
  }, [features, map]);
};

export default useMapFit;
