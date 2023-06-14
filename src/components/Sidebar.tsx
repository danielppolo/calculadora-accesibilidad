import React, { memo, useState } from 'react';
import LegendBar from 'src/components/LegendBar';
import { Drawer, Divider, FloatButton, Collapse } from 'antd';
import { useMapParams } from 'src/context/mapParams';
import useCurrentVisualization from 'src/hooks/data/useCurrentVisualization';
import useCurrentVariant from 'src/hooks/data/useCurrentVariant';
import { COMPARABLE_KEY } from 'src/constants';
import isComparable from 'src/utils/isComparable';
import isMobile from 'src/utils/isMobile';
import { useIntl } from 'react-intl';
import { isEmpty } from 'lodash';
import { useMapboxLayerManager } from 'src/context/mapboxLayerManager';
import { marked } from 'marked';
import DataSource from './DataSource';
import MapboxLayerToggle from './MapboxLayerToggle';
import VisualizationInfo from './VisualizationInfo';
import VariantPicker from './VariantPicker';
import FilterPicker from './FilterPicker';
import ComparableChart from './ComparableChart';

marked.setOptions({
  gfm: true,
});

const { Panel } = Collapse;

function Sidebar() {
  const intl = useIntl();

  const [open, setOpen] = useState(true);
  const { current } = useMapParams();
  const getCurrentVisualization = useCurrentVisualization();
  const { comparingGeojson } = useMapboxLayerManager();
  const getCurrentVariant = useCurrentVariant();
  const currentVariant = getCurrentVariant(current);
  const currentVisualization = getCurrentVisualization(current);
  const showVariantPicker = (currentVisualization?.variants?.length ?? 0) > 1;
  const showInfoPanel = !!currentVisualization?.helperText;
  const showDataSources = !!currentVariant?.dataProviders?.length;
  const isDisabled =
    currentVisualization?.relativeTo === 'feature' && !current.featureId;
  const hasFullDescription = !!currentVisualization?.metadata?.fullDescription;

  return (
    <>
      <Drawer
        placement="right"
        open={isMobile() ? open && !!current?.cityCode : !!current?.cityCode}
        mask={false}
        closable={isMobile()}
        bodyStyle={{
          padding: 0,
          background: 'transparent',
        }}
        onClose={() => setOpen(false)}
        contentWrapperStyle={{
          boxShadow: 'none',
          width: isMobile() ? '100vw' : window.innerWidth / 4,
          background: 'transparent',
        }}
        className={isMobile() ? 'bg-white' : 'backdrop-blur-sm bg-white/80'}
      >
        {hasFullDescription ? (
          <>
            <div className="p-4">
              <h3 className="font-semibold uppercase mb-2 text-[16px]">
                {intl.formatMessage({
                  defaultMessage: '¿Qué estas viendo?',
                  id: 'beJl9c',
                })}
              </h3>
              <p
                className="mb-2 text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: marked.parse(
                    currentVisualization?.metadata?.fullDescription || ''
                  ),
                }}
              />
            </div>
            <Divider className="m-0" key="filters-divider" />
          </>
        ) : null}

        {showVariantPicker ? (
          <>
            <div className="p-4">
              <h3 className="font-semibold uppercase mb-2 text-[16px]">
                {intl.formatMessage({
                  defaultMessage: 'Escenarios',
                  id: 'FLPt8k',
                })}
              </h3>
              <VariantPicker />
            </div>
            <Divider className="m-0" key="filters-divider" />
          </>
        ) : null}

        <div className="p-4">
          <h3 className="font-semibold uppercase mb-2 text-[16px]">
            {intl.formatMessage({ defaultMessage: 'Filtros', id: 'cocT5g' })}
          </h3>
          {currentVisualization?.filters?.map((filter, index) => (
            <div key={`${currentVisualization?.metadata?.name}-${filter.code}`}>
              <p className="mb-2 text-gray-700">{filter.name}</p>
              <FilterPicker
                disabled={isDisabled}
                filter={filter}
                key={filter.code}
                comparable={
                  isComparable(currentVisualization) &&
                  index === currentVisualization.filters.length - 1
                }
              />
              <div className="mb-4" />
            </div>
          ))}

          {isComparable(currentVisualization) && (
            <div
              key={`${currentVisualization?.metadata?.name}-${COMPARABLE_KEY}`}
            >
              <p className="mb-2 text-gray-700">
                {currentVisualization?.metadata?.unit?.type}
              </p>
              <FilterPicker
                disabled={isDisabled}
                filter={{
                  name: currentVisualization?.metadata?.unit?.type ?? '',
                  code: COMPARABLE_KEY,
                  options:
                    currentVisualization?.customScales?.map((scale) => ({
                      name: `${scale.toString()} ${
                        currentVisualization?.metadata?.unit?.shortName
                      }`,
                      code: scale.toString(),
                      unit: currentVisualization?.metadata?.unit?.shortName,
                    })) ?? [],
                  defaultOption: {
                    name: `${currentVisualization?.customScales?.[0].toString()} ${
                      currentVisualization?.metadata?.unit?.shortName
                    }`,
                    code:
                      currentVisualization?.customScales?.[0].toString() ?? '',
                    unit: currentVisualization?.metadata?.unit?.shortName,
                  },
                  selectorType:
                    currentVisualization?.customScaleSelectorType ?? 'button',
                }}
                key={COMPARABLE_KEY}
              />
              <div className="mb-4" />
            </div>
          )}
        </div>
        <Divider className="m-0" key="info-divider" />

        {showInfoPanel ? (
          <Collapse
            defaultActiveKey={['1']}
            bordered={false}
            expandIconPosition="end"
            ghost
          >
            <Panel
              header={
                <h3 className="font-semibold uppercase text-[16px]">
                  {intl.formatMessage({
                    defaultMessage: 'Información',
                    id: 'R760dc',
                  })}
                </h3>
              }
              key="1"
            >
              <div className="pb-4">
                <VisualizationInfo />
              </div>
            </Panel>
          </Collapse>
        ) : null}

        {isComparable(currentVisualization) &&
        !!current.featureId &&
        !isEmpty(comparingGeojson) ? (
          <>
            <Divider className="m-0" key="info-divider" />
            <div className="p-4">
              <h3 className="font-semibold uppercase mb-2 text-[16px]">
                {intl.formatMessage({
                  defaultMessage: 'Oportunidades alcanzadas',
                  id: 'iR0iQ+',
                })}
              </h3>
              <ComparableChart />
            </div>
          </>
        ) : null}

        <Divider className="m-0" key="layers-divider" />
        <div className="p-4">
          <h3 className="font-semibold uppercase mb-2 text-[16px]">
            {intl.formatMessage({
              defaultMessage: 'Capas',
              id: 'l6n41c',
            })}
          </h3>
          <MapboxLayerToggle />
        </div>
        <Divider className="m-0" key="legends-divider" />
        <div className="p-4">
          <h3 className="font-semibold uppercase mb-2 text-[16px]">
            {intl.formatMessage({
              defaultMessage: 'Simbología',
              id: 'y2jbOx',
            })}
          </h3>
          <LegendBar />
        </div>
        {showDataSources && (
          <>
            <Divider className="m-0" key="sources-divider" />
            <div className="p-4">
              <h3 className="font-semibold uppercase mb-4 text-[16px]">
                {intl.formatMessage({
                  defaultMessage: 'Fuentes',
                  id: 'SxP79b',
                })}
              </h3>
              <DataSource />
            </div>
          </>
        )}
      </Drawer>

      {isMobile() && !open && !!current?.cityCode && (
        <div className="fixed z-20 bottom-12 right-4">
          <FloatButton
            onClick={() => setOpen(true)}
            icon={
              <span className="material-symbols-outlined leading-normal text-[16px]">
                menu_open
              </span>
            }
          />
        </div>
      )}
    </>
  );
}

export default memo(Sidebar);
