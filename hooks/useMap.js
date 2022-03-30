import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import useCityBoundaries from './useCityBoundaries';

const useMap = ({
  center,
}) => {
  const [map, setMap] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const loadBoundaries = useCityBoundaries()


  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/daniel-itdp/ckwqye8xi0pel14qvvgh6vpn9',
      center,
      zoom: 4.5,
    });
    // mapInstance.addControl(new mapboxgl.NavigationControl());
    // mapInstance.addControl(new mapboxgl.ScaleControl());
    mapInstance.on('load', () => {
      mapInstance.resize();
      setLoaded(true);
      // loadBoundaries(mapInstance)
    });
    setMap(mapInstance);
  }, []);

  return [map, loaded];
};

export default useMap;
