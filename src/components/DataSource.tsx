import React from 'react';
import { useMapParams } from 'src/context/mapParams';
import useCurrentVariant from 'src/hooks/data/useCurrentVariant';

function DataSource() {
  const { current } = useMapParams();
  const getCurrentVariant = useCurrentVariant();
  const currentVariant = getCurrentVariant(current);
  const dataSources = currentVariant?.dataProviders;

  if (!dataSources?.length) return null;

  return (
    <div>
      {dataSources?.map((dataSource) => (
        <p className="text-xs">
          Source:{' '}
          <a
            className="underline"
            href={dataSource.url}
            target="_blank"
            rel="noreferrer"
          >
            {dataSource.name}
          </a>
        </p>
      ))}
    </div>
  );
}

export default DataSource;
