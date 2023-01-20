import React, { memo, useEffect } from 'react';
import { useMapParams } from 'src/context/mapParams';
import useCurrentVisualization from 'src/hooks/data/useCurrentVisualization';
import { marked } from 'marked';
import useEmbeddedCharts from 'src/hooks/useEmbeddedCharts';
import { Chart } from 'chart.js';
import getComparableFilter from 'src/utils/getComparableFilter';
import { useQuery } from '@tanstack/react-query';
import queries from 'src/utils/queries';
import isComparable from 'src/utils/isComparable';
import { useMapboxLayerManager } from 'src/context/mapboxLayerManager';

marked.setOptions({
  gfm: true,
});

function VisualizationInfo() {
  const { current } = useMapParams();
  const { geojson } = useMapboxLayerManager();
  const getCurrentVisualization = useCurrentVisualization();
  const currentVisualization = getCurrentVisualization(current);
  const dangerousHTML = useEmbeddedCharts({
    text: currentVisualization?.helperText,
    chartData: currentVisualization?.chartConfig,
  });
  const { data: gridData } = useQuery({
    ...queries.grids.geojson({
      cityCode: current.cityCode,
      gridCode: current.gridCode,
    }),
    enabled: !!current.cityCode && !!current.gridCode,
  });

  useEffect(() => {
    console.log(geojson);
    if (!gridData || !isComparable(currentVisualization)) {
      return () => undefined;
    }
    // TODO: Enable when S3 updated.
    // const comparableKeys =
    //   currentVisualization?.comparableOptions?.map((option) => option?.code) ??
    //   [];
    const comparableKeys = ['clinics', 'jobs_w', 'empress'];
    const comparableLabels =
      currentVisualization?.comparableOptions?.map((option) => option?.name) ??
      [];

    const comparing = {
      bike: ['8848f4a641fffff', '8848f4b26dfffff'],
      walk: ['8848f4b209fffff'],
      // TODO: Aqui van todos los comparableFilter.options-.code
    };

    const featuresProperties = Object.keys(gridData ?? {}).reduce(
      (acc: Record<string, any>, key) => {
        acc[key] = gridData?.[key].properties;

        return acc;
      },
      {}
    );
    const comparableFilter = getComparableFilter(currentVisualization);

    const datasets = Object.keys(comparing).map((filterKey) => {
      const total = comparableKeys.map((comparableKey) => {
        return comparing[filterKey].reduce((acc: number, id: string) => {
          return acc + featuresProperties[id][comparableKey];
        }, 0);
      });

      const colors = Object.keys(comparableKeys).map(
        (key) =>
          comparableFilter?.options.find((option) => option.code === filterKey)
            ?.color
      );

      return {
        label: comparableFilter?.options?.find(
          (option) => option.code === filterKey
        )?.name,
        data: total,
        backgroundColor: colors,
      };
    });

    let instance: Chart | null = null;
    const chartContainer = document.getElementById(
      'comparable'
    ) as HTMLCanvasElement;

    const data = {
      labels: comparableLabels,
      datasets,
    };

    instance = new Chart(chartContainer, {
      type: 'bar',
      data,
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      instance?.destroy();
    };
  }, [currentVisualization, gridData, geojson]);

  return (
    <>
      <div
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: dangerousHTML }}
      />
      <div className="w-full relative">
        <canvas id="total" />
      </div>
      <div className="w-full relative">
        <canvas id="comparable" />
      </div>
    </>
  );
}

export default memo(VisualizationInfo);

// useEffect(() => {
//   const comparableKeys = ['clinics', 'jobs_w'];
//   const comparing = {
//     bike: ['8848f4a641fffff', '8848f4b26dfffff'],
//     walk: ['8848f4b209fffff'],
//   };
//   if (!gridData) {
//     return () => undefined;
//   }

//   const featuresProperties = Object.keys(gridData ?? {}).reduce(
//     (acc: Record<string, any>, key) => {
//       acc[key] = gridData?.[key].properties;

//       return acc;
//     },
//     {}
//   );
//   const comparingTotals = Object.keys(comparing).map((key) => {
//     const total = comparing[key].reduce((accc: number, id: string) => {
//       const feature = featuresProperties[id];
//       const t = comparableKeys.reduce((occ: number, keyo: string) => {
//         return occ + feature[keyo];
//       }, 0);
//       return accc + t;
//     }, 0);
//     return total;
//   });

//   let instance: Chart | null = null;
//   const chartContainer = document.getElementById(
//     'total'
//   ) as HTMLCanvasElement;
//   const comparableFilter = getComparableFilter(currentVisualization);
//   const labels = comparableFilter?.options.map((option) => option.name);
//   const colors = comparableFilter?.options.map((option) => option.color);
//   const data = {
//     labels,
//     datasets: [
//       {
//         label: 'Total oportunities',
//         data: comparingTotals,
//         backgroundColor: colors,
//       },
//     ],
//   };

//   instance = new Chart(chartContainer, {
//     type: 'bar',
//     data,
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true,
//         },
//       },
//     },
//   });

//   return () => {
//     instance?.destroy();
//   };
// }, [currentVisualization, gridData]);
