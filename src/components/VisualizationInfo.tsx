import React, { memo, useEffect, useMemo, useState } from 'react';
import Chart from 'chart.js/auto';
import { useMapParams } from 'src/context/mapParams';
import useCurrentVisualization from 'src/hooks/data/useCurrentVisualization';
import { marked } from 'marked';

marked.setOptions({
  gfm: true,
});

function VisualizationInfo() {
  const { current } = useMapParams();
  const getCurrentVisualization = useCurrentVisualization();
  const currentVisualization = getCurrentVisualization(current);
  const [charts, setCharts] = useState<Array<Chart | null> | undefined>();
  const chartIds = Object.keys(currentVisualization?.chartConfig || {});
  const htmlText = useMemo(() => {
    let content = currentVisualization?.text || '';

    chartIds.forEach((id) => {
      content = content.replace(
        `{{${id}}}`,
        `<div className="w-full relative"><canvas id="${id}" /></div> `
      );
    });

    return marked.parse(content);
  }, [chartIds, currentVisualization?.text]);

  useEffect(() => {
    if (charts) {
      return;
    }

    const chartInstances = chartIds.map((id) => {
      const chartContainer = document.getElementById(id) as HTMLCanvasElement;

      if (
        currentVisualization?.chartConfig &&
        chartContainer !== null &&
        currentVisualization?.chartConfig?.[id]
      ) {
        return new Chart(chartContainer, currentVisualization.chartConfig[id]);
      }

      return null;
    });

    setCharts(chartInstances);
  }, [charts, chartIds, currentVisualization?.chartConfig]);

  return (
    <div
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlText }}
    />
  );
}

export default memo(VisualizationInfo);
