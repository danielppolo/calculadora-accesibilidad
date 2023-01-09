import React from 'react';
import { useMapParams } from 'src/context/mapParams';
import { MapboxLayerManager } from 'src/types';
import { Checkbox } from 'antd';
import useCurrentVisualization from 'src/hooks/data/useCurrentVisualization';
import { useMapboxTilesetManager } from 'src/context/mapboxTilesetManager';
import useConfig from 'src/hooks/data/useConfig';

interface MapboxLayerToggleProps {
  economicLayer: MapboxLayerManager;
  densityLayer: MapboxLayerManager;
  roadLayer: MapboxLayerManager;
}

function MapboxLayerToggle({
  economicLayer,
  densityLayer,
  roadLayer,
}: MapboxLayerToggleProps) {
  const { data: config } = useConfig();
  const { state, toggle } = useMapboxTilesetManager();
  const { current } = useMapParams();
  const getCurrentVisualization = useCurrentVisualization();
  const currentVisualization = getCurrentVisualization(current);
  const appTiles = config?.mapboxTilesets ?? [];
  const visualizationTiles =
    currentVisualization?.filters
      ?.map((filter) =>
        filter.options.map((option) => option.enabledMapboxTilesets)
      )
      .flat(2)
      .filter(Boolean) ?? [];

  return (
    <div>
      {/* <div className="mb-2">
        <Checkbox
          disabled={!current.cityCode}
          onChange={economicLayer.toggle}
          checked={economicLayer.isActive}
        >
          Marginación
        </Checkbox>
      </div>
      <div className="mb-2">
        <Checkbox
          disabled={!current.cityCode}
          onChange={densityLayer.toggle}
          checked={densityLayer.isActive}
        >
          Densidad
        </Checkbox>
      </div>
      <div className="mb-2">
        <Checkbox
          disabled={!current.cityCode}
          onChange={roadLayer.toggle}
          checked={roadLayer.isActive}
        >
          Red vial
        </Checkbox>
      </div> */}

      {appTiles.map((tileset) => {
        return (
          <div className="mb-2" key={tileset?.sourceLayer}>
            <Checkbox
            // onChange={handleChange} checked={checked}
            >
              {tileset?.name}
            </Checkbox>
          </div>
        );
      })}

      {visualizationTiles.map((tileset) => {
        const handleChange = () => {
          if (tileset) {
            toggle(tileset);
          }
        };

        const checked = tileset?.sourceLayer
          ? state?.[tileset?.sourceLayer] ?? false
          : false;

        return (
          <div className="mb-2" key={tileset?.sourceLayer}>
            <Checkbox onChange={handleChange} checked={checked}>
              {tileset?.name}
            </Checkbox>
          </div>
        );
      })}
    </div>
  );
}

export default MapboxLayerToggle;
