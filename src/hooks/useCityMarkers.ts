import { Popup, Marker } from 'mapbox-gl';
import { useEffect, useState } from 'react';
import { Config } from 'src/types';
import buildCityMarker from 'src/utils/buildCityMarker';
import useMap from './useMap';

interface UseCityMarkersParams {
  config: Config;
  onClick?: (city: string) => void;
  hide?: boolean;
}

const popups: Popup[] = [];

const useCityMarkers = ({ hide, config, onClick }: UseCityMarkersParams) => {
  const map = useMap();
  const [cityMarkers, setCityMarkers] = useState<HTMLDivElement[]>([]);

  useEffect(() => {
    const display = () => {
      const markers: HTMLDivElement[] = [];
      Object.keys(config).forEach((cty) => {
        const popup = new Popup({
          className: 'black-popup',
          closeButton: false,
          closeOnClick: false,
        });
        const marker = buildCityMarker(config[cty].color);
        marker.addEventListener('click', () => {
          onClick?.(cty);
        });
        marker.addEventListener('mousemove', () => {
          popup
            .setLngLat(config[cty].coordinates)
            .setHTML(config[cty].name)
            .addTo(map);
        });
        marker.addEventListener('mouseleave', () => {
          popup.remove();
        });
        new Marker(marker).setLngLat(config[cty].coordinates).addTo(map);
        markers.push(marker);
        popups.push(popup);
      });
      setCityMarkers(markers);
    };

    const remove = () => {
      cityMarkers.forEach((marker) => marker.remove());
      popups.forEach((popup) => popup.remove());
      setCityMarkers([]);
    };

    if (hide && cityMarkers.length > 0) {
      remove();
    } else if (config && !hide && !cityMarkers.length) {
      display();
    }
  }, [config, cityMarkers, cityMarkers.length, hide, map, onClick]);
};

export default useCityMarkers;
