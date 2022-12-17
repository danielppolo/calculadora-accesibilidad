import React, { memo } from 'react';
import LegendBar from 'src/components/LegendBar';
import { MapboxLayerManager } from 'src/types';
import { Drawer, Collapse, Divider } from 'antd';
import { useMapParams } from 'src/context/mapParams';
import useCurrentCity from 'src/hooks/data/useCurrentCity';
import useCurrentVisualization from 'src/hooks/data/useCurrentVisualization';
import DataSource from './DataSource';
import MapboxLayerToggle from './MapboxLayerToggle';
import VisualizationInfo from './VisualizationInfo';
import VisualizationPicker from './VisualizationPicker';
import VariantPicker from './VariantPicker';
import FilterPicker from './FilterPicker';
import CityPicker from './CityPicker';

const { Panel } = Collapse;
interface SidebarProps {
  economicLayer: MapboxLayerManager;
  densityLayer: MapboxLayerManager;
  roadLayer: MapboxLayerManager;
}

function Content({ economicLayer, densityLayer, roadLayer }: SidebarProps) {
  const getCurrentCity = useCurrentCity();
  const getCurrentVisualization = useCurrentVisualization();
  const { current } = useMapParams();
  const currentCity = getCurrentCity(current);
  const currentVisualization = getCurrentVisualization(current);
  const showVisualizationPicker = currentCity?.visualizations?.length;
  const showVariantPicker = (currentVisualization?.variants?.length ?? 0) > 1;
  const showInfoPanel = !!currentVisualization?.text;

  return (
    <Collapse
      defaultActiveKey={['1', '2', '3', '4', '5', '6', '7']}
      ghost
      expandIconPosition="end"
      // bordered
    >
      <Panel
        forceRender
        header={<h3 className="font-semibold uppercase text-[16px]">Mapas</h3>}
        key="1"
      >
        <VisualizationPicker />
      </Panel>

      {showVariantPicker ? (
        <>
          <Divider className="m-0 mt-2" key="variants-divider" />
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
        </>
      ) : null}

      <Divider className="m-0 mt-2" key="filters-divider" />
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

  return (
    <Drawer
      placement="left"
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
    >
      <div className="p-4">
        <CityPicker />
      </div>
      <Content
        economicLayer={economicLayer}
        densityLayer={densityLayer}
        roadLayer={roadLayer}
      />
    </Drawer>
  );
}

export default memo(Sidebar);
