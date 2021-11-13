import React, { useEffect } from 'react';
import { Button, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LaunchIcon from '@mui/icons-material/Launch';

function Download({ data, filename = 'Geometry' }) {
  useEffect(() => {
    const blob = new Blob([JSON.stringify(data)]);
    const a = document.getElementById('download');
    a.href = URL.createObjectURL(blob);
  }, [data]);

  return (
    <Tooltip
      title={(
        <p>
          Descarga en formato GeoJSON. Este formato puede ser utilizado en la mayoría de los Sistemas de Información Geográfica. Si desea usar en formato KMZ, puede usar la siguiente liga para convertir la descarga:
          <br />
          <a className="underline" href="https://mygeodata.cloud/converter/geojson-to-kmz" target="_blank" rel="noreferrer">
            Convertir a KMZ
            <LaunchIcon className="h-3" />
          </a>
        </p>
)}
      arrow={false}
      placement="left"
    >
      <a href="" id="download" download={`${filename}.geojson`} type="text/json">
        <Button fullWidth variant="contained" endIcon={<InfoOutlinedIcon />}>
          Descargar
        </Button>
      </a>
    </Tooltip>
  );
}

export default Download;
