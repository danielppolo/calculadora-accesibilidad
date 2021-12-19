import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const useMap = ({
  center,
}) => {
  const [map, setMap] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/daniel-itdp/ckx9ajen70bf614pmjrguulmg',
      center,
      zoom: 4.8,
    });
    // mapInstance.addControl(new mapboxgl.NavigationControl());
    mapInstance.addControl(new mapboxgl.ScaleControl());
    mapInstance.on('load', () => {
      mapInstance.resize();
      setLoaded(true);
    });
    setMap(mapInstance);
  }, []);

  return [map, loaded];
};

export default useMap;
