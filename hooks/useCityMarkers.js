import mapboxgl, { Popup } from 'mapbox-gl';
import { useState } from 'react';
import buildCityMarker from '../utils/buildCityMarker';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;

const popups = []

const useCityMarkers = () => {
  const [cityMarkers, setCityMarkers] = useState([])
  const display = (map, cities, { onClick }) => {
    const markers = []
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
      markers.push(marker);
      popups.push(popup)
    });
    setCityMarkers(markers)
  };

  const remove = () => {
    cityMarkers.forEach((marker) => marker.remove());
    popups.forEach((popup) => popup.remove());
    setCityMarkers([])
  };
  

  return [display, remove, cityMarkers]
};

export default useCityMarkers;
