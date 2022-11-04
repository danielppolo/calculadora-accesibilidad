import { FeatureCollection, Polygon } from 'geojson';
import React from 'react';
// @ts-ignore
import tokml from 'tokml';
import Select from 'src/components/Select';

interface DownloadProps {
  data: FeatureCollection<Polygon>;
  filename?: string;
}

type DownloadFormat = 'kml' | 'geojson';

function Download({ data: geojson, filename = 'Geometry' }: DownloadProps) {
  if (!geojson) {
    return null;
  }

  const handleSelectChange = (type: string) => {
    if (type === 'kml' && geojson) {
      const kml = tokml(geojson, {
        name: filename,
      });
      const blob = new Blob([kml]);
      const a = document.getElementById('download-kml') as HTMLAnchorElement;
      a.download = filename;
      a.href = URL.createObjectURL(blob);
      a.click();
    } else if (type === 'geojson' && geojson) {
      const json = JSON.stringify(geojson);
      const blob = new Blob([json]);
      const a = document.getElementById(
        'download-geojson'
      ) as HTMLAnchorElement;
      a.download = filename;
      a.href = URL.createObjectURL(blob);
      a.click();
    }
  };

  return (
    <div>
      <Select
        variant="dark"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        }
        value="Descargar selección"
        onChange={handleSelectChange}
        options={[
          {
            value: 'kml',
            label: 'KML',
          },
          {
            value: 'geojson',
            label: 'GeoJSON',
          },
        ]}
      />
      <a className="hidden" id="download-kml" />
      <a className="hidden" id="download-geojson" />
    </div>
  );
}

export default Download;
