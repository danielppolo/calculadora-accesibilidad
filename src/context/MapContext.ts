import mapboxgl from 'mapbox-gl';
import React from 'react';

interface Context {
    map: mapboxgl.Map | undefined;
}

const MapContext = React.createContext<Context>({ map: undefined });

export default MapContext;
