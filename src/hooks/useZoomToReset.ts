import { useMap } from 'src/context/map';
import { useEffect } from 'react';
import { useMapParams } from 'src/context/mapParams';
import { MapMouseEvent } from 'src/types';
import { ZOOM_THRESHOLD } from 'src/constants';

const useZoomToReset = () => {
  const {
    onReset,
    current: { cityCode },
  } = useMapParams();
  const map = useMap();
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const handleZoomEnd = (event: MapMouseEvent) => {
      if (event.target.getZoom() <= ZOOM_THRESHOLD && cityCode && !isMobile) {
        onReset();
      }
    };

    map.on('zoomend', handleZoomEnd);

    return () => {
      map.off('zoomend', handleZoomEnd);
    };
  }, [cityCode, isMobile, map, onReset]);
};

export default useZoomToReset;
