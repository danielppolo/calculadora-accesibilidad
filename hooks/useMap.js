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
      style: 'mapbox://styles/daniel-itdp/ckx5nzo9i01ee14pcd9wzswd0',
      center,
      zoom: 11,
    });
    mapInstance.addControl(new mapboxgl.NavigationControl());
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
