import mapboxgl from 'mapbox-gl';
import { useContext } from 'react';
import MapContext from 'src/context/MapContext';

/**
 * Map is present because provider does not render children until map is loaded.
 */
const useMap = () => useContext(MapContext).map as mapboxgl.Map;

export default useMap;
