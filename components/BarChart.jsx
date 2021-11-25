import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

function BarChart({ data }) {
  const [activeChart, setActiveChart] = useState();
  useEffect(() => {
    if (data) {
      if (activeChart) {
        activeChart.destroy();
      }

      const config = {
        type: 'bar',
        data: {
          labels: Object.keys(data),
          datasets: [{
            label: 'Oportunidades',
            backgroundColor: '#00524C',
            borderColor: 'rgb(0,0,0)',
            data: Object.values(data),
          }],
        },
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
        document.getElementById('myChart'),
        config,
      );
      setActiveChart(chart);
    }
  }, [data]);

  return <canvas id="myChart" width="200" height="120" />;
}

export default BarChart;
