import mapboxgl, { Popup } from 'mapbox-gl';
import buildCityMarker from './buildCityMarker';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;

const displayCityMarkers = (map, cities, { onClick }) => {
  const cityMarkers = [];
  Object.keys(cities).forEach((cty) => {
    const popup = new Popup({
      className: 'black-popup',
      closeButton: false,
      closeOnClick: false,
    });
    const marker = buildCityMarker(cities[cty].color);
    marker.addEventListener('click', () => { onClick(cty); });
    marker.addEventListener('mousemove', () => {
      popup
        .setLngLat(cities[cty].coordinates)
        .setHTML(cities[cty].name)
        .addTo(map);
    });
    marker.addEventListener('mouseleave', () => {
      popup.remove();
    });
    new mapboxgl.Marker(marker).setLngLat(cities[cty].coordinates).addTo(map);
    cityMarkers.push(marker);
  });
  return cityMarkers;
};

export default displayCityMarkers;
