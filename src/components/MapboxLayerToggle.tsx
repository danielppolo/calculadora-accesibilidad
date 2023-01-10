import React from 'react';
import { useMapParams } from 'src/context/mapParams';
import { MapboxTileset } from 'src/types';
import { Checkbox } from 'antd';
import useCurrentVisualization from 'src/hooks/data/useCurrentVisualization';
import { useMapboxTilesetManager } from 'src/context/mapboxTilesetManager';
import useConfig from 'src/hooks/data/useConfig';
import useCurrentVariant from 'src/hooks/data/useCurrentVariant';
import { uniqBy } from 'lodash';

const isChecked = (tileset?: MapboxTileset, state?: Record<string, boolean>) =>
  tileset?.sourceLayer ? state?.[tileset?.sourceLayer] ?? false : false;

function MapboxLayerToggle() {
  const { data: config } = useConfig();
  const { state, toggle } = useMapboxTilesetManager();
  const { current } = useMapParams();
  const getCurrentVisualization = useCurrentVisualization();
  const getCurrentVariant = useCurrentVariant();
  const currentVisualization = getCurrentVisualization(current);
  const currentVariant = getCurrentVariant(current);
  const appTilesets = config?.mapboxTilesets ?? [];
  const visualizationTilesets = currentVisualization?.mapboxTilesets ?? [];
  const variantTilesets = currentVariant?.mapboxTilesets ?? [];
  const allTilesets = uniqBy(
    [...appTilesets, ...visualizationTilesets, ...variantTilesets],
    ({ tilesetId }: MapboxTileset) => tilesetId
  );

  const handleChange = (tileset?: MapboxTileset) => {
    if (tileset) {
      toggle(tileset);
    }
  };

  return (
    <div>
      {allTilesets.map((tileset) => (
        <div className="mb-2" key={tileset?.tilesetId}>
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
