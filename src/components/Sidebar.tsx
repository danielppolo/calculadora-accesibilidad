import React, { useState, useMemo } from 'react';
import { Popup } from 'mapbox-gl';
import useLayerManager from 'src/hooks/useLayerManager';
import LegendBar from 'src/components/LegendBar';
import useMapFit from 'src/hooks/useMapFit';
import useCityData from 'src/hooks/useCityData';
import Charts from 'src/components/ControlsCard';
import Controls from 'src/components/Controls';
import getHexagonId from 'src/utils/getHexagonId';
import calculateTime, { calculateTimeForOpp } from 'src/utils/calculateTime';
import getOpportunityId from 'src/utils/getOpportunityId';
import count from 'src/utils/countFeatures';
import useCityMarkers from 'src/hooks/useCityMarkers';
import usePopulationDensity from 'src/hooks/usePopulationDensity';
import useNationalRoadNetwork from 'src/hooks/useNationalRoadNetwork';
import { City, Code, Config, FeatureDictionary } from 'src/types';
import { getGridId } from 'src/utils/getLayerIds';
import { useMap } from 'src/context/map';
import { getVisualizationForFeature } from 'src/utils/api';
import { useMapParams } from 'src/context/mapParams';
import Notes from 'src/components/Notes';
import useGrid from 'src/hooks/data/useGrid';
import useGridRender from 'src/hooks/data/useGridRender';
import useIsochroneRender from 'src/hooks/data/useIsochroneRender';

interface MapLayerProps {
  config?: Config;
}

function MapLayer({ config = {} }: MapLayerProps) {
  useCityMarkers();
  useGridRender();
  useIsochroneRender();

  console.log(config);
  // useHexagonClickListener();
  const map = useMap();
  const { data: gridDictionary } = useGrid();
  const current = useMapParams();
  const { state, legend, add, show, hideAll, geojson } = useLayerManager();
  useMapFit(geojson?.features);

  return (
    <div className="fixed top-2 left-2 right-2 p-4 z-30 backdrop-blur-2xl md:top-0 md:left-0 bottom-0 md:w-80 md:max-w-xl">
      <Controls />
      <Charts />
      <LegendBar
        geojson={geojson}
        legendTitle={legend.title}
        legendDictionary={legend.intervals}
      />
      <Notes />
      <div className="hidden flex items-center justify-center animate-pulse rounded-full h-4 w-4 opacity-5  absolute rounded-full h-2 w-2" />
    </div>
  );
}

export default MapLayer;
