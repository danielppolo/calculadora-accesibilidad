import React from 'react';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import { OPPORTUNITIES } from '../constants';
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
    <Card className="py-4 px-6 fixed bottom-0 left-0 right-0 shadow-xl z-30 md:bottom-0 md:top-4 md:right-4 md:left-auto md:w-96 md:max-w-xl overflow-y-auto">
      <Subtitle>{title}</Subtitle>
      <p className="text-sm mb-4">Para toda la zona, se cuentan con el siguiente número de oportunidades totales:</p>
      <div>
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
      </div>
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
  );
}

export default ControlsCard;
