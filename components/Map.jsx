import mapboxgl from 'mapbox-gl';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CANCUN_COORDINATES, MEDIUMS, OPPORTUNITIES, TIME_STEPS } from '../constants';
import useLayerManager from '../hooks/useLayerManager';
import InfoCard from './InfoCard';
import Legend from './Legend';
import useCancunLayers from '../hooks/useCancunLayers';
import useMarginalizationLayers from '../hooks/useMarginalizationLayers';
import CancunLegend from './CancunLegend';
import useMap from '../hooks/useMap';
import Download from './Download';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN

const getHexagonId = (hexagonId, medium, step) => `${hexagonId}-${medium}-${step}`;
const defaultOpportunity = Object.keys(OPPORTUNITIES)[0];
const defaultMedium = MEDIUMS[0];
const defaultTimeStep = TIME_STEPS[1];
const count = (array, property) => array.reduce((acc, item) => acc + item.properties[property], 0);

function Map({ city, data }) {
  const map = useMap({center: CANCUN_COORDINATES});
  const {
    state,
    current,
    legend,
    metadata,
    add,
    show,
    hide,
    geojson,
  } = useLayerManager(map);
  const [rendered, setRendered] = useState(false);
  const [opportunity, setOpportunity] = useState(defaultOpportunity);
  const [hexagon, setHexagon] = useState();
  const [medium, setMedium] = useState(defaultMedium);
  const [timeStep, setTimeStep] = useState(defaultTimeStep);
  const [features, setFeatures] = useState(Object.values(data));
  const [opportunities, setOpportunities] = useState({});
  const [economicTiles, setEconomicTiles] = useState(false);
  const { load: loadAgebs, show: showAgebs, hide: hideAgebs, legend: agebLegend } = useMarginalizationLayers(map)
  const {load: loadCancun} = useCancunLayers(map)
  
  useEffect(() => {
    if (data) {
      const nextFeatures = Object.values(data)
      setFeatures(nextFeatures);
      setOpportunities({
        Trabajos: count(nextFeatures, 'jobs_w'), 
        Empresas: count(nextFeatures, 'empress'), 
        Clínicas: count(nextFeatures, 'clinics'), 
        Escuelas: count(nextFeatures, 'escuels'),
        'Zonas turísticas': count(nextFeatures, 'destins'),
      })
    }
  }, [data])


  useEffect(() => {
   if (map && features.length > 0 && !rendered) {
      Object.keys(OPPORTUNITIES).forEach((key) => {
        const values = features.map((item) => item.properties[key]);
        if (!(key in state)) {
          add({
            map,
            legendTitle: `Número de ${OPPORTUNITIES[key].toLowerCase()}`,
            id: key,
            features,
            property: key,
            maxValue: Math.max(...values),
            visible: false,
            stepSize: 10,
          });
        }
      });
      show(map, opportunity)
      loadAgebs()
      loadCancun()
      setRendered(true)
   }
  }, [map, features, rendered])

  useEffect(() => {
    if (map && current) {
      console.log('Attaching click to', current);
      // ONCLICK
      map.on('click', current, async (e) => {
        const feature = e.features[0].properties
        const featureId = e.features[0].properties.h3_ddrs;
        console.log('Clicked', featureId);
        // Fetch data
        const response = await fetch(`${process.env.NEXT_PUBLIC_BUCKET_BASE_URL}/${city}/features/${featureId}.json`);
        const text = await response.text();
        const json = JSON.parse(text);

        // Create 9 isochrone variant layers
        MEDIUMS.forEach((med, mediumIndex) => {
          TIME_STEPS.forEach((step) => {
            const featureIds = Object.keys(json)
            // Get displayable features
            const filteredIds = featureIds.filter((id) => json[id][mediumIndex] <= step );
            const hexagons = filteredIds.map((id) => ({
              ...data[id],
              properties: {
                ...data[id].properties,
                [med]: json[id][mediumIndex],
              },
            }));
            // Include clicked feature.
            hexagons.push({
              ...data[featureId],
              properties: {
                ...data[featureId].properties,
                [med]: 1,
              },
            })

            // Get only countable features. For metadata.
            const filteredIdsNoZero = featureIds.filter((id) => json[id][mediumIndex] && json[id][mediumIndex] <= step );
            const hexagonsNoZero = filteredIdsNoZero.map((id) => data[id]);
            // Include clicked feature.
            hexagonsNoZero.push(data[featureId])

            add({
              map,
              legendTitle: 'Tiempo de traslado (minutos)',
              id: getHexagonId(featureId, med, step),
              features: hexagons,
              property: med,
              maxValue: step,
              visible: false,
              beforeId: 'jobs_w',
              stepSize: Math.floor(step / 15),
              metadata: {
                opportunities: {
                  Trabajos: count(hexagonsNoZero, 'jobs_w'), 
                  Empresas: count(hexagonsNoZero, 'empress'), 
                  Clínicas: count(hexagonsNoZero, 'clinics'), 
                  Escuelas: count(hexagonsNoZero, 'escuels'),
                }
              }
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

      // ON HOVER
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
        });
      map.on('mousemove', current, (e) => {
        popup.setLngLat(e.lngLat).setHTML(e.features[0].properties.description).addTo(map);
      });
      map.on('mouseleave', current, () => {
        popup.remove();
      });
    }
  }, [map, current]);

  const handleOpportunityChange = (event) => {
    const nextOpportunity = event.target.value;
    show(map, nextOpportunity);
    setOpportunity(nextOpportunity);
    setHexagon(undefined);
    hideAgebs()
    setEconomicTiles(false)
  };

  const handleMediumChange = (value) => {
    if (hexagon?.id) {
      show(map, getHexagonId(hexagon.id, value, timeStep));
      hideAgebs()
      setEconomicTiles(false)
    } 
    setMedium(value);
  };
  const handleTimeStepChange = (value) => {
    if (hexagon?.id) {
      show(map, getHexagonId(hexagon.id, medium, value));
      hideAgebs()
      setEconomicTiles(false)
    }
    setTimeStep(value);
  };
  const handleAgebsChange = () => {
    if (economicTiles) {
      hideAgebs()
      setEconomicTiles(false)
      show(map, current)
    } else {
      showAgebs()
      hide(map)
      setEconomicTiles(true)
    }
  };
  
  return (
    <>
      <InfoCard
        hexagon={hexagon}
        reachableOpportunities={metadata?.opportunities}
        cityData={opportunities}
        economicTiles={economicTiles}
        onEconomicTilesChange={handleAgebsChange}
        opportunity={opportunity}
        onOpportunityChange={handleOpportunityChange}
        medium={medium}
        onMediumChange={handleMediumChange}
        timeStep={timeStep}
        onTimeStepChange={handleTimeStepChange}
      />
      <div className="overflow-y-auto space-y-4 z-50 fixed top-4 left-4 right-4 md:bottom-8 md:right-8 md:w-52 md:h-auto md:left-auto md:top-auto">
        <Download data={geojson} filename={legend.title}/>
        {
          current && legend && (<Legend title={economicTiles ? agebLegend.title : legend.title} items={economicTiles ? agebLegend.intervals : legend.intervals}/>)
        }
        <CancunLegend />
      </div>
      <div id="map" className="w-screen h-screen" />
    </>
  );
};

Map.propTypes = {
  city: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Map;
