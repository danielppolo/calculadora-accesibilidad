import React from 'react';
import PropTypes from 'prop-types';
import Legend from 'src/components/Legend';
import Download from 'src/components/Download';
import { Legend as LegendType } from 'src/types';
import { FeatureCollection, Polygon } from 'geojson';

interface LegendBarProps {
  legendTitle: string;
  road?: boolean;
  roadLegend?: LegendType;
  densityLegend?: LegendType;
  density?: boolean;
  ageb?: boolean;
  agebLegend?: LegendType;
  legendDictionary: LegendType['intervals'],
  geojson?: FeatureCollection<Polygon>
  transportActive?: boolean;
  city?: string;
}

function LegendBar({
  roadLegend,
  road,
  densityLegend,
  density,
  legendTitle,
  legendDictionary,
  agebLegend,
  ageb,
  geojson,
  transportActive,
  city,
}: LegendBarProps) {
  return (
    <div className="hidden z-30 fixed top-4 left-4 right-4 h-2/3 md:bottom-8 md:h-auto md:top-auto md:inline-flex md:right-auto">
      <div className="inline-flex space-x-4">
        {
          city && legendTitle && legendDictionary && (
            <div className='flex-col align-bottom justify-end space-y-4'>
              {
                city && transportActive && geojson && Object.keys(geojson).length > 0 && (<Download data={geojson} filename={legendTitle} />)
              }
              <Legend title={legendTitle} items={legendDictionary} />
            </div>
          )
        }
        {
          ageb && agebLegend && (
            <div className='flex items-end'>
              <Legend title={agebLegend.title} items={agebLegend.intervals} />
            </div>
          )
        }
        {
          density && densityLegend && (
            <div className='flex items-end'>
              <Legend title={densityLegend.title} items={densityLegend.intervals} />
            </div>
          )
        }
        {
          road && roadLegend && (
            <div className='flex items-end'>
              <Legend title={roadLegend.title} items={roadLegend.intervals} />
            </div>
          )
        }

      </div>
    </div>
  );
}


export default LegendBar;
