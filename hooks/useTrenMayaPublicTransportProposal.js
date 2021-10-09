import React, { useCallback } from 'react';

const PROPOSAL_TILES = [
  // TODO: UPDATE TILESET
]

const useTrenMayaPublicTransportProposal = (map) => {
  const load = useCallback(() => {
    if (map) {
        PROPOSAL_TILES.forEach(ageb => {
          map.addSource(ageb.id, {
            type: 'vector',
            url: ageb.url,
            minzoom: 6,
            maxzoom: 14
          });
          map.addLayer({
            id: ageb.id,
            type: 'fill',
            source: ageb.id,
            layout: {
              visibility:  'none',
            },
            'source-layer': ageb.sourceLayer,
            'paint': {
              'fill-color': ageb.color,
              'fill-opacity': 0.5,
            }
          });
        })
      }
  }, [map])

  const show = useCallback(() => {
    if (map) {
      console.log('SHOW PUBLIC TRANSPORT PROPOSAL')
      PROPOSAL_TILES.forEach((ageb) => {
        map.setLayoutProperty(ageb.id, 'visibility', 'visible');
      });
    }
  }, [map])
 
  const hide = useCallback(() => {
    if (map) {
      console.log('HIDE PUBLIC TRANSPORT PROPOSAL')
      PROPOSAL_TILES.forEach((ageb) => {
        map.setLayoutProperty(ageb.id, 'visibility', 'none');
      });
    }
  }, [map])

  const legend = {
    title: 'Propuesta de Tren Maya',
    intervals: PROPOSAL_TILES.map((ageb) => ({
      color: ageb.color,
      label: ageb.label,
    }))
  }

  return {
    show,
    hide,
    load,
    legend,
  }
}

export default useTrenMayaPublicTransportProposal