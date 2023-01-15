import React, { memo } from 'react';
import LegendBar from 'src/components/LegendBar';
import { Drawer, Divider } from 'antd';
import { useMapParams } from 'src/context/mapParams';
import useCurrentVisualization from 'src/hooks/data/useCurrentVisualization';
import useCurrentVariant from 'src/hooks/data/useCurrentVariant';
import { useMapboxLayerManager } from 'src/context/mapboxLayerManager';
import DataSource from './DataSource';
import MapboxLayerToggle from './MapboxLayerToggle';
import VisualizationInfo from './VisualizationInfo';
import VariantPicker from './VariantPicker';
import FilterPicker from './FilterPicker';

function Sidebar() {
  const { current } = useMapParams();
  const { legend, current: currentLayer } = useMapboxLayerManager();
  const getCurrentVisualization = useCurrentVisualization();
  const getCurrentVariant = useCurrentVariant();
  const currentVariant = getCurrentVariant(current);
  const currentVisualization = getCurrentVisualization(current);
  const showVariantPicker = (currentVisualization?.variants?.length ?? 0) > 1;
  const showInfoPanel = !!currentVisualization?.helperText;
  const showDataSources = !!currentVariant?.dataProviders?.length;

  return (
    <Drawer
      placement="right"
      open={!!current?.cityCode}
      mask={false}
      closable={false}
      bodyStyle={{
        padding: 0,
        background: 'transparent',
      }}
      contentWrapperStyle={{
        boxShadow: 'none',
        background: 'transparent',
      }}
      className="backdrop-blur-sm bg-white/80"
    >
      {showVariantPicker ? (
        <>
          <div className="p-4">
            <h3 className="font-semibold uppercase mb-2 text-[16px]">
              Escenarios
            </h3>
            <VariantPicker />
          </div>
          <Divider className="m-0" key="filters-divider" />
        </>
      ) : null}

      <div className="p-4">
        <h3 className="font-semibold uppercase mb-2 text-[16px]">Filtros</h3>
        {currentVisualization?.filters?.map((filter, index) => (
          <div key={`${currentVisualization?.name}-${filter.code}`}>
            <p className="mb-2 text-gray-700">{filter.name}</p>
            <FilterPicker
              disabled={!currentLayer}
              filter={filter}
              key={filter.code}
              comparable={
                currentVisualization?.comparable &&
                index === currentVisualization.filters.length - 1
              }
            />
            <div className="mb-4" />
          </div>
        ))}

        {/* FIXME: */}
        {currentVisualization?.comparable && legend?.scales.length && (
          <div key={`${currentVisualization?.name}-hardcoded`}>
            <p className="mb-2 text-gray-700">Custom scales</p>
            <FilterPicker
              disabled={!currentLayer}
              filter={{
                name: 'Tiempo',
                code: 'time-hardcoded',
                options: legend.scales.map((scale) => ({
                  name: scale.label,
                  code: scale.topValue.toString(),
                  unit: 'min',
                })),
                defaultOption: {
                  name: legend.scales[0].label,
                  code: legend.scales[0].topValue.toString(),
                  unit: 'min',
                },
                selectorType: 'button',
              }}
              key="hardcoded"
            />
            <div className="mb-4" />
          </div>
        )}
      </div>

      {showInfoPanel ? (
        <>
          <Divider className="m-0" key="info-divider" />
          <div className="p-4">
            <h3 className="font-semibold uppercase mb-2 text-[16px]">
              Información
            </h3>
            <VisualizationInfo />
          </div>
        </>
      ) : null}

      <Divider className="m-0" key="layers-divider" />
      <div className="p-4">
        <h3 className="font-semibold uppercase mb-2 text-[16px]">Capas</h3>
        <MapboxLayerToggle />
      </div>
      <Divider className="m-0" key="legends-divider" />
      <div className="p-4">
        <h3 className="font-semibold uppercase mb-2 text-[16px]">Simbología</h3>
        <LegendBar />
      </div>
      {showDataSources && (
        <>
          <Divider className="m-0" key="sources-divider" />
          <div className="p-4">
            <h3 className="font-semibold uppercase mb-4 text-[16px]">
              Fuentes
            </h3>
            <DataSource />
          </div>
        </>
      )}
    </Drawer>
  );
}

export default memo(Sidebar);
