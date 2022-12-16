import { useMap } from 'src/context/map';
import { useMapParams } from 'src/context/mapParams';
import { useQuery } from '@tanstack/react-query';
import queries from 'src/utils/queries';
import { MapMouseEvent } from 'src/types';
import { useEffect } from 'react';
import popup from 'src/utils/popup';
import useConfig from './data/useConfig';

const useCityMarkers = () => {
  const layerId = 'city-zones';
  const map = useMap();
  const { data: config } = useConfig();
  const {
    onCityChange,
    current: { cityCode },
  } = useMapParams();

  useQuery({
    ...queries.cities.all,
    enabled: !!config,
    select: (data) => {
      const activeCities = Object.keys(config || {});
      return {
        ...data,
        features: data.features
          .filter((feature) => activeCities.includes(feature?.properties?.code))
          .map((feature) => ({
            ...feature,
            properties: {
              ...feature.properties,
              color: config?.[feature?.properties?.code]?.color,
              name: config?.[feature?.properties?.code]?.name,
            },
          })),
      };
    },
    onSuccess: (geojson) => {
      map.addSource(layerId, {
        type: 'geojson',
        data: geojson,
      });

      map.addLayer({
        id: layerId,
        type: 'fill',
        source: layerId,
        layout: {
          visibility: 'visible',
        },
        // filter: ['>', ['get', property], 0],
        paint: {
          'fill-opacity': 0.5,
          'fill-color': ['get', 'color'],
          'fill-outline-color': [
            'case',
            ['has', 'selected'],
            ['rgba', 0, 0, 0, 1],
            ['rgba', 255, 0, 0, 0],
          ],
        },
      });

      map.on('click', layerId, (event: MapMouseEvent) => {
        const code = event.features?.[0]?.properties?.code;
        onCityChange?.(code);
      });

      map.on('mousemove', layerId, (event: MapMouseEvent) => {
        popup
          .setLngLat(event.lngLat)
          .setHTML(`${event?.features?.[0]?.properties?.name}`)
          .addTo(map);
      });

      map.on('mouseleave', layerId, () => {
        popup.remove();
      });
    },
  });

  useEffect(() => {
    if (cityCode) {
      map.setLayoutProperty(layerId, 'visibility', 'none');
    } else if (map.getSource(layerId)) {
      map.setLayoutProperty(layerId, 'visibility', 'visible');
    }
  }, [cityCode, map]);

  // useEffect(() => {
  //   if (!config) {
  //     return;
  //   }

  //   const display = () => {
  //     const markers: HTMLDivElement[] = [];
  //     Object.keys(config).forEach((cty) => {
  //       const popup = new Popup({
  //         className: 'black-popup',
  //         closeButton: false,
  //         closeOnClick: false,
  //       });
  //       const marker = buildCityMarker(config[cty].color);
  //       marker.addEventListener('click', () => {
  //         onCityChange?.(cty);
  //       });
  //       marker.addEventListener('mousemove', () => {
  //         popup
  //           .setLngLat(config[cty].coordinates)
  //           .setHTML(config[cty].name)
  //           .addTo(map);
  //       });
  //       marker.addEventListener('mouseleave', () => {
  //         popup.remove();
  //       });
  //       new Marker(marker).setLngLat(config[cty].coordinates).addTo(map);
  //       markers.push(marker);
  //       popups.push(popup);
  //     });
  //     setCityMarkers(markers);
  //   };

  //   const remove = () => {
  //     cityMarkers.forEach((marker) => marker.remove());
  //     popups.forEach((popup) => popup.remove());
  //     setCityMarkers([]);
  //   };

  //   if (cityCode && cityMarkers.length > 0) {
  //     remove();
  //   } else if (config && !cityCode && !cityMarkers.length) {
  //     display();
  //   }
  // }, [config, cityMarkers, cityMarkers.length, map, onCityChange, cityCode]);
};

export default useCityMarkers;
