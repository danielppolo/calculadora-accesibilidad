import { useMap } from 'src/context/map';
import { useMapParams } from 'src/context/mapParams';
import { useQuery } from '@tanstack/react-query';
import queries from 'src/utils/queries';
import { MapMouseEvent } from 'src/types';
import { useEffect } from 'react';
import popup from 'src/utils/popup';
import useConfig from './data/useConfig';

const useCityMarkers = () => {
  const lineLayerId = 'city-zones-line';
  const fillLayerId = 'city-zones-fill';
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
      map.addSource(fillLayerId, {
        type: 'geojson',
        data: geojson,
      });

      map.addLayer({
        id: fillLayerId,
        type: 'fill',
        source: fillLayerId,
        layout: {
          visibility: 'visible',
        },
        paint: {
          'fill-opacity': 0.5,
          'fill-color': ['get', 'color'],
        },
      });

      map.addSource(lineLayerId, {
        type: 'geojson',
        data: geojson,
      });

      map.addLayer({
        id: lineLayerId,
        type: 'line',
        source: lineLayerId,
        layout: {
          visibility: 'visible',
        },
        paint: {
          'line-width': 1,
          'line-color': ['rgba', 0, 0, 0, 0.5],
        },
      });

      map.on('mousemove', fillLayerId, (event: MapMouseEvent) => {
        popup
          .setLngLat(event.lngLat)
          .setHTML(`${event?.features?.[0]?.properties?.name}`)
          .addTo(map);
      });

      map.on('mouseleave', fillLayerId, () => {
        popup.remove();
      });
    },
  });

  useEffect(() => {
    const isLayer = map.getSource(fillLayerId);
    if (isLayer && cityCode) {
      map.setPaintProperty(fillLayerId, 'fill-opacity', 0);
    } else if (isLayer) {
      map.setPaintProperty(fillLayerId, 'fill-opacity', 0.5);
    }
  }, [cityCode, map]);

  useEffect(() => {
    const handleLayerClick = (event: MapMouseEvent) => {
      const code = event.features?.[0]?.properties?.code;
      onCityChange?.(code);
    };

    map.on('click', fillLayerId, handleLayerClick);

    return () => {
      map.off('click', fillLayerId, handleLayerClick);
    };
  }, [cityCode, map, onCityChange]);
};

export default useCityMarkers;
