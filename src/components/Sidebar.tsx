import React, { memo } from 'react';
import LegendBar from 'src/components/LegendBar';
import Notes from 'src/components/Notes';
import { MapboxLayerManager } from 'src/types';
import { Drawer, Collapse } from 'antd';
import { useMapParams } from 'src/context/mapParams';
import useCurrentCity from 'src/hooks/data/useCurrentCity';
import useCurrentVisualization from 'src/hooks/data/useCurrentVisualization';
import DataSource from './DataSource';
import MapboxLayerToggle from './MapboxLayerToggle';
import VisualizationInfo from './VisualizationInfo';
import CityPicker from './CityPicker';
import VisualizationPicker from './VisualizationPicker';
import VariantPicker from './VariantPicker';
import FilterPicker from './FilterPicker';

const { Panel } = Collapse;
interface SidebarProps {
  economicLayer: MapboxLayerManager;
  densityLayer: MapboxLayerManager;
  roadLayer: MapboxLayerManager;
}

function Sidebar({ economicLayer, densityLayer, roadLayer }: SidebarProps) {
  const getCurrentCity = useCurrentCity();
  const getCurrentVisualization = useCurrentVisualization();
  const { current } = useMapParams();
  const currentCity = getCurrentCity(current);
  const currentVisualization = getCurrentVisualization(current);
  const showVisualizationPicker = currentCity?.visualizations?.length;
  const showVariantPicker = (currentVisualization?.variants?.length ?? 0) > 1;

  return (
    <Drawer
      placement="left"
      open={!!current?.cityCode}
      mask={false}
      closable={false}
      bodyStyle={{
        padding: 0,
      }}
      className="bg-white"
    >
      <div className="flex h-full flex-col">
        <div>
          <h2 className="text-2xl font-semibold uppercase m-4">
            {currentCity?.name}
          </h2>
          {/* {currentCity ? <CityPicker /> : null} */}

          <Collapse
            defaultActiveKey={['1', '2', '3', '4', '5', '6', '7']}
            ghost
            expandIconPosition="end"
          >
            {showVisualizationPicker ? (
              <Panel
                header={
                  <h3 className="font-semibold uppercase text-sm">Mapas</h3>
                }
                key="1"
              >
                <VisualizationPicker />
              </Panel>
            ) : null}

            {showVariantPicker && (
              <Panel
                header={
                  <h3 className="font-semibold uppercase text-sm">
                    Escenarios
                  </h3>
                }
                key="2"
              >
                <VariantPicker />
              </Panel>
            )}

            <Panel
              header={
                <h3 className="font-semibold uppercase text-sm">Filtros</h3>
              }
              key="3"
            >
              {currentVisualization?.filters?.map((filter) => (
                <FilterPicker filter={filter} key={filter.code} />
              ))}
            </Panel>

            {currentVisualization?.text && (
              <Panel
                header={
                  <h3 className="font-semibold uppercase text-sm">
                    Información
                  </h3>
                }
                key="4"
              >
                <VisualizationInfo />
              </Panel>
            )}

            <Panel
              header={
                <h3 className="font-semibold uppercase text-sm">Capas</h3>
              }
              key="5"
            >
              <MapboxLayerToggle
                economicLayer={economicLayer}
                densityLayer={densityLayer}
                roadLayer={roadLayer}
              />
            </Panel>
            <Panel
              header={
                <h3 className="font-semibold uppercase text-sm">Simbología</h3>
              }
              key="6"
            >
              <LegendBar
                economicLayer={economicLayer}
                densityLayer={densityLayer}
                roadLayer={roadLayer}
              />
            </Panel>
            <Panel
              header={
                <h3 className="font-semibold uppercase text-sm">Fuentes</h3>
              }
              key="7"
            >
              <DataSource />
              <Notes />
            </Panel>
          </Collapse>
        </div>
      </div>
    </Drawer>
  );
}

export default memo(Sidebar);
