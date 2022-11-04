import React, { memo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FacilitiesChart from 'src/components/FacilitiesChart';
import PeopleChart from 'src/components/PeopleChart';
import Notes from 'src/components/Notes';
import Card from 'src/components/Card';
import Subtitle from 'src/components/Subtitle';
import { ChartData } from 'chart.js';

interface ControlsCardProps {
  title?: string;
  cityData: Record<string, number>;
  reachableOpportunities?: ChartData<'bar'>;
  reachableFacilities?: ChartData<'bar'>;
}

function ControlsCard({
  title,
  cityData,
  reachableOpportunities,
  reachableFacilities,
}: ControlsCardProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`${
        expanded ? 'bottom-0' : '-bottom-2/3'
      } duration-500 fixed left-0 right-0 z-30 md:bottom-auto md:top-0 md:right-0 md:left-auto md:w-96 md:max-w-xl md:max-h-screen`}
    >
      <Card
        onClick={() => setExpanded(!expanded)}
        className="px-3 py-4 m-2 md:py-4 md:px-6 md:m-4 overflow-y-auto"
      >
        <div className="flex justify-between items-start">
          <Subtitle>{title}</Subtitle>
          <button
            onClick={() => setExpanded(false)}
            type="button"
            className="text-black bg-white font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center md:hidden"
          >
            {expanded ? <CloseIcon /> : <OpenInNewIcon />}
          </button>
        </div>
        {Object.keys(cityData).map((key) => (
          <div
            key={key}
            className="flex flex-row items-center justify-between mb-0"
          >
            <p className="text-sm">
              <span className="font-semibold" key={key}>
                {key}
              </span>
              : <span>{Intl.NumberFormat('es-mx').format(cityData[key])}</span>
            </p>
          </div>
        ))}
        <div className="mb-6" />
        {reachableOpportunities && (
          <div>
            <p className="text-sm font-medium mb-2 mt-4">
              % de empleos de la ciudad alcanzables desde hexágono
            </p>
            <FacilitiesChart data={reachableOpportunities} />
          </div>
        )}
        {reachableFacilities && (
          <div>
            <p className="text-sm font-medium mb-2 mt-4">
              % de oportunidades de la ciudad alcanzables desde hexágono
            </p>
            <PeopleChart data={reachableFacilities} />
          </div>
        )}
        <div className="mb-6" />
        <Notes />
      </Card>
    </div>
  );
}

export default memo(ControlsCard);
