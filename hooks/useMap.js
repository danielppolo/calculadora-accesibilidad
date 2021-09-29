import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const useMap = ({
  center,
}) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    setMap(new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center,
      zoom: 12,
    }))
  }, []);

  return map
}

export default useMap;