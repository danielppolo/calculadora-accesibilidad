import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import { IconButton, MenuItem, TextField } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import CloseIcon from '@mui/icons-material/Close';
import { OPPORTUNITIES } from '../constants';
import FacilitiesChart from './FacilitiesChart';
import PeopleChart from './PeopleChart';
import Card from './Card';
import Step from './Step';
import Subtitle from './Subtitle';
import Download from './Download';

function InfoCard({
  cityData,
  onOpportunityChange,
  opportunity,
  reachableOpportunities,
  geojson,
  legendTitle,
}) {
  const [pinned, setPinned] = useState(true);

  return (
    <Card className={`shadow-2xl p-6 fixed z-30 overflow-y-auto duration-500 md:top-4 md:bottom-auto ${pinned ? 'md:left-4' : 'md:-left-92'} hover:left-4 md:w-96 md:max-w-xl`}>
      <div className="flex justify-between items-start">
        <Subtitle>CDMX</Subtitle>
        <IconButton>
          {
            !pinned
              ? <PushPinIcon onClick={() => setPinned(true)} />
              : <CloseIcon onClick={() => setPinned(false)} />
          }
        </IconButton>
      </div>
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
        <div className="mb-6" />
        <p className="text-md font-medium mb-2 text-black">Oportunidad a visualizar</p>
        <TextField
          select
          onChange={onOpportunityChange}
          value={opportunity}
          name="opportinuty"
          label={opportunity ? '' : 'Selecciona oportunidad'}
          fullWidth
          InputLabelProps={{
            shrink: false,
          }}
        >
          {
            Object.keys(OPPORTUNITIES)
              .map((op) => <MenuItem value={op} key={op}>{OPPORTUNITIES[op]}</MenuItem>)
          }
        </TextField>
      </div>
      <div className="mb-6" />
      {
          reachableOpportunities ? (
            <>
              <p className="text-sm font-medium mb-2 mt-4">Número de oportunidades al alcance</p>
              <FacilitiesChart
                data={reachableOpportunities}
              />
              <div className="my-6" />
              <p className="text-sm font-medium mb-2 mt-4">Número de oportunidades al alcance</p>
              <PeopleChart
                data={reachableOpportunities}
              />
            </>
          ) : (
            <Alert variant="outlined" severity="warning">Da click sobre un hexágono para obtener más información</Alert>
          )
        }
      <Download data={geojson} filename={legendTitle} type="kml" />
    </Card>
  );
}

export default InfoCard;
