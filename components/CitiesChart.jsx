import React, { memo, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

function CitiesChart({ data }) {
  const [activeChart, setActiveChart] = useState();
  useEffect(() => {
    if (data) {
      if (activeChart) {
        activeChart.destroy();
      }

      const config = {
        type: 'bar',
        data,
        options: {
          indexAxis: 'y',
          plugins: {
            legend: false,
          },
          scales: {
            y: {
              position: 'right',
              grid: {
                display: false,
              },
            },
            x: {
              display: false,
              grid: {
                display: false,
              },
            },
          },
        },
      };
      const chart = new Chart(
        document.getElementById('cities-chart'),
        config,
      );
      setActiveChart(chart);
    }
  }, [data]);

  return <canvas id="cities-chart" width="200" height="120" />;
}

export default memo(CitiesChart);
