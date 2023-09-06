/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
// @ts-ignore
import tokml from 'tokml';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useMapboxLayerManager } from 'src/context/mapboxLayerManager';
import { useMapParams } from 'src/context/mapParams';
import { useIntl } from 'react-intl';

function Download() {
  const intl = useIntl();
  const { current } = useMapParams();
  const { legend, geojson } = useMapboxLayerManager();
  const filename = legend?.title ?? 'Geometría';
  const isDisabled =
    !current.cityCode || !geojson || !Object.keys(geojson).length;

  const handleGeoJSONClick = () => {
    const json = JSON.stringify(geojson);
    const blob = new Blob([json]);
    const a = document.getElementById('download-geojson') as HTMLAnchorElement;
    a.download = filename;
    a.href = URL.createObjectURL(blob);
    a.click();
  };

  const handleKMLClick = () => {
    const kml = tokml(geojson, {
      name: filename,
    });
    const blob = new Blob([kml]);
    const a = document.getElementById('download-kml') as HTMLAnchorElement;
    a.download = filename;
    a.href = URL.createObjectURL(blob);
    a.click();
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <button type="button" onClick={handleGeoJSONClick}>
          {intl.formatMessage({
            defaultMessage: 'Descargar GeoJSON',
            id: '/QrB8L',
          })}
        </button>
      ),
    },
    {
      key: '2',
      label: (
        <button type="button" onClick={handleKMLClick}>
          {intl.formatMessage({
            defaultMessage: 'Descargar KML',
            id: 'uJYoa5',
          })}
        </button>
      ),
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} placement="topRight" disabled={isDisabled}>
        <Button
          className="bg-white"
          shape="circle"
          size="large"
          type="default"
          disabled={isDisabled}
          icon={
            <span className="material-symbols-outlined leading-normal text-[16px]">
              download
            </span>
          }
        />
      </Dropdown>
      <a className="hidden" id="download-kml" />
      <a className="hidden" id="download-geojson" />
    </>
  );
}

export default Download;
