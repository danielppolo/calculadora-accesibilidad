import { useMap } from 'src/context/map';
import { useMapParams } from 'src/context/mapParams';
import { useQuery } from '@tanstack/react-query';
import queries from 'src/utils/queries';
import { MapMouseEvent } from 'src/types';
import popup from 'src/utils/popup';
import {
  CITIES_ZONES_FILL_LAYER_ID,
  CITIES_ZONES_LINE_LAYER_ID,
  CITIES_ZONES_SOURCE_ID,
} from 'src/constants';
import useConfig from './data/useConfig';

const useCityMarkers = () => {
  const map = useMap();
  const { data: config } = useConfig();
  const { onCityChange } = useMapParams();

  useQuery({
    ...queries.cities.all,
    enabled: !!config,
    select: (data) => {
      const activeCities = Object.keys(config?.citiesDictionary || {});
      return {
        ...data,
        features: data.features
          .filter((feature) => activeCities.includes(feature?.properties?.code))
          .map((feature) => ({
            ...feature,
            properties: {
              ...feature.properties,
              color:
                config?.citiesDictionary?.[feature?.properties?.code]?.color,
              name: config?.citiesDictionary?.[feature?.properties?.code]?.name,
            },
          })),
      };
    },
    onSuccess: (geojson) => {
      map.addSource(CITIES_ZONES_SOURCE_ID, {
        type: 'geojson',
        data: geojson,
      });

      map.addLayer({
        id: CITIES_ZONES_FILL_LAYER_ID,
        type: 'fill',
        source: CITIES_ZONES_SOURCE_ID,
        layout: {
          visibility: 'visible',
        },
        paint: {
          'fill-opacity': 0.5,
          'fill-color': ['get', 'color'],
        },
      });

      map.addLayer({
        id: CITIES_ZONES_LINE_LAYER_ID,
        type: 'line',
        source: CITIES_ZONES_SOURCE_ID,
        layout: {
          visibility: 'visible',
        },
        paint: {
          'line-width': 1,
          'line-color': ['rgba', 0, 0, 0, 0.5],
        },
      });

      const handleLayerClick = (event: MapMouseEvent) => {
        const cityCode = event.features?.[0]?.properties?.code;
        onCityChange?.(cityCode);
      };

      // When the user clicks the polygon, we'll trigger the city change.
      map
        .on('click', CITIES_ZONES_FILL_LAYER_ID, handleLayerClick)
        // When the user moves their mouse over the polygon, we'll show a popup with the name of the city.
        .on('mousemove', CITIES_ZONES_FILL_LAYER_ID, (event: MapMouseEvent) => {
          popup
            .setLngLat(event.lngLat)
            .setHTML(`${event?.features?.[0]?.properties?.name}`)
            .addTo(map);
        })
        // When the user moves their mouse over the polygon, we'll unmount the popup.
        .on('mouseleave', CITIES_ZONES_FILL_LAYER_ID, () => {
          popup.remove();
        });
    },
  });
};

export default useCityMarkers;
