import React, { useEffect } from 'react';
import { Button, Tooltip } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function Download({ data, filename = 'Geometry' }) {
  useEffect(() => {
    const blob = new Blob([JSON.stringify(data)]);
    const a = document.getElementById('download');
    a.href = URL.createObjectURL(blob);
  }, [data])

  return(
    <Tooltip title="Descarga en formato GeoJSON. Este formato puede ser utilizado en la mayoría de los Sistemas de Información Geográfica." arrow={false} placement="left">
      <a href="" id="download" download={`${filename}.geojson`} type='text/json'>
        <Button fullWidth variant="contained" endIcon={<InfoOutlinedIcon/>}>
          Descargar
        </Button>
      </a>
    </Tooltip>
  )
}

export default Download;