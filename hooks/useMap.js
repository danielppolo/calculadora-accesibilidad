import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const useMap = ({
  center,
}) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    setMap(new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/daniel-itdp/cku50fspf21w917qic6lbyzpv',
      center,
      zoom: 12,
    }))
  }, []);

  return map
}

export default useMap;