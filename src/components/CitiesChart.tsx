import React, { memo, useEffect, useState } from 'react';
import Chart, { ChartData } from 'chart.js/auto';

interface CitiesChartProps {
  data: ChartData<'pie'>;
}

function CitiesChart({ data }: CitiesChartProps) {
  const [activeChart, setActiveChart] = useState<Chart | undefined>();
  useEffect(() => {
    if (data) {
      if (activeChart) {
        activeChart.destroy();
      }

      const config = {
        type: 'pie',
        data,
        options: {
          borderColor: '#F1F3EE',
          indexAxis: 'y',
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
        const chart = new Chart(chartContainer, config);
        setActiveChart(chart);
      }
    }
  }, [data]);

  return (
    <div className="flex justify-center">
      <div className="h-48 w-48 flex justify-center">
        <canvas id="cities-chart" />
      </div>
    </div>
  );
}

export default memo(CitiesChart);
