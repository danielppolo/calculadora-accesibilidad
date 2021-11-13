import React, { useCallback } from 'react';

const PROPOSAL_TILES = [
  {
    id: 'tren-maya-ruta-transporte-publico',
    sourceLayer: 'PropuestaTP-4mtn0b',
    url: 'mapbox://daniel-itdp.5cjeztin',
    color: '#fd6541',
    type: 'line',
    label: 'Propuesta transporte público',
  },
];

const useTrenMayaPublicTransportProposal = () => {
  const load = useCallback((map) => {
    PROPOSAL_TILES.forEach((layer) => {
      map.addSource(layer.id, {
        type: 'vector',
        url: layer.url,
        minzoom: 6,
        maxzoom: 14,
      });
      map.addLayer({
        id: layer.id,
        type: layer.type,
        source: layer.id,
        layout: {
          visibility: 'none',
        },
        'source-layer': layer.sourceLayer,
        paint: {
          'line-color': layer.color,
          'line-width': 2,
        },
      });
    });
  }, []);

  const show = useCallback((map) => {
    console.log('SHOW PUBLIC TRANSPORT PROPOSAL');
    PROPOSAL_TILES.forEach((ageb) => {
      map.setLayoutProperty(ageb.id, 'visibility', 'visible');
    });
  }, []);

  const hide = useCallback((map) => {
    console.log('HIDE PUBLIC TRANSPORT PROPOSAL');
    PROPOSAL_TILES.forEach((ageb) => {
      map.setLayoutProperty(ageb.id, 'visibility', 'none');
    });
  }, []);

  const legend = {
    title: 'Propuesta de Tren Maya',
    intervals: PROPOSAL_TILES.map((layer) => ({
      color: layer.color,
      label: layer.label,
    })),
  };

  return {
    show,
    hide,
    load,
    legend,
  };
};

export default useTrenMayaPublicTransportProposal;
