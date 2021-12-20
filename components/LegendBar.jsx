import React from 'react';
import PropTypes from 'prop-types';
import Legend from './Legend';
import Download from './Download';

function LegendBar({
  legendTitle,
  legendDictionary,
  agebLegend,
  ageb,
  geojson,
}) {
  return (
    <div className="hidden md:static z-30 fixed top-4 left-4 right-4 h-2/3 md:bottom-8 md:w-56 md:max-w-xl md:h-auto md:right-4 md:top-auto md:block">
      <div className="space-y-4">
        {
            Object.keys(geojson).length > 0 && (<Download data={geojson} filename={legendTitle} />)
          }
        {/* {
            populationDensity && (<Legend title={densityLegend.title} items={densityLegend.intervals} />)
          } */}
        {
            ageb && agebLegend && (<Legend title={agebLegend.title} items={agebLegend.intervals} />)
          }
        {
            legendTitle && legendDictionary && (
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
  legendTitle: PropTypes.string.isRequired,
  legendDictionary: PropTypes.object.isRequired,
  agebLegend: PropTypes.object.isRequired,
};

export default LegendBar;
