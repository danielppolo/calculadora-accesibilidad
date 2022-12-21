import React, { memo, useEffect, useState } from 'react';
import Chart, { ChartData } from 'chart.js/auto';

interface CitiesChartProps {
  data: ChartData<'bar'>;
}

function CitiesChart({ data }: CitiesChartProps) {
  const [activeChart, setActiveChart] = useState<Chart<'bar'> | undefined>();

  useEffect(() => {
    if (data) {
      if (activeChart) {
        return;
      }

      const config = {
        responsive: true,
        type: 'bar',
        data,
        options: {
          borderColor: '#F1F3EE',
          // indexAxis: 'y',
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              display: false,
              position: 'right',
              grid: {
                // display: false,
              },
            },
            x: {
              display: false,
              grid: {
                // display: false,
              },
            },
          },
        },
      } as const;

      const chartContainer = document.getElementById(
        'cities-chart'
      ) as HTMLCanvasElement;

      if (chartContainer !== null) {
        const chart = new Chart<'bar'>(chartContainer, config);
        setActiveChart(chart);
      }
    }
  }, [activeChart, data]);

  return (
    <div className="flex justify-center">
      <div className="w-full relative">
        <canvas id="cities-chart" />
      </div>
    </div>
  );
}

export default memo(CitiesChart);
