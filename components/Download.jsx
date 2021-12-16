import React, { useEffect } from 'react';
import { Button, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LaunchIcon from '@mui/icons-material/Launch';
import tokml from 'tokml';

function Download({ data: geojson, filename = 'Geometry', type = 'geojson' }) {
  useEffect(() => {
    if (type === 'kml' && geojson) {
      const kml = tokml(geojson, {
        name: filename,
      });
      const blob = new Blob([kml]);
      const a = document.getElementById('download-kml');
      a.href = URL.createObjectURL(blob);
    } else if (type === 'geojson' && geojson) {
      const json = JSON.stringify(geojson);
      const blob = new Blob([json]);
      const a = document.getElementById('download-geojson');
      a.href = URL.createObjectURL(blob);
    }
  }, [filename, geojson, type]);

  if (!geojson) {
    return null;
  }

  if (type === 'kml') {
    return (
      <Tooltip
        title={(
          <p>
            Descarga en formato KML. Este formato puede ser utilizado en la mayoría de los Sistemas de Información Geográfica.
          </p>
        )}
        arrow={false}
        placement="left"
      >
        <a id="download-kml" href="" download={`${filename}.kml`} type="text">
          <Button fullWidth variant="contained" endIcon={<InfoOutlinedIcon />}>
            Descargar
          </Button>
        </a>
      </Tooltip>
    );
  }

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
      <a id="download-geojson" href="" download={`${filename}.geojson`} type="text/json">
        <Button fullWidth variant="contained" endIcon={<InfoOutlinedIcon />}>
          Descargar
        </Button>
      </a>
    </Tooltip>
  );
}

export default Download;
