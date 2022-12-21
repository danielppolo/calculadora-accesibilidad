import React, { memo } from 'react';
import LegendBar from 'src/components/LegendBar';
import { MapboxLayerManager } from 'src/types';
import { Drawer, Collapse, Divider } from 'antd';
import { useMapParams } from 'src/context/mapParams';
import useCurrentVisualization from 'src/hooks/data/useCurrentVisualization';
import DataSource from './DataSource';
import MapboxLayerToggle from './MapboxLayerToggle';
import VisualizationInfo from './VisualizationInfo';
import VariantPicker from './VariantPicker';
import FilterPicker from './FilterPicker';

const { Panel } = Collapse;
interface SidebarProps {
  economicLayer: MapboxLayerManager;
  densityLayer: MapboxLayerManager;
  roadLayer: MapboxLayerManager;
}

function Content({ economicLayer, densityLayer, roadLayer }: SidebarProps) {
  const getCurrentVisualization = useCurrentVisualization();
  const { current } = useMapParams();
  const currentVisualization = getCurrentVisualization(current);
  const showVariantPicker = (currentVisualization?.variants?.length ?? 0) > 1;
  const showInfoPanel = !!currentVisualization?.text;

  return (
    <Collapse
      defaultActiveKey={['1', '2', '3', '4', '5', '6', '7']}
      ghost
      expandIconPosition="end"
      // bordered
    >
      {showVariantPicker ? (
        <>
          <Panel
            forceRender
            header={
              <h3 className="font-semibold uppercase text-[16px]">
                Escenarios
              </h3>
            }
            key="2"
          >
            <VariantPicker />
          </Panel>
          <Divider className="m-0 mt-2" key="filters-divider" />
        </>
      ) : null}

      <Panel
        forceRender
        header={
          <h3 className="font-semibold uppercase text-[16px]">Filtros</h3>
        }
        key="3"
      >
        {currentVisualization?.filters?.map((filter) => (
          <div key={`${currentVisualization?.name}-${filter.code}`}>
            <p className="mb-2 text-gray-700">{filter.name}</p>
            <FilterPicker filter={filter} key={filter.code} />
            <div className="mb-4" />
          </div>
        ))}
      </Panel>

      {showInfoPanel ? (
        <>
          <Divider className="m-0 mt-2" key="info-divider" />
          <Panel
            forceRender
            header={
              <h3 className="font-semibold uppercase text-[16px]">
                Información
              </h3>
            }
            key="4"
          >
            <VisualizationInfo />
          </Panel>
        </>
      ) : null}

      <Divider className="m-0 mt-2" key="layers-divider" />
      <Panel
        forceRender
        header={<h3 className="font-semibold uppercase text-[16px]">Capas</h3>}
        key="5"
      >
        <MapboxLayerToggle
          economicLayer={economicLayer}
          densityLayer={densityLayer}
          roadLayer={roadLayer}
        />
      </Panel>
      <Divider className="m-0 mt-2" key="legends-divider" />
      <Panel
        forceRender
        header={
          <h3 className="font-semibold uppercase text-[16px]">Simbología</h3>
        }
        key="6"
      >
        <LegendBar
          economicLayer={economicLayer}
          densityLayer={densityLayer}
          roadLayer={roadLayer}
        />
      </Panel>
      <Divider className="m-0 mt-2" key="sources-divider" />
      <Panel
        forceRender
        header={
          <h3 className="font-semibold uppercase text-[16px]">Fuentes</h3>
        }
        key="7"
      >
        <DataSource />
      </Panel>
    </Collapse>
  );
}

function Sidebar({ economicLayer, densityLayer, roadLayer }: SidebarProps) {
  const { current } = useMapParams();
  const getCurrentVisualization = useCurrentVisualization();
  const currentVisualization = getCurrentVisualization(current);
  const showVariantPicker = (currentVisualization?.variants?.length ?? 0) > 1;
  const showInfoPanel = !!currentVisualization?.text;

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
        {currentVisualization?.filters?.map((filter) => (
          <div key={`${currentVisualization?.name}-${filter.code}`}>
            <p className="mb-2 text-gray-700">{filter.name}</p>
            <FilterPicker filter={filter} key={filter.code} />
            <div className="mb-4" />
          </div>
        ))}
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
        <MapboxLayerToggle
          economicLayer={economicLayer}
          densityLayer={densityLayer}
          roadLayer={roadLayer}
        />
      </div>
      <Divider className="m-0" key="legends-divider" />
      <div className="p-4">
        <h3 className="font-semibold uppercase mb-2 text-[16px]">Simbología</h3>
        <LegendBar
          economicLayer={economicLayer}
          densityLayer={densityLayer}
          roadLayer={roadLayer}
        />
      </div>
      <Divider className="m-0" key="sources-divider" />
      <div className="p-4">
        <h3 className="font-semibold uppercase mb-4 text-[16px]">Fuentes</h3>
        <DataSource />
      </div>
    </Drawer>
  );
}

export default memo(Sidebar);
