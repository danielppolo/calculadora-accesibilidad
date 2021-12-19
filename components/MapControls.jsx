import React from 'react';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import {
  TRANSPORTS, TIMEFRAMES, TRANSPORT_COLORS, OPPORTUNITIES, TRANSPORT_TRANSLATIONS,
} from '../constants';
import Select from './Select'
import ButtonGroup from './ButtonGroup'
import Download from './Download';

const TRANSPORT_ICONS = {
  caminando: <DirectionsWalkIcon fontSize='small'/>,
  bicicleta: <DirectionsBikeIcon fontSize='small'/>,
  bus_actual: <DirectionsBusFilledIcon fontSize='small'/>,
};

function MapControls({
  transport,
  onMediumChange,
  timeframe,
  onTimeStepChange,
  opportunity,
  onOpportunityChange,
  disabled,
  city, 
  onCityChange,
  cities,
  geojson,
  legendTitle,
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:top-4 md:left-4 md:w-80 md:max-w-xl">
      <Select
        value={city?.name}
        options={cities.map(ct => ({
          label: ct.name,
          value: ct.bucketName,
        }))}
        onChange={onCityChange}
        placeholder="Selecciona una ciudad"
      />
      <div className="m-4" />
      <Select
        options={[{
          label: "Situacion actual",
          value: 'today',
        }]}
        disabled={disabled}
        placeholder="Selecciona un escenario"
      />
      <div className="m-4" />
      <Select
        disabled={disabled}
        options={Object.keys(OPPORTUNITIES).map((op) => ({
          label: OPPORTUNITIES[op],
          value: op,
        }))}
        onChange={onOpportunityChange}
        placeholder="Selecciona una oportunidad"
      />
      <div className="m-4" />
       <ButtonGroup
        options={TRANSPORTS.map(mdm => ({
          icon: TRANSPORT_ICONS[mdm],
          // label: TRANSPORT_TRANSLATIONS[mdm],
          onClick: () => onMediumChange(mdm),
          disabled,
          color: TRANSPORT_COLORS[mdm],
          active: transport.includes(mdm),
        }))}
      />
      <div className="m-4" />
      <ButtonGroup
        options={TIMEFRAMES.map(step => ({
          label: `${step} min`,
          onClick: () => onTimeStepChange(step),
          disabled,
          active: timeframe === step,
        }))}
      />
      <div className="m-4" />
      <Download data={geojson} filename={legendTitle} />
      <div className="text-black text-blue text-red text-green text-yellow text-purple text-pink text-orange hidden"></div>
    </div>
  );
}

export default MapControls;
