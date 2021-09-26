import mapboxgl from 'mapbox-gl';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { MEDIUMS, OPPORTUNITIES, TIME_STEPS } from '../constants/transport';
import useLayerManager from '../hooks/useLayerManager';
import InfoCard from './InfoCard';
import Legend from './Legend';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;

const CANCUN_COORDINATES = [-86.879, 21.1427];

const getHexagonId = (hexagonId, medium, step) => `${hexagonId}-${medium}-${step}`;
const defaultOpportunity = Object.keys(OPPORTUNITIES)[0];
const defaultMedium = MEDIUMS[0];
const defaultTimeStep = TIME_STEPS[0];

function Map({ city, data }) {
  const [map, setMap] = useState(null);
  const {
    state,
    current,
    legend,
    add,
    show,
  } = useLayerManager(map);
  const [firstDraw, setFirstDraw] = useState(false);
  const [opportunity, setOpportunity] = useState(defaultOpportunity);
  const [hexagon, setHexagon] = useState();
  const [medium, setMedium] = useState(defaultMedium);
  const [timeStep, setTimeStep] = useState(defaultTimeStep);
  const features = Object.values(data);
  const legendTitle = current in OPPORTUNITIES ? `Número de ${OPPORTUNITIES[current]?.toLowerCase()}` : 'Tiempo de traslado en minutos'

  useEffect(() => {
    setMap(new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: CANCUN_COORDINATES,
      zoom: 12,
    }))
  }, []);

  useEffect(() => {
   if (map && features.length > 0 && !firstDraw) {
    //  map.on('load', () => {
      Object.keys(OPPORTUNITIES).forEach((key) => {
        const values = features.map((item) => item.properties[key]);
        if (!(key in state)) {
          add({
            map,
            id: key,
            features,
            property: key,
            maxValue: Math.max(...values),
            visible: false,
          });
        }
      });
      show(map, opportunity)
      setFirstDraw(true)
    // })
   }
  }, [map, features, firstDraw])

  useEffect(() => {
    if (map && current) {
      console.log('Attaching click to', current);
      map.on('click', current, async (e) => {
        const feature = e.features[0].properties
        const featureId = e.features[0].properties.h3_ddrs;
        console.log('Clicked', featureId);
        // Fetch data
        const response = await fetch(`/api/cities/${city}/features/${featureId}`);
        const text = await response.text();
        const json = JSON.parse(text);

        // Create 9 isochrone variant layers
        MEDIUMS.forEach((med, i) => {
          TIME_STEPS.forEach((step) => {
            const filteredIds = Object.keys(json).filter((id) => json[id][i] < step);
            const hexagons = filteredIds.map((id) => ({
              ...data[id],
              properties: {
                ...data[id].properties,
                [med]: json[id][1],
              },
            }));
            const max = Math.max(...hexagons.map((item) => item.properties[med]));
            add({
              map,
              id: getHexagonId(featureId, med, step),
              features: hexagons,
              property: med,
              maxValue: max,
              visible: false,
            });
          });
        });

        // Show default isochrone
        console.log(getHexagonId(featureId, medium, timeStep))
        show(map, getHexagonId(featureId, medium, timeStep));
        setHexagon({
          id: featureId,
          ...feature,
        });
        setOpportunity(undefined);
      });
    }
  }, [map, current]);

  const handleOpportunityChange = (event) => {
    const nextOpportunity = event.target.value;
    show(map, nextOpportunity);
    setOpportunity(nextOpportunity);
    setHexagon(undefined);
  };

  const handleMediumChange = (value) => {
    if (hexagon?.id) {
      show(map, getHexagonId(hexagon.id, value, timeStep));
    } 
    setMedium(value);
  };
  const handleTimeStepChange = (value) => {
    if (hexagon?.id) {
      show(map, getHexagonId(hexagon.id, medium, value));
    }
    setTimeStep(value);
  };
  

  return (
    <>
      <InfoCard
        hexagon={hexagon}
        opportunity={opportunity}
        onOpportunityChange={handleOpportunityChange}
        medium={medium}
        onMediumChange={handleMediumChange}
        timeStep={timeStep}
        onTimeStepChange={handleTimeStepChange}
      />
      {
        current && (<Legend title={legendTitle} items={legend}/>)
      }
      <div id="map" className="w-screen h-screen" />
    </>
  );
};

Map.propTypes = {
  city: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Map;
