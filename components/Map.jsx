import mapboxgl, { Popup } from 'mapbox-gl';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CANCUN_COORDINATES, MEDIUMS, OPPORTUNITIES, TIME_STEPS } from '../constants';
import useLayerManager from '../hooks/useLayerManager';
import InfoCard from './InfoCard';
import Legend from './Legend';
import CancunLegend from './CancunLegend';
import Download from './Download';
import useBaseGrid from '../hooks/useBaseGrid';
import Fab from '@mui/material/Fab';
import LayersIcon from '@mui/icons-material/Layers';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import { Backdrop } from '@mui/material';

// Mexico
// import useEconomicZones from '../hooks/useEconomicZones';
import useMap from '../hooks/useMap';
import useRoadNetwork from '../hooks/useRoadNetwork';

// Tren maya
import useCancunLayers from '../hooks/tren-maya/useCancunLayers';
import useCancunCiclopathProposal from '../hooks/tren-maya/useCancunCiclopathProposal';
import useCancunPublicTransportProposal from '../hooks/tren-maya/useCancunPublicTransportProposal';
import useCancunPedestrianProposal from '../hooks/tren-maya/useCancunPedestrianProposal';
import useCancunVehicularProposal from '../hooks/tren-maya/useCancunVehicularProposal';
import CircularProgress from '@mui/material/CircularProgress';
import useCancunLandUse from '../hooks/tren-maya/useCancunLandUse';
import useCancunPopulationDensity from '../hooks/tren-maya/useCancunPopulationDensity';
import useCancunCiclopath from '../hooks/tren-maya/useCancunCiclopath';
import useCancunPublicTransport from '../hooks/tren-maya/useCancunPublicTransport';
import useCancunVehicular from '../hooks/tren-maya/useCancunVehicular';
import useCancunPedestrian from '../hooks/tren-maya/useCancunPedestrian';

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

let currentTimestep = defaultTimeStep
let currentMedium = defaultMedium

function Map({ city, data }) {
  const [map, mapLoaded] = useMap({ center: CANCUN_COORDINATES });
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
  const [rendered, setRendered] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [hexagon, setHexagon] = useState();
  const [medium, setMedium] = useState(defaultMedium);
  const [timeStep, setTimeStep] = useState(defaultTimeStep);
  const [features, setFeatures] = useState(Object.values(data));
  const [opportunities, setOpportunities] = useState({});
  const { load: loadGrid, layerName: gridId } = useBaseGrid('grid')
  const { load: loadRoadNetwork } = useRoadNetwork()
  // const { load: loadAgebs, show: showAgebs, hide: hideAgebs, legend: agebLegend } = useEconomicZones()
  
  // Tren maya
  const [populationDensity, setPopulationDensity] = useState(false);
  const [landUse, setLandUse] = useState(false);
  const [pedestrian, setPedestrian] = useState(false)
  const [vehicular, setVehicular] = useState(false)
  const [publicTransport, setPublicTransport] = useState(false)
  const [ciclopath, setCiclopath] = useState(false)
  const [pedestrianProposal, setPedestrianProposal] = useState(false)
  const [vehicularProposal, setVehicularProposal] = useState(false)
  const [publicTransportProposal, setPublicTransportProposal] = useState(false)
  const [ciclopathProposal, setCiclopathProposal] = useState(false)
  const { load: loadLandUse, show: showLandUse, hide: hideLandUse, legend: landUseLegend } = useCancunLandUse()
  const { load: loadDensity, show: showDensity, hide: hideDensity, legend: densityLegend } = useCancunPopulationDensity()
  const { load: loadCancun } = useCancunLayers()
  const {
    load: loadCiclopath,
    hide: hideCiclopath,
    show: showCiclopath,
  } = useCancunCiclopath()
  const {
    load: loadVehicular,
    hide: hideVehicular,
    show: showVehicular,
  } = useCancunVehicular()
  const {
    load: loadPedestrian,
    hide: hidePedestrian,
    show: showPedestrian,
  } = useCancunPedestrian()
  const {
    load: loadPublicTransport,
    hide: hidePublicTransport,
    show: showPublicTransport,
  } = useCancunPublicTransport()
  const {
    load: loadCiclopathProposal,
    hide: hideCiclopathProposal,
    show: showCiclopathProposal,
  } = useCancunCiclopathProposal()
  const {
    load: loadPublicTransportProposal,
    hide: hidePublicTransportProposal,
    show: showPublicTransportProposal
  } = useCancunPublicTransportProposal()
  const {
    load: loadVehicularProposal,
    hide: hideVehicularProposal,
    show: showVehicularProposal,
  } = useCancunVehicularProposal()
  const {
    load: loadPedestrianProposal,
    hide: hidePedestrianProposal,
    show: showPedestrianProposal
  } = useCancunPedestrianProposal()

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
  
  const getCurrentTimestep = () => currentTimestep
  const getCurrentMedium = () => currentMedium

  useEffect(() => {
    if (data) {
      const nextFeatures = Object.values(data)
      setFeatures(nextFeatures);
      setOpportunities({
        'Personal ocupado': count(nextFeatures, 'jobs_w'),
        Empresas: count(nextFeatures, 'empresas'),
        Clínicas: count(nextFeatures, 'clinicas'),
        Escuelas: count(nextFeatures, 'escuelas'),
        'Zonas turísticas': count(nextFeatures, 'destinos'),
      })
    }
  }, [data])



  useEffect(() => {
    if (map && mapLoaded && features.length > 0 && !rendered) {
      loadLandUse(map)
      loadDensity(map)
      loadRoadNetwork(map)
      loadVehicular(map)
      loadPublicTransport(map)
      loadCiclopath(map)
      loadPedestrian(map)
      loadVehicularProposal(map)
      loadPublicTransportProposal(map)
      loadCiclopathProposal(map)
      loadPedestrianProposal(map)
      loadCancun(map)
      loadGrid(map, features)
      // map.on('mousemove', gridId, (e) => {
      //   popup
      //     .setLngLat(e.lngLat)
      //     .setHTML(e.features[0].properties.description)
      //     .addTo(map);
      // });
      // map.on('mouseleave', gridId, () => {
      //   popup.remove();
      // });
      map.on('click', gridId, async (e) => {
        setLoading(true)
        hideLandUse(map)
        setLandUse(false)
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
                  description: `${json[id][mediumIndex]} minutos`
                },
              }));

              // Include clicked feature.
              filteredFeatures.push({
                ...data[featureId],
                properties: {
                  ...data[featureId].properties,
                  [med]: 1,
                  selected: true,
                  description: `15 minutos`
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
                    Empresas: count(filteredFeatures, 'empresas'),
                    Clínicas: count(filteredFeatures, 'clinicas'),
                    Escuelas: count(filteredFeatures, 'escuelas'),
                    'Zonas turísticas': count(filteredFeatures, 'destinos'),
                    Estaciones: count(filteredFeatures, 'estaciones'),
                  }
                }
              });

              map.on('mousemove', getHexagonId(featureId, med, step), (e) => {
                popup
                  .setLngLat(e.lngLat)
                  .setHTML(e.features[0].properties.description)
                  .addTo(map);
              });
              map.on('mouseleave', getHexagonId(featureId, med, step), () => {
                popup.remove();
              });
            });
          });
        } catch (e) {
          console.log(`Failed when downloading feature data: ${e.message}`);
        } finally {
          setLoading(false)
        }
        // Show default isochrone
        console.log(getHexagonId(featureId, getCurrentMedium(), getCurrentTimestep()))
        show(map, getHexagonId(featureId, getCurrentMedium(), getCurrentTimestep()));
        setHexagon({
          id: featureId,
          ...feature,
        })
      });
      setRendered(true)
    }
  }, [map, mapLoaded, features, rendered])

    
  const handleMediumChange = (value) => {
    hidePublicTransportProposal(map)
    hideCiclopathProposal(map)
    if (hexagon?.id) {
      show(map, getHexagonId(hexagon.id, value, timeStep));
      hideLandUse(map)
      setLandUse(false)
    }
    if (value === 'bus_mejora_TM') {
      showPublicTransportProposal(map)
    }
    if (value === 'bicicleta_TM') {
      showCiclopathProposal(map)
    }
    setMedium(value);
    currentMedium = value;
  };
  
  const handleTimeStepChange = (value) => {
    if (hexagon?.id) {
      show(map, getHexagonId(hexagon.id, medium, value));
      hideLandUse(map)
      hideDensity(map)
      setLandUse(false)
      setPopulationDensity(false)
    }
    setTimeStep(value);
    currentTimestep   = value;
  };

  const handleLandUseChange = () => {
    if (landUse) {
      hideLandUse(map)
      setLandUse(false)
    } else {
      hideDensity(map)
      showLandUse(map)
      setPopulationDensity(false)
      setLandUse(true)
    }
  };
  const handlePopulationDensityChange = () => {
    if (populationDensity) {
      hideDensity(map)
      setPopulationDensity(false)
    } else {
      hideLandUse(map)
      showDensity(map)
      setLandUse(false)
      setPopulationDensity(true)
    }
  };

  const handleVehicularChange = () => {
    if (vehicular) {
      hideVehicular(map)
      setVehicular(false)
    } else {
      showVehicular(map)
      setVehicular(true)
    }
  }

  const handlePedestrianChange = () => {
    if (pedestrian) {
      hidePedestrian(map)
      setPedestrian(false)
    } else {
      showPedestrian(map)
      setPedestrian(true)
    }
  }

  const handlePublicTransportChange = () => {
    if (publicTransport) {
      hidePublicTransport(map)
      setPublicTransport(false)
    } else {
      showPublicTransport(map)
      setPublicTransport(true)
    }
  }

  const handleCiclopathChange = () => {
    if (ciclopath) {
      hideCiclopath(map)
      setCiclopath(false)
    } else {
      showCiclopath(map)
      setCiclopath(true)
    }
  }

  const handleVehicularProposalChange = () => {
    if (vehicularProposal) {
      hideVehicularProposal(map)
      setVehicularProposal(false)
    } else {
      showVehicularProposal(map)
      setVehicularProposal(true)
    }
  }

  const handlePedestrianProposalChange = () => {
    if (pedestrianProposal) {
      hidePedestrianProposal(map)
      setPedestrianProposal(false)
    } else {
      showPedestrianProposal(map)
      setPedestrianProposal(true)
    }
  }

  const handlePublicTransportProposalChange = () => {
    if (publicTransportProposal) {
      hidePublicTransportProposal(map)
      setPublicTransportProposal(false)
    } else {
      showPublicTransportProposal(map)
      setPublicTransportProposal(true)
    }
  }

  const handleCiclopathProposalChange = () => {
    if (ciclopathProposal) {
      hideCiclopathProposal(map)
      setCiclopathProposal(false)
    } else {
      showCiclopathProposal(map)
      setCiclopathProposal(true)
    }
  }

  return (
    <>
      <InfoCard
        hexagon={hexagon}
        reachableOpportunities={metadata?.opportunities}
        cityData={opportunities}
        economicTiles={landUse}
        onEconomicTilesChange={handleLandUseChange}
        populationDensity={populationDensity}
        onPopulationDensityChange={handlePopulationDensityChange}
        medium={medium}
        onMediumChange={handleMediumChange}
        timeStep={timeStep}
        onTimeStepChange={handleTimeStepChange}
        pedestrian={pedestrian}
        onPedestrianChange={handlePedestrianChange}
        vehicular={vehicular}
        onVehicularChange={handleVehicularChange}
        publicTransport={publicTransport}
        onPublicTransportChange={handlePublicTransportChange}
        ciclopath={ciclopath}
        onCiclopathChange={handleCiclopathChange}
        pedestrianProposal={pedestrianProposal}
        onPedestrianProposalChange={handlePedestrianProposalChange}
        vehicularProposal={vehicularProposal}
        onVehicularProposalChange={handleVehicularProposalChange}
        publicTransportProposal={publicTransportProposal}
        onPublicTransportProposalChange={handlePublicTransportProposalChange}
        ciclopathProposal={ciclopathProposal}
        onCiclopathProposalChange={handleCiclopathProposalChange}
      />

      <div className="block fixed bottom-4 right-4 z-50 md:hidden">
        <Fab color="primary" onClick={() => { setShowLegend(!showLegend) }} size="medium" aria-label="add">
          {showLegend ? <LayersClearIcon /> : <LayersIcon />}
        </Fab>
      </div>
      <div className={`overflow-y-auto z-50 fixed top-4 left-4 right-4 h-2/3 md:bottom-8 md:right-8 md:w-52 md:h-auto md:left-auto md:top-auto md:block ${!showLegend && 'hidden'}`}>
        <div className="space-y-4">
          {!landUse && <Download data={geojson} filename={legend.title} />}
          {
            landUse && (<Legend title={landUseLegend.title} items={landUseLegend.intervals} />)
          }
          {
            populationDensity && (<Legend title={densityLegend.title} items={densityLegend.intervals} />)
          }
          {
            current && legend && !landUse && !populationDensity && (<Legend title={legend.title} items={legend.intervals} />)
          }
          <CancunLegend 
          pedestrian={pedestrian}
          vehicular={vehicular}
          publicTransport={publicTransport}
          ciclopath={ciclopath}
          pedestrianProposal={pedestrianProposal}
          vehicularProposal={vehicularProposal}
          publicTransportProposal={publicTransportProposal}
          ciclopathProposal={ciclopathProposal}
          />
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
