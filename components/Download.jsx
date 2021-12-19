import React from 'react';
import tokml from 'tokml';
import Select from './Select';

function Download({ data: geojson, filename = 'Geometry'}) {
  if (!geojson) {
    return null;
  }

  const handleSelectChange = (type) => {
    if (type === 'kml' && geojson) {
      const kml = tokml(geojson, {
        name: filename,
      });
      const blob = new Blob([kml]);
      const a = document.getElementById('download-kml');
      a.download = filename;
      a.href = URL.createObjectURL(blob);
      a.click()
    } else if (type === 'geojson' && geojson) {
      const json = JSON.stringify(geojson);
      const blob = new Blob([json]);
      const a = document.getElementById('download-geojson');
      a.download = filename;
      a.href = URL.createObjectURL(blob);
      a.click()
    }
  }

  return (
    <div>
      <Select 
        value="Descargar selección"
        onChange={handleSelectChange}
        options={[{
          value: 'kml',
          label: 'KML',
        },
        {
          value: 'geojson',
          label: 'GeoJSON',
        }
      ]}
    />
    <a className='hidden' id="download-kml"/>
    <a className='hidden' id="download-geojson"/>
    </div>
  )
}

export default Download;
