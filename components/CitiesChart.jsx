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
        type: 'pie',
        data,
        options: {
          borderColor: '#F1F3EE',
          indexAxis: 'y',
          plugins: {
            legend: false,
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
      };
      const chart = new Chart(
        document.getElementById('cities-chart'),
        config,
      );
      setActiveChart(chart);
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
