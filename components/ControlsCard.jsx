import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
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
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`${expanded ? 'bottom-0' : '-bottom-2/3'} duration-500 fixed left-0 right-0 z-30 md:bottom-auto md:top-0 md:right-0 md:left-auto md:w-96 md:max-w-xl md:max-h-screen`}>
      <Card
        onClick={() => setExpanded(!expanded)}
        className="px-3 py-4 m-2 md:py-4 md:px-6 md:m-4 overflow-y-auto"
      >
        <div className="flex justify-between items-start">
          <Subtitle>{title}</Subtitle>
          <button
            onClick={() => setExpanded(false)}
            type="button"
            className="text-black bg-white  font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center "
          >
            {expanded ? <CloseIcon /> : <OpenInNewIcon />}
          </button>
        </div>
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

ControlsCard.propTypes = {
  title: PropTypes.string.isRequired,
  cityData: PropTypes.object.isRequired,
  reachableOpportunities: PropTypes.object.isRequired,
  reachableFacilities: PropTypes.object.isRequired,
};

export default memo(ControlsCard);
