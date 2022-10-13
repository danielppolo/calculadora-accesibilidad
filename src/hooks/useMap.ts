import { useEffect, useState } from 'react';
import mapboxgl, { LngLatLike, Map } from 'mapbox-gl';
import useCityBoundaries from 'src/hooks/useCityBoundaries';

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;

if (accessToken) {
  mapboxgl.accessToken = accessToken;
}

interface UseMapParams {
  center: LngLatLike;
}

const createMap = (center: LngLatLike) => new Map({
  container: 'map',
  style: 'mapbox://styles/daniel-itdp/ckwqye8xi0pel14qvvgh6vpn9',
  center,
  zoom: 4.5,
});

const useMap = ({
  center,
}: UseMapParams) => {
  const [map, setMap] = useState<Map | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);
  const loadBoundaries = useCityBoundaries();

  useEffect(() => {
    const mapInstance = createMap(center);
    // mapInstance.addControl(new mapboxgl.NavigationControl());
    // mapInstance.addControl(new mapboxgl.ScaleControl());
    mapInstance.on('load', () => {
      mapInstance.resize();
      setLoaded(true);
      // loadBoundaries(mapInstance)
    });
    setMap(mapInstance);
  }, []);

  return [map, loaded] as const;
};

export default useMap;
