import { Popup, Marker } from 'mapbox-gl';
import { useEffect, useState } from 'react';
import buildCityMarker from 'src/utils/buildCityMarker';
import { useMap } from 'src/context/map';
import { useMapParams } from 'src/context/mapParams';
import useConfig from './data/useConfig';

const popups: Popup[] = [];

const useCityMarkers = () => {
  const map = useMap();
  const { data: config } = useConfig();
  const { cityCode, onCityChange } = useMapParams();
  const [cityMarkers, setCityMarkers] = useState<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!config) {
      return;
    }

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
          onCityChange?.(cty);
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

    if (cityCode && cityMarkers.length > 0) {
      remove();
    } else if (config && !cityCode && !cityMarkers.length) {
      display();
    }
  }, [config, cityMarkers, cityMarkers.length, map, onCityChange, cityCode]);
};

export default useCityMarkers;
