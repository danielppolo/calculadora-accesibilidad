import React from 'react';
import { useMapParams } from 'src/context/mapParams';
import useCurrentVariant from 'src/hooks/data/useCurrentVariant';
import { Tooltip } from 'antd';

function DataSource() {
  const { current } = useMapParams();
  const getCurrentVariant = useCurrentVariant();
  const currentVariant = getCurrentVariant(current);
  const dataSources = currentVariant?.dataProviders;

  if (!dataSources?.length) return null;

  return (
    <div className="flex gap-4 mb-4">
      {dataSources?.map((dataSource) => (
        <Tooltip title={dataSource.label}>
          <a
            className="underline"
            href={dataSource.url}
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="max-h-8 inline-block"
              src={`https:${dataSource.logo?.file?.url}`}
              alt=""
            />
          </a>
        </Tooltip>
      ))}
    </div>
  );
}

export default DataSource;
