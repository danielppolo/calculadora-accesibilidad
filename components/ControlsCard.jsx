import React, { memo } from 'react';
import FacilitiesChart from './FacilitiesChart';
import PeopleChart from './PeopleChart';
import Notes from './tren-maya/Notes';
import Card from './Card';
import Subtitle from './Subtitle';

function ControlsCard({
  title,
  cityData,
  reachableOpportunities,
  reachableFacilities,
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:bottom-auto md:top-0 md:right-0 md:left-auto md:w-96 md:max-w-xl md:max-h-screen">
      <Card className="py-4 px-6 m-4 overflow-y-auto">
      <Subtitle>{title}</Subtitle>
        {
          Object.keys(cityData).map((key) => (
            <div key={key} className="flex flex-row items-center justify-between mb-0">
              <p className="text-sm">
                <span className="font-semibold" key={key}>{key}</span>
                :
                {' '}
                <span>{Intl.NumberFormat('es-mx').format(cityData[key])}</span>
              </p>
            </div>
          ))
        }
      <div className="mb-6" />
        {
          reachableOpportunities && (
          <div>
            <p className="text-sm font-medium mb-2 mt-4">Número de empleos alcanzados</p>
            <FacilitiesChart
              data={reachableOpportunities}
            />
          </div>
          )
        }
        {
          reachableFacilities && (
            <div>
              <p className="text-sm font-medium mb-2 mt-4">Número de oportunidades alcanzados</p>
              <PeopleChart
                data={reachableFacilities}
              />
            </div>
          )
        }
      <div className="mb-6" />
      <Notes />
    </Card>
    </div>
  );
}

export default memo(ControlsCard);
