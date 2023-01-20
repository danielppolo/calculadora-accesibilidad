import { LngLatBounds } from 'mapbox-gl';
import { useEffect } from 'react';
import { MAX_ZOOM } from 'src/constants';
import { useMap } from 'src/context/map';
import { useMapboxLayerManager } from 'src/context/mapboxLayerManager';
import isMobile from 'src/utils/isMobile';

const useMapFit = () => {
  const map = useMap();
  const { geojson } = useMapboxLayerManager();
  const features = geojson?.map((gjson) => gjson.features).flat();

  useEffect(() => {
    if (features?.length && !isMobile()) {
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
  }, [features, map]);
};

export default useMapFit;
