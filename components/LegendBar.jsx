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
}) {
  return (
    <div className="hidden md:block z-30 fixed top-4 left-4 right-4 h-2/3 md:bottom-8 md:w-56 md:max-w-xl md:h-auto md:right-4 md:top-auto md:block">
      <div className="space-y-4">
        {
            transportActive && Object.keys(geojson).length > 0 && (<Download data={geojson} filename={legendTitle} />)
          }
        {/* {
            populationDensity && (<Legend title={densityLegend.title} items={densityLegend.intervals} />)
          } */}
        {
            ageb && agebLegend && (<Legend title={agebLegend.title} items={agebLegend.intervals} />)
          }
        {
            density && densityLegend && (<Legend title={densityLegend.title} items={densityLegend.intervals} />)
          }
        {
            road && roadLegend && (<Legend title={roadLegend.title} items={roadLegend.intervals} />)
          }
        {
            transportActive && legendTitle && legendDictionary && (
              <>
                <Legend title={legendTitle} items={legendDictionary} />
              </>
            )
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
