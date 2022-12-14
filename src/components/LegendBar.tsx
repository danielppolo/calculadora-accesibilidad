import React from 'react';
import Legend from 'src/components/Legend';
import Download from 'src/components/Download';
import { useMapboxLayerManager } from 'src/context/mapboxLayerManager';
import useCurrentCity from 'src/hooks/data/useCurrentCity';
import { useMapParams } from 'src/context/mapParams';

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
  const { current } = useMapParams();
  const getCurrentCity = useCurrentCity();
  const currentCity = getCurrentCity(current);
  const { legend, geojson } = useMapboxLayerManager();

  return (
    <div>
      <div>
        {currentCity && legend?.title && legend?.intervals && (
          <div className="w-full">
            <Legend title={legend?.title} items={legend?.intervals} />

            {currentCity &&
              // transportActive &&
              geojson &&
              Object.keys(geojson).length > 0 && (
                <Download data={geojson} filename={legend?.title} />
              )}
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
