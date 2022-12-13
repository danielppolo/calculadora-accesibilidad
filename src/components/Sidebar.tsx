import React from 'react';
import LegendBar from 'src/components/LegendBar';
import Controls from 'src/components/Controls';
import Notes from 'src/components/Notes';
import GlobalControls from './GlobalControls';

function Sidebar() {
  return (
    <div className="fixed top-2 left-2 right-2 p-4 z-30 bg-white md:top-0 md:left-0 bottom-0 md:w-80 md:max-w-xl">
      <Controls />
      {/* <Charts /> */}
      <LegendBar />
      <Notes />
      <GlobalControls />
      <div className="hidden flex items-center justify-center animate-pulse rounded-full h-4 w-4 opacity-5  absolute rounded-full h-2 w-2" />
    </div>
  );
}

export default Sidebar;
