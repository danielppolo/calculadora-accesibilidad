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
      style: 'mapbox://styles/daniel-itdp/cku50fspf21w917qic6lbyzpv',
      center,
      zoom: 7,
    });
    mapInstance.addControl(new mapboxgl.NavigationControl());
    mapInstance.addControl(new mapboxgl.ScaleControl());
    mapInstance.on('load', () => { setLoaded(true) })
    setMap(mapInstance);
  }, []);

  return [map, loaded];
};

export default useMap;
