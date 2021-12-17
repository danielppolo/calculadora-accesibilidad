import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import LayersIcon from '@mui/icons-material/Layers';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import Legend from './Legend';

function LegendBar({
  geojson,
  legendTitle,
  legendDictionary,
  current,
}) {
  const [showLegend, setShowLegend] = useState(false);

  return (
    <>
      <div className="block fixed bottom-4 right-4 z-50 md:hidden">
        <Fab color="primary" onClick={() => { setShowLegend(!showLegend); }} size="medium" aria-label="add">
          {showLegend ? <LayersClearIcon /> : <LayersIcon />}
        </Fab>
      </div>
      <div className={`overflow-y-auto z-50 fixed top-4 left-4 right-4 h-2/3 md:bottom-8 md:right-4 md:w-52 md:h-auto md:left-auto md:top-auto md:block ${!showLegend && 'hidden'}`}>
        <div className="space-y-4">
          {/* {
            populationDensity && (<Legend title={densityLegend.title} items={densityLegend.intervals} />)
          } */}
          {
            current && legendTitle && legendDictionary && (
              <Legend title={legendTitle} items={legendDictionary} />
            )
          }
        </div>
      </div>
    </>
  );
}

export default LegendBar;
