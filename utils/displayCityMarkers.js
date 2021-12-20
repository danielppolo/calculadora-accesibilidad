import mapboxgl from 'mapbox-gl';
import buildCityMarker from './buildCityMarker';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;

const displayCityMarkers = (map, cities, { onClick }) => {
  const cityMarkers = [];
  Object.keys(cities).forEach((cty) => {
    const marker = buildCityMarker(cities[cty].color);
    marker.addEventListener('click', () => { onClick(cty); });
    new mapboxgl.Marker(marker).setLngLat(cities[cty].coordinates).addTo(map);
    cityMarkers.push(marker);
  });
  return cityMarkers;
};

export default displayCityMarkers;
