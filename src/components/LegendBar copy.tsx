import React from 'react';
import Legend from 'src/components/Legend';
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
    <div className="border border-gray-300 border-t border-b-0 border-r-0 border-l-0 w-full py-4">
      {currentCity && legend?.title && legend?.intervals && (
        <Legend title={legend?.title} items={legend?.intervals} />
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
  );
}

export default LegendBar;
