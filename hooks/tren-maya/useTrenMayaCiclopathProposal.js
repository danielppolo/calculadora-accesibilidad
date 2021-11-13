import { useCallback } from 'react';

const PROPOSAL_TILES = [
  {
    id: 'tren-maya-ruta-ciclista',
    sourceLayer: 'propuesta-tren-maya-ruta-cicl-53xogl',
    url: 'mapbox://daniel-itdp.9d11x400',
    color: '#ff5079',
    type: 'line',
    label: 'Propuesta ruta ciclista',
  },
];

const useTrenMayaCiclopathProposal = () => {
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
    console.log('SHOW CICLOVIA PROPOSAL');
    PROPOSAL_TILES.forEach((layer) => {
      map.setLayoutProperty(layer.id, 'visibility', 'visible');
    });
  }, []);

  const hide = useCallback((map) => {
    console.log('HIDE CICLOVIA PROPOSAL');
    PROPOSAL_TILES.forEach((layer) => {
      map.setLayoutProperty(layer.id, 'visibility', 'none');
    });
  }, []);

  const legend = {
    title: 'Propuesta de ciclovía',
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

export default useTrenMayaCiclopathProposal;
