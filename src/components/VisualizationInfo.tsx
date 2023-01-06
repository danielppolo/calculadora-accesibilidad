import React, { memo } from 'react';
import { useMapParams } from 'src/context/mapParams';
import useCurrentVisualization from 'src/hooks/data/useCurrentVisualization';
import { marked } from 'marked';
import useEmbeddedCharts from 'src/hooks/useEmbeddedCharts';

marked.setOptions({
  gfm: true,
});

function VisualizationInfo() {
  const { current } = useMapParams();
  const getCurrentVisualization = useCurrentVisualization();
  const currentVisualization = getCurrentVisualization(current);
  const dangerousHTML = useEmbeddedCharts({
    text: currentVisualization?.text,
    chartData: currentVisualization?.chartConfig,
  });

  return (
    <div
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: dangerousHTML }}
    />
  );
}

export default memo(VisualizationInfo);
