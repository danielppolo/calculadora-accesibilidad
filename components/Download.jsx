import React, { useEffect } from 'react';
import { Button } from "@mui/material";
import {convertToGeoJSON} from '../utils'
import FileDownloadIcon from '@mui/icons-material/FileDownload';

function Download({ data, filename = 'Geometry' }) {
  useEffect(() => {
    const blob = new Blob([JSON.stringify(convertToGeoJSON(data))]);
    const a = document.getElementById('download');
    a.href = URL.createObjectURL(blob);
  }, [data])

  return(
    <a href="" id="download" download={`${filename}.geojson`} type='text/json'>
      <Button fullWidth variant="contained" startIcon={<FileDownloadIcon/>}>
        Descargar
      </Button>
    </a>
  )
}

export default Download;