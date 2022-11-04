import React, { memo, useEffect, useState } from 'react';
import Chart, { ChartData } from 'chart.js/auto';

interface FacilitiesChartProps {
  data: ChartData<'bar'>;
}

function FacilitiesChart({ data }: FacilitiesChartProps) {
  const [activeChart, setActiveChart] = useState<Chart | undefined>();
  useEffect(() => {
    if (data) {
      if (activeChart) {
        activeChart.destroy();
      }

      const config = {
        type: 'bar',
        data,
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                color: '#e6e6dc',
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                color: '#e6e6dc',
              },
            },
          },
        },
      } as const;

      const chartContainer = document.getElementById(
        'facilities-chart'
      ) as HTMLCanvasElement;

      if (chartContainer !== null) {
        const chart = new Chart(chartContainer, config);
        setActiveChart(chart);
      }
    }
  }, [data]);

  return <canvas id="facilities-chart" width="200" height="120" />;
}

export default memo(FacilitiesChart);
