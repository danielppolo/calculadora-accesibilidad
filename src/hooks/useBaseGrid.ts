import { useEffect } from 'react';
import { convertToGeoJSON } from 'src/utils';
import { Popup } from 'mapbox-gl';
import { getGridId } from 'src/utils/getLayerIds';
import { Feature, Polygon } from 'geojson';
import useMap from './useMap';

interface UseBaseGridParams {
  features?: Feature<Polygon>[];
  popup: Popup;
  gridCode?: string;
  cityCode?: string;
}

const useBaseGrid = ({
  features,
  cityCode,
  gridCode,
  popup,
}: UseBaseGridParams) => {
  const map = useMap();

  useEffect(() => {
    if (gridCode && cityCode) {
      const id = getGridId(cityCode, gridCode);

      if (features?.length && !map.getSource(id)) {
        // FIXME: Display popup when hovering over grid
        // const opportunityKeys = Object.keys(OPPORTUNITIES) as Array<keyof typeof OPPORTUNITIES>;

        // const filteredFeatures = features.map((feature: Feature<Polygon>) => ({
        //   ...feature,
        //   properties: {
        //     ...feature.properties,
        //     description: `
        //   <div>
        //     ${opportunityKeys.map((prop) => `<p><strong>${OPPORTUNITIES[prop]}</strong>: <span>${feature.properties?.[prop] ?? ''}</span></p>`).join('')}
        //   </div>
        //   `,
        //   },
        // }));

        map.addSource(id, {
          type: 'geojson',
          data: convertToGeoJSON(features),
        });

        map.addLayer({
          id,
          type: 'fill',
          source: id,
          paint: {
            'fill-opacity': 0.7,
            'fill-color': 'transparent',
            'fill-outline-color': ['rgba', 0, 0, 0, 0.1],
          },
        });

        // map.on('mousemove', id, (event) => {
        //   popup
        //     .setLngLat(event.lngLat)
        //     .setHTML(event.features?.[0].properties?.description)
        //     .addTo(map);
        // });

        // map.on('mouseleave', id, () => {
        //   popup.remove();
        // });
      }
    }
  }, [cityCode, features, gridCode, map, popup]);
};

export default useBaseGrid;
