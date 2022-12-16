import { useMap } from 'src/context/map';
import { useEffect } from 'react';
import { useMapParams } from 'src/context/mapParams';
import { MapMouseEvent } from 'src/types';

const useZoomToReset = () => {
  const {
    onReset,
    current: { cityCode },
  } = useMapParams();
  const map = useMap();

  useEffect(() => {
    const handleZoomEnd = (event: MapMouseEvent) => {
      if (event.target.getZoom() <= 5.5 && cityCode) {
        onReset();
      }
    };

    map.on('zoomend', handleZoomEnd);

    return () => {
      map.off('zoomend', handleZoomEnd);
    };
  }, [cityCode, map, onReset]);
};

export default useZoomToReset;
