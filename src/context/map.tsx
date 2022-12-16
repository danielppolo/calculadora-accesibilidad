import React, { useContext, useEffect, useState } from 'react';
import mapboxgl, { LngLatLike, Map } from 'mapbox-gl';

import { MEXICO_COORDINATES } from 'src/constants';
// import useCityBoundaries from 'src/hooks/useCityBoundaries';

interface Context {
  map: mapboxgl.Map | undefined;
}

interface MapProviderProps {
  children: React.ReactNode;
}

const MapContext = React.createContext<Context>({ map: undefined });

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;

if (accessToken) {
  mapboxgl.accessToken = accessToken;
}

const createMap = (center: LngLatLike) =>
  new Map({
    container: 'map',
    style: 'mapbox://styles/daniel-itdp/ckwqye8xi0pel14qvvgh6vpn9',
    center,
    zoom: 4.5,
    minZoom: 4,
  });

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

/**
 * Map is present because provider does not render children until map is loaded.
 */
export const useMap = () => useContext(MapContext).map as mapboxgl.Map;

export default MapProvider;
