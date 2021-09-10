import { useMemo, useCallback } from 'react';
import usePolygons from './usePolygons';

const useOpportunities = (map, data, key) => {
  const features0 = useMemo(() => data.filter((item) => item.properties[key] <= 50), [data, key]);
  const [set0, remove0] = usePolygons(map, features0, `${key}0`, '#ff0000');

  const features50 = useMemo(() => data.filter((item) => item.properties[key] <= 100 && item.properties[key] > 50), [data, key]);
  const [set50, remove50] = usePolygons(map, features50, `${key}50`, '#0000ff');

  const features100 = useMemo(() => data.filter((item) => item.properties[key] <= 150 && item.properties[key] > 100), [data, key]);
  const [set100, remove100] = usePolygons(map, features100, `${key}100`, '#00ff00');

  const features150 = useMemo(() => data.filter((item) => item.properties[key] <= 200 && item.properties[key] > 150), [data, key]);
  const [set150, remove150] = usePolygons(map, features150, `${key}150`, '#7006FA');

  const features200 = useMemo(() => data.filter((item) => item.properties[key] > 200), [data, key]);
  const [set200, remove200] = usePolygons(map, features200, `${key}200`, '#0F000A');

  const set = useCallback(
    () => {
      set0();
      set50();
      set100();
      set150();
      set200();
    },
    [set0, set50, set100, set150, set200],
  );

  const remove = useCallback(
    () => {
      remove0();
      remove50();
      remove100();
      remove150();
      remove200();
    },
    [remove0, remove50, remove100, remove150, remove200],
  );

  return [set, remove];
};

export default useOpportunities;
