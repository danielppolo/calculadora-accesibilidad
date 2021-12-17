import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

function PeopleChart({ data }) {
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
          plugins: {
            legend: false,
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: '#e6e6dc',
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: '#e6e6dc',
              },
            },
          },
        },
      };
      const chart = new Chart(
        document.getElementById('people-chart'),
        config,
      );
      setActiveChart(chart);
    }
  }, [data]);

  return <canvas id="people-chart" width="200" height="120" />;
}

export default PeopleChart;
