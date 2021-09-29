import mapboxgl, { Popup } from 'mapbox-gl';
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
import useBaseGrid from '../hooks/useBaseGrid';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN

const getHexagonId = (hexagonId, medium, step) => `${hexagonId}-${medium}-${step}`;
const defaultOpportunity = Object.keys(OPPORTUNITIES)[0];
const defaultMedium = MEDIUMS[0];
const defaultTimeStep = TIME_STEPS[1];
const count = (array, property) => array.reduce((acc, item) => acc + item.properties[property], 0);
const popup = new Popup({
  closeButton: false,
  closeOnClick: false
});

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
  const {load:loadGrid, layerName: gridId} = useBaseGrid('grid') 

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
      loadGrid(map, features)
      Object.keys(OPPORTUNITIES).forEach((key) => {
        let maxValue = 0;
        const filteredFeatures = features.filter((item) => {
          if (item.properties[key] > maxValue) {
            maxValue = item.properties[key];
          }
          return item.properties[key] > 0
        });
        if (!(key in state)) {
          add({
            map,
            legendTitle: `Número de ${OPPORTUNITIES[key].toLowerCase()}`,
            id: key,
            features: filteredFeatures,
            property: key,
            maxValue,
            visible: false,
            stepSize: 10,
            beforeId: gridId,
          });
        }
      });
      show(map, opportunity)
      loadAgebs()
      loadCancun()

      map.on('mousemove', gridId, (e) => {
        popup
          .setLngLat(e.lngLat)
          .setHTML(e.features[0].properties.description)
          .addTo(map);
      });
      map.on('mouseleave', gridId, () => {
        popup.remove();
      });
      map.on('click', gridId, async (e) => {
        const feature = e.features[0].properties
        const featureId = e.features[0].properties.h3_ddrs;
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BUCKET_BASE_URL}/${city}/features/${featureId}.json`);
          const text = await response.text();
          const json = JSON.parse(text);

          // Create 9 isochrone variant layers
          MEDIUMS.forEach((med, mediumIndex) => {
            TIME_STEPS.forEach((step) => {
              const featureIds = Object.keys(json)
              const filteredIds = featureIds.filter((id) => json[id][mediumIndex] && json[id][mediumIndex] <= step );
              const filteredFeatures = filteredIds.map((id) => ({
                ...data[id],
                properties: {
                  ...data[id].properties,
                  [med]: json[id][mediumIndex],
                },
              }));
              // Include clicked feature.
              filteredFeatures.push({
                ...data[featureId],
                properties: {
                  ...data[featureId].properties,
                  [med]: 1,
                },
              })

              add({
                map,
                legendTitle: 'Tiempo de traslado (minutos)',
                id: getHexagonId(featureId, med, step),
                features: filteredFeatures,
                property: med,
                maxValue: step,
                visible: false,
                beforeId: gridId,
                stepSize: Math.floor(step / 15),
                metadata: {
                  opportunities: {
                    Trabajos: count(filteredFeatures, 'jobs_w'), 
                    Empresas: count(filteredFeatures, 'empress'), 
                    Clínicas: count(filteredFeatures, 'clinics'), 
                    Escuelas: count(filteredFeatures, 'escuels'),
                  }
                }
              });
            });
          });
        } catch(e) {
          console.log(`Failed when downloading feature data: ${e.message}`);
        }
        // Show default isochrone
        console.log(getHexagonId(featureId, medium, timeStep))
        show(map, getHexagonId(featureId, medium, timeStep));
        setHexagon({
          id: featureId,
          ...feature,
        });
        setOpportunity(undefined);
      });
      setRendered(true)
   }
  }, [map, features, rendered])

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
      <div className="overflow-y-auto space-y-2 z-50 fixed top-4 left-4 right-4 md:bottom-8 md:right-8 md:w-52 md:h-auto md:left-auto md:top-auto">
        { !economicTiles && <Download data={geojson} filename={legend.title}/> }
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
