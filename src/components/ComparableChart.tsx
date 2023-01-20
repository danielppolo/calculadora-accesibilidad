import React, { memo, useEffect } from 'react';
import { useMapParams } from 'src/context/mapParams';
import useCurrentVisualization from 'src/hooks/data/useCurrentVisualization';
import { marked } from 'marked';
import { Chart } from 'chart.js';
import getComparableFilter from 'src/utils/getComparableFilter';
import isComparable from 'src/utils/isComparable';
import { useMapboxLayerManager } from 'src/context/mapboxLayerManager';
import type { Feature, Polygon } from 'geojson';
import { generateVariantId } from 'src/utils';
import { isEmpty } from 'lodash';

marked.setOptions({
  gfm: true,
});

function ComparableChart() {
  const { current } = useMapParams();
  const { comparingGeojson } = useMapboxLayerManager();
  const getCurrentVisualization = useCurrentVisualization();
  const currentVisualization = getCurrentVisualization(current);

  useEffect(() => {
    const comparableFilter = getComparableFilter(currentVisualization);
    const comparingCodes =
      comparableFilter?.code && current?.filters
        ? [current.filters[comparableFilter.code]].flat()
        : [];

    const sampleId =
      comparingCodes.length &&
      comparableFilter &&
      generateVariantId({
        ...current,
        filters: {
          ...current.filters,
          [comparableFilter.code]: comparingCodes[0],
        },
      });

    if (
      isEmpty(comparingGeojson) ||
      !isComparable(currentVisualization) ||
      !comparingCodes?.length ||
      !comparableFilter ||
      !sampleId ||
      !comparingGeojson[sampleId]
    ) {
      return () => undefined;
    }
    const comparableKeys =
      currentVisualization?.comparableOptions?.map((option) => option?.code) ??
      [];
    const comparableLabels =
      currentVisualization?.comparableOptions?.map((option) => option?.name) ??
      [];

    const datasets = comparingCodes.map((optionCode) => {
      const id = generateVariantId({
        ...current,
        filters: {
          ...current.filters,
          [comparableFilter.code]: optionCode,
        },
      });

      const total = comparableKeys.map((comparableKey) => {
        return comparingGeojson[id].features.reduce(
          (acc: number, feature: Feature<Polygon>) => {
            return acc + feature.properties?.[comparableKey];
          },
          0
        );
      });

      const colors = Object.keys(comparableKeys).map(
        (key) =>
          comparableFilter?.options.find((option) => option.code === optionCode)
            ?.color
      );

      return {
        label: comparableFilter?.options?.find(
          (option) => option.code === optionCode
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
        // indexAxis: 'y',
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            display: false,
          },
        },
        responsive: true,
      },
    });

    return () => {
      instance?.destroy();
    };
  }, [comparingGeojson, current, current.filters, currentVisualization]);

  return (
    <div className="w-full relative h-[300px]">
      <canvas id="comparable" />
    </div>
  );
}

export default memo(ComparableChart);
