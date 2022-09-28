import { Feature, Polygon } from 'geojson';
import mapboxgl, { Map } from 'mapbox-gl';
import { useEffect } from 'react';

const useFitMap = (map?: Map, features?: Feature<Polygon>[]) => {
  useEffect(() => {
    // Fit map to selected features.
    if (map && features && features.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
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

export default useFitMap;
