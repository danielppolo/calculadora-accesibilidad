import React from 'react';
import PropTypes from 'prop-types';
import Legend from './Legend';
import Download from './Download';

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
}) {
  return (
    <div className="hidden z-30 fixed top-4 left-4 right-4 h-2/3 md:bottom-8 md:h-auto md:top-auto md:inline-flex md:right-auto">
      <div className="inline-flex space-x-4">
      {
            city && legendTitle && legendDictionary && (
              <>
                <Legend title={legendTitle} items={legendDictionary} />
              </>
            )
          }
        {
            city && transportActive && Object.keys(geojson).length > 0 && (<Download data={geojson} filename={legendTitle} />)
          }
        {
            ageb && agebLegend && (<Legend title={agebLegend.title} items={agebLegend.intervals} />)
          }
        {
            density && densityLegend && (<Legend title={densityLegend.title} items={densityLegend.intervals} />)
          }
        {
            road && roadLegend && (<Legend title={roadLegend.title} items={roadLegend.intervals} />)
          }
       
      </div>
    </div>
  );
}

LegendBar.propTypes = {
  roadLegend:PropTypes.object.isRequired,
  road:PropTypes.bool.isRequired,
  densityLegend:PropTypes.object.isRequired,
  density:PropTypes.bool.isRequired,
  legendTitle: PropTypes.string.isRequired,
  legendDictionary: PropTypes.object.isRequired,
  agebLegend: PropTypes.object.isRequired,
  transportActive: PropTypes.bool.isRequired,
};

export default LegendBar;
