import mapboxgl, { Popup } from 'mapbox-gl';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CANCUN_COORDINATES, MEDIUMS, OPPORTUNITIES, TIME_STEPS } from '../constants';
import useLayerManager from '../hooks/useLayerManager';
import InfoCard from './InfoCard';
import Legend from './Legend';
import useCancunLayers from '../hooks/useCancunLayers';
import useEconomicZones from '../hooks/useEconomicZones';
import CancunLegend from './CancunLegend';
import useMap from '../hooks/useMap';
import Download from './Download';
import useBaseGrid from '../hooks/useBaseGrid';
import Fab from '@mui/material/Fab';
import LayersIcon from '@mui/icons-material/Layers';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import { Backdrop } from '@mui/material';
import useRoadNetwork from '../hooks/useRoadNetwork';
import useTrenMayaCiclopathProposal from '../hooks/useTrenMayaCiclopathProposal';
import useTrenMayaPublicTransportProposal from '../hooks/useTrenMayaPublicTransportProposal';
import CircularProgress from '@mui/material/CircularProgress';

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
  const map = useMap({ center: CANCUN_COORDINATES });
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
  const [loading, setLoading] = useState(false)
  const [showLegend, setShowLegend] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [hexagon, setHexagon] = useState();
  const [medium, setMedium] = useState(defaultMedium);
  const [timeStep, setTimeStep] = useState(defaultTimeStep);
  const [features, setFeatures] = useState(Object.values(data));
  const [opportunities, setOpportunities] = useState({});
  const [economicTiles, setEconomicTiles] = useState(false);
  const { load: loadAgebs, show: showAgebs, hide: hideAgebs, legend: agebLegend } = useEconomicZones()
  const { load: loadCancun } = useCancunLayers()
  const { load: loadGrid, layerName: gridId } = useBaseGrid('grid')
  const { load: loadRoadNetwork } = useRoadNetwork()
  const {
    load: loadCiclopathProposal,
    hide: hideCiclopathProposal,
    show: showCiclopathProposal,
  } = useTrenMayaCiclopathProposal()
  const {
    load: loadPublicTransportProposal,
    hide: hidePublicTransportProposal,
    show: showPublicTransportProposal
  } = useTrenMayaPublicTransportProposal()

  useEffect(() => {
    // Fit map to selected features.
    if (map && geojson?.features) {
      const bounds = new mapboxgl.LngLatBounds();
      const offsetX = window.innerWidth > 600 ? window.innerWidth / 12 : 0;
      geojson.features.forEach(feature => {
        bounds.extend(feature.geometry.coordinates[0])
      })
      map.fitBounds(bounds, {
        padding: 200,
        maxZoom: 15,
        duration: 500,
        offset: [offsetX, 0]
      });
    }
  }, [geojson, map])

  useEffect(() => {
    if (data) {
      const nextFeatures = Object.values(data)
      setFeatures(nextFeatures);
      setOpportunities({
        'Personal ocupado': count(nextFeatures, 'jobs_w'),
        Empresas: count(nextFeatures, 'empress'),
        Clínicas: count(nextFeatures, 'clinics'),
        Escuelas: count(nextFeatures, 'escuels'),
        'Zonas turísticas': count(nextFeatures, 'destins'),
      })
    }
  }, [data])


  useEffect(() => {
    if (map && features.length > 0 && !rendered) {

      map.on('load', () => {
        loadAgebs(map)
        loadRoadNetwork(map)
        loadGrid(map, features)
        loadCiclopathProposal(map)
        loadPublicTransportProposal(map)
        loadCancun(map)
      })
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
        setLoading(true)
        hideAgebs(map)
        setEconomicTiles(false)
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
              const filteredIds = featureIds.filter((id) => json[id][mediumIndex] && json[id][mediumIndex] <= step && data[id]);
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
                reverseColors: true,
                metadata: {
                  opportunities: {
                    'Personal ocupado': count(filteredFeatures, 'jobs_w'),
                    Empresas: count(filteredFeatures, 'empress'),
                    Clínicas: count(filteredFeatures, 'clinics'),
                    Escuelas: count(filteredFeatures, 'escuels'),
                    'Zonas turísticas': count(filteredFeatures, 'destins'),
                    Estaciones: count(filteredFeatures, 'estaciones'),
                  }
                }
              });
            });
          });
        } catch (e) {
          console.log(`Failed when downloading feature data: ${e.message}`);
        } finally {
          setLoading(false)
        }
        // Show default isochrone
        console.log(getHexagonId(featureId, medium, timeStep))
        show(map, getHexagonId(featureId, medium, timeStep));
        setHexagon({
          id: featureId,
          ...feature,
        });
      });
      setRendered(true)
    }
  }, [map, features, rendered])

  const handleMediumChange = (value) => {
    hidePublicTransportProposal(map)
    hideCiclopathProposal(map)
    if (hexagon?.id) {
      show(map, getHexagonId(hexagon.id, value, timeStep));
      hideAgebs(map)
      setEconomicTiles(false)
    }
    if (value === 'bus_mejora_TM') {
      showPublicTransportProposal(map)
    }
    if (value === 'bicicleta_TM') {
      showCiclopathProposal(map)
    }
    setMedium(value);
  };
  const handleTimeStepChange = (value) => {
    if (hexagon?.id) {
      show(map, getHexagonId(hexagon.id, medium, value));
      hideAgebs(map)
      setEconomicTiles(false)
    }
    setTimeStep(value);
  };
  const handleAgebsChange = () => {
    if (economicTiles) {
      hideAgebs(map)
      setEconomicTiles(false)
      show(map, current)
    } else {
      showAgebs(map)
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
        medium={medium}
        onMediumChange={handleMediumChange}
        timeStep={timeStep}
        onTimeStepChange={handleTimeStepChange}
      />

      <div className="block fixed bottom-4 right-4 z-50 md:hidden">
        <Fab color="primary" onClick={() => { setShowLegend(!showLegend) }} size="medium" aria-label="add">
          {showLegend ? <LayersClearIcon /> : <LayersIcon />}
        </Fab>
      </div>
      <div className={`overflow-y-auto z-50 fixed top-4 left-4 right-4 h-2/3 md:bottom-8 md:right-8 md:w-52 md:h-auto md:left-auto md:top-auto md:block ${!showLegend && 'hidden'}`}>
        <div className="space-y-4">
          {!economicTiles && <Download data={geojson} filename={legend.title} />}
          {
            economicTiles && (<Legend title={agebLegend.title} items={agebLegend.intervals} />)
          }
          {
            current && legend && !economicTiles && (<Legend title={legend.title} items={legend.intervals} />)
          }
          <CancunLegend />
        </div>
      </div>
      
      <Backdrop
        sx={{ color: '#fff', zIndex: 40 }}
        open={showLegend}
      ></Backdrop>
      <div id="map" className="w-screen h-screen" />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

Map.propTypes = {
  city: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Map;
