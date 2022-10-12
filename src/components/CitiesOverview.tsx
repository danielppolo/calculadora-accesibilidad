import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Card from 'src/components/Card';
import CitiesChart from 'src/components/CitiesChart';
import { City } from 'src/types';

interface CitiesOverviewProps {
  cities?: City[];
}
function CitiesOverview({
  cities = [],
}: CitiesOverviewProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 hidden md:block md:bottom-auto md:top-0 md:right-0 md:left-auto md:w-96 md:max-w-xl md:max-h-screen">
      <Card className="py-4 px-6 m-4 overflow-y-auto">
        <h1 className="text-2xl mb-4">Visualizador de accesibilidad urbana</h1>
        <p className="text-sm">
          Este proyecto tiene como objetivo mostrar las oportunidades de las 20 zonas metropolitanas más grandes de México.
        </p>
        <div className="mb-8" />
        <div>
          <p className="text-xs text-center font-medium mb-4">Número de oportunidades promedio alcanzables por persona</p>
          <CitiesChart
            data={{
              labels: cities.map((city) => city.name),
              datasets: [{
                data: cities.map((city) => city.metadata?.totalOpportunities ?? 0),
                backgroundColor: cities.map((city) => city.color),
              }],
            }}
          />
        </div>
      </Card>
    </div>
  );
}

CitiesOverview.propTypes = {
  cities: PropTypes.array.isRequired,
};

export default memo(CitiesOverview);