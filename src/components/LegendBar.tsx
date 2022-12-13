import React from 'react';
import Legend from 'src/components/Legend';
import Download from 'src/components/Download';
import { useMapboxLayerManager } from 'src/context/mapboxLayerManager';
import useCurrentCity from 'src/hooks/data/useCurrentCity';

// interface LegendBarProps {
//   legendTitle: string;
//   road?: boolean;
//   roadLegend?: LegendType;
//   densityLegend?: LegendType;
//   density?: boolean;
//   ageb?: boolean;
//   agebLegend?: LegendType;
//   legendDictionary: LegendType['intervals'];
//   geojson?: FeatureCollection<Polygon>;
//   transportActive?: boolean;
//   currentCity?: string;
// }

function LegendBar() {
  const currentCity = useCurrentCity();
  const { legend, geojson } = useMapboxLayerManager();

  return (
    <div>
      <div className="inline-flex space-x-4">
        {currentCity && legend?.title && legend?.intervals && (
          <div className="flex-col align-bottom justify-end space-y-4">
            {currentCity &&
              // transportActive &&
              geojson &&
              Object.keys(geojson).length > 0 && (
                <Download data={geojson} filename={legend?.title} />
              )}
            <Legend title={legend?.title} items={legend?.intervals} />
          </div>
        )}
        {/* {ageb && agebLegend && (
          <div className="flex items-end">
            <Legend title={agebLegend.title} items={agebLegend.intervals} />
          </div>
        )}
        {density && densityLegend && (
          <div className="flex items-end">
            <Legend
              title={densityLegend.title}
              items={densityLegend.intervals}
            />
          </div>
        )}
        {road && roadLegend && (
          <div className="flex items-end">
            <Legend title={roadLegend.title} items={roadLegend.intervals} />
          </div>
        )} */}
      </div>
    </div>
  );
}

export default LegendBar;
