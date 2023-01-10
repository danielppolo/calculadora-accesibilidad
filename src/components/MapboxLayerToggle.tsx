import React, { useMemo } from 'react';
import { useMapParams } from 'src/context/mapParams';
import { MapboxTileset } from 'src/types';
import { Checkbox } from 'antd';
import useCurrentVisualization from 'src/hooks/data/useCurrentVisualization';
import { useMapboxTilesetManager } from 'src/context/mapboxTilesetManager';
import useConfig from 'src/hooks/data/useConfig';
import useCurrentVariant from 'src/hooks/data/useCurrentVariant';
import { uniqBy } from 'lodash';
import useCurrentCity from 'src/hooks/data/useCurrentCity';

const isChecked = (tileset?: MapboxTileset, state?: Record<string, boolean>) =>
  tileset?.id ? state?.[tileset?.id] ?? false : false;

function MapboxLayerToggle() {
  const { data: config } = useConfig();
  const { state, toggle } = useMapboxTilesetManager();
  const { current } = useMapParams();
  const getCurrentCity = useCurrentCity();
  const getCurrentVisualization = useCurrentVisualization();
  const getCurrentVariant = useCurrentVariant();

  const tilesets = useMemo(() => {
    const currentCity = getCurrentCity(current);
    const currentVisualization = getCurrentVisualization(current);
    const currentVariant = getCurrentVariant(current);
    const appTilesets = config?.mapboxTilesets ?? [];
    const cityTilesets = currentCity?.mapboxTilesets ?? [];
    const visualizationTilesets = currentVisualization?.mapboxTilesets ?? [];
    const variantTilesets = currentVariant?.mapboxTilesets ?? [];
    const allTilesets = uniqBy(
      [
        ...appTilesets,
        ...cityTilesets,
        ...visualizationTilesets,
        ...variantTilesets,
      ],
      ({ id }: MapboxTileset) => id
    );
    const sortedTilesets = allTilesets.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return sortedTilesets;
  }, [
    config?.mapboxTilesets,
    current,
    getCurrentCity,
    getCurrentVariant,
    getCurrentVisualization,
  ]);

  const handleChange = (tileset?: MapboxTileset) => {
    if (tileset) {
      toggle(tileset);
    }
  };

  return (
    <div>
      {tilesets.map((tileset) => (
        <div className="mb-2" key={tileset?.id}>
          <Checkbox
            onChange={() => handleChange(tileset)}
            checked={isChecked(tileset, state)}
          >
            {tileset?.name}
          </Checkbox>
        </div>
      ))}
    </div>
  );
}

export default MapboxLayerToggle;
