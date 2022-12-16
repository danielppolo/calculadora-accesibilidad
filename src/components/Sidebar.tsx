import React, { memo } from 'react';
import LegendBar from 'src/components/LegendBar';
import Controls from 'src/components/Controls';
import Notes from 'src/components/Notes';
import Overview from 'src/components/CitiesOverview';
import { MapboxLayerManager } from 'src/types';
import DataSource from './DataSource';

interface SidebarProps {
  economicLayer: MapboxLayerManager;
  densityLayer: MapboxLayerManager;
  roadLayer: MapboxLayerManager;
}

function Sidebar({ economicLayer, densityLayer, roadLayer }: SidebarProps) {
  return (
    <div className="fixed top-2 left-2 right-2 z-30 bg-white md:top-0 md:left-0 bottom-0 md:w-[25rem] md:max-w-xl overflow-y-auto border border-gray-300 border-r border-b-0 border-l-0 border-t-0">
      <div className="flex h-full flex-col">
        <div className="grow p-4">
          <Overview />
          <Controls />
          {/* <Charts /> */}
        </div>
        <div className="px-4">
          <DataSource />
          <Notes />
        </div>
        <LegendBar
          economicLayer={economicLayer}
          densityLayer={densityLayer}
          roadLayer={roadLayer}
        />
      </div>
      <div className="hidden flex items-center justify-center animate-pulse rounded-full h-4 w-4 opacity-5  absolute rounded-full h-2 w-2" />
    </div>
  );
}

export default memo(Sidebar);
