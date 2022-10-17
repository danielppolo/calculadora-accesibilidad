import React, { useEffect, useState } from 'react';
import mapboxgl, { LngLatLike, Map } from 'mapbox-gl';

import { MEXICO_COORDINATES } from 'src/constants';
import MapContext from 'src/context/MapContext';

// import useCityBoundaries from 'src/hooks/useCityBoundaries';

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;

if (accessToken) {
  mapboxgl.accessToken = accessToken;
}

const createMap = (center: LngLatLike) => new Map({
  container: 'map',
  style: 'mapbox://styles/daniel-itdp/ckwqye8xi0pel14qvvgh6vpn9',
  center,
  zoom: 4.5,
});

interface MapProviderProps {
    children: React.ReactNode;
}

function MapProvider({ children }: MapProviderProps) {
  const [map, setMap] = useState<Map | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);
  // const loadBoundaries = useCityBoundaries();

  useEffect(() => {
    const mapInstance = createMap(MEXICO_COORDINATES);
    // mapInstance.addControl(new mapboxgl.NavigationControl());
    // mapInstance.addControl(new mapboxgl.ScaleControl());
    mapInstance.on('load', () => {
      mapInstance.resize();
      setLoaded(true);
      // loadBoundaries(mapInstance)
    });
    setMap(mapInstance);
  }, []);

  return (
    <MapContext.Provider value={{ map }}>
      {loaded && children}
      <div id="map" className="w-screen h-screen" />
    </MapContext.Provider>
  );
}

export default MapProvider;
