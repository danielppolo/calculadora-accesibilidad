import mapboxgl, { Popup, Map, Marker } from 'mapbox-gl';
import { useState } from 'react';
import { City } from 'src/types';
import buildCityMarker from 'src/utils/buildCityMarker';

type DisplayOptions = {
  onClick?: (city: string) => void;
}

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN

if (accessToken) {
  mapboxgl.accessToken = accessToken
}

const popups: Popup[] = []

const useCityMarkers = () => {
  const [cityMarkers, setCityMarkers] = useState<HTMLDivElement[]>([])

  const display = (map: Map, cities: Record<string, City>, { onClick }: DisplayOptions) => {
    const markers: HTMLDivElement[] = []
    Object.keys(cities).forEach((cty) => {
      const popup = new Popup({
        className: 'black-popup',
        closeButton: false,
        closeOnClick: false,
      });
      const marker = buildCityMarker(cities[cty].color);
      marker.addEventListener('click', () => { onClick?.(cty); });
      marker.addEventListener('mousemove', () => {
        popup
          .setLngLat(cities[cty].coordinates)
          .setHTML(cities[cty].name)
          .addTo(map);
      });
      marker.addEventListener('mouseleave', () => {
        popup.remove();
      });
      new Marker(marker).setLngLat(cities[cty].coordinates).addTo(map);
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


  return [display, remove, cityMarkers] as const
};

export default useCityMarkers;
