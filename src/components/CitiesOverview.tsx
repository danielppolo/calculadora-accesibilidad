import React, { memo } from 'react';
import CitiesChart from 'src/components/CitiesChart';
import { useMapParams } from 'src/context/mapParams';
import useConfig from 'src/hooks/data/useConfig';

function CitiesOverview() {
  const { data: config } = useConfig();
  const { current } = useMapParams();
  const cities = Object.values(config ?? {});

  if (current.cityCode) return null;

  return (
    <div>
      <p className="text-sm text-gray-700">
        Este proyecto tiene como objetivo mostrar las oportunidades de las 20
        zonas metropolitanas más grandes de México.
      </p>
      <div className="mb-8" />

      <CitiesChart
        data={{
          labels: cities.map((city) => city.name),
          datasets: [
            {
              data: cities
                .map((city) => city.metadata?.totalOpportunities ?? 0)
                .sort((a, b) => b - a),
              backgroundColor: cities.map((city) => city.color), // FIXME: Set correct colors
              barThickness: 'flex',
            },
          ],
        }}
      />
      <p className="text-xs text-center mt-2">
        Número de oportunidades promedio alcanzables por persona
      </p>
    </div>
  );
}

export default memo(CitiesOverview);
