import { LngLatBounds } from 'mapbox-gl';
import { useEffect } from 'react';
import { MAX_ZOOM } from 'src/constants';
import { useMap } from 'src/context/map';
import { useMapboxLayerManager } from 'src/context/mapboxLayerManager';

const useMapFit = () => {
  const map = useMap();
  const { geojson } = useMapboxLayerManager();
  const features = geojson?.features;
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (features?.length && !isMobile) {
      const bounds = new LngLatBounds();
      features.forEach((feature) => {
        bounds.extend(feature.geometry.coordinates[0][0] as [number, number]);
      });

      map.fitBounds(bounds, {
        padding: 200,
        maxZoom: MAX_ZOOM,
        duration: 500,
      });
    }
  }, [features, isMobile, map]);
};

export default useMapFit;
