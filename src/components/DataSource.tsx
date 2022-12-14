import { Button, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LaunchIcon from '@mui/icons-material/Launch';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useMapParams } from 'src/context/mapParams';
import useCurrentVariant from 'src/hooks/data/useCurrentVariant';

function DataSource() {
  const { current } = useMapParams();
  const getCurrentVariant = useCurrentVariant();
  const currentVariant = getCurrentVariant(current);
  const dataSource = currentVariant?.dataProvider;

  if (!dataSource) return null;

  return (
    <div>
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
    </div>
  );
}

export default DataSource;
