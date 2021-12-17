import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import { MenuItem, TextField } from '@mui/material';
import { MEDIUMS, OPPORTUNITIES, TIME_STEPS } from '../constants';
import FacilitiesChart from './FacilitiesChart';
import PeopleChart from './PeopleChart';
import Notes from './tren-maya/Notes';
import LayerSwitch from './LayerSwitch';
import Card from './Card';
import Step from './Step';
import Subtitle from './Subtitle';

const MEDIUM_ICONS = {
  caminando: <DirectionsWalkIcon />,
  bicicleta: <DirectionsBikeIcon />,
  bus_actual: <DirectionsBusFilledIcon />,
};

function ControlsCard({
  cityData,
  transport,
  onMediumChange,
  timeframe,
  onTimeStepChange,
  onOpportunityChange,
  opportunity,
  hexagon,
  reachableOpportunities,
}) {
  return (
    <Card className="p-6 fixed bottom-0 left-0 right-0  z-30 md:bottom-0 md:top-0 md:left-0 md:right-auto md:w-1/3 md:max-w-xl  overflow-y-auto">
      <h1 className="text-3xl font-bold mb-4 text-black">
        Calculadora
        {' '}
        <span className="font-medium">de accesibilidad de oportunidades</span>
      </h1>
      <p className="text-sm mb-6">La accesibilidad a oportunidades estima el acceso a empleos, hospitales, escuelas y puntos turísticos en diferentes modos de transporte sustentable para cada zona de una ciudad. Este proyecto tiene como objetivo mostrar las oportunidades en un radio de 150 kilómetros de Cancún a través de una herramienta interactiva.</p>

      <Subtitle>Oportunidades en la zona</Subtitle>
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
        <div className="mb-8" />
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
      <div className="mb-8" />
      <Subtitle>Explora</Subtitle>
      <div className="mb-6" />
      <Step number={1} title="Da click en un hexágono">
        {!hexagon && <Alert variant="outlined" severity="warning">Da click sobre un hexágono para habilitar los controles</Alert>}
      </Step>
      <div className="mb-6" />
      <Step number={2} title="Selecciona el tiempo">
        <ButtonGroup size="medium" aria-label="large button group" fullWidth>
          {
            TIME_STEPS.map((step) => (
              <Button disabled={!hexagon} variant={timeframe === step ? 'contained' : 'outlined'} key={step} onClick={() => { onTimeStepChange(step); }}>
                {step}
                min
              </Button>
            ))
          }
        </ButtonGroup>
      </Step>
      <div className="mb-6" />
      <Step number={3} title="Selecciona un modo de transporte sustentable.">
        <ButtonGroup size="medium" aria-label="large button group" fullWidth>
          {
            MEDIUMS.map((mdm) => (
              <Button disabled={!hexagon} variant={transport.includes(mdm) ? 'contained' : 'outlined'} key={mdm} onClick={() => { onMediumChange(mdm); }}>
                {MEDIUM_ICONS[mdm]}
              </Button>
            ))
          }
        </ButtonGroup>
      </Step>
      <div className="mb-6" />
      <Step number={4} title="Observa la isocrona y el histograma.">
        {
          reachableOpportunities ? (
            <>
              <p className="text-sm font-medium mb-2 mt-4">Número de empleos alcanzados</p>
              <FacilitiesChart
                data={reachableOpportunities}
              />
              <p className="text-sm font-medium mb-2 mt-4">Número de oportunidades alcanzados</p>
              <PeopleChart
                data={reachableOpportunities}
              />
            </>
          ) : (
            <Alert variant="outlined" severity="warning">Da click sobre un hexágono para obtener más información</Alert>
          )
        }
      </Step>
      <div className="mb-6" />
      <Step number={5} title="Mostrar capa de referencia">
        <LayerSwitch
          title="Usos de suelo urbano"
        />
      </Step>

      <div className="mb-4 mt-4">
        <Divider light />
      </div>

      <Notes />
    </Card>
  );
}

ControlsCard.propTypes = {
  medium: PropTypes.string.isRequired,
  transport: PropTypes.array.isRequired,
  opportunity: PropTypes.string.isRequired,
  timeframe: PropTypes.number.isRequired,
  onOpportunityChange: PropTypes.func.isRequired,
  onTimeStepChange: PropTypes.func.isRequired,
  onMediumChange: PropTypes.func.isRequired,
};

export default ControlsCard;
