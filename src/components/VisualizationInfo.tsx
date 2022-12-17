import React, { memo, useEffect, useState } from 'react';
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
  const [activeChart, setActiveChart] = useState<Chart | undefined>();

  useEffect(() => {
    if (activeChart) {
      return;
    }

    const chartContainer = document.getElementById(
      'XXXXXX'
    ) as HTMLCanvasElement;

    if (currentVisualization?.chartConfig && chartContainer !== null) {
      const chart = new Chart(
        chartContainer,
        currentVisualization?.chartConfig
      );
      setActiveChart(chart);
    }
  }, [activeChart, currentVisualization?.chartConfig]);

  return (
    <div className="prose max-w-none">
      <div
        dangerouslySetInnerHTML={{
          __html: marked.parse(currentVisualization?.text || ''),
        }}
      />
      <div className="w-full relative">
        <canvas id="XXXXXX" />
      </div>
    </div>
  );
}

export default memo(VisualizationInfo);
