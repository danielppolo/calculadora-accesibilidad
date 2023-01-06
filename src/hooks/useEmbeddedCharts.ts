import Chart, { ChartConfiguration } from 'chart.js/auto';
import { useEffect, useMemo } from 'react';
import { marked } from 'marked';

marked.setOptions({
  gfm: true,
});

interface UseEmbeddedChartsProps {
  text?: string;
  chartData?: Record<string, ChartConfiguration>;
}

function useEmbeddedCharts({ text = '', chartData }: UseEmbeddedChartsProps) {
  const chartIds = Object.keys(chartData || {});
  const htmlText = useMemo(() => {
    let content = text;

    chartIds.forEach((id) => {
      content = content.replace(
        `{{${id}}}`,
        `<div className="w-full relative"><canvas id="${id}" /></div> `
      );
    });

    return marked.parse(content);
  }, [chartIds, text]);

  useEffect(() => {
    const chartInstances = chartIds.map((id) => {
      const chartContainer = document.getElementById(id) as HTMLCanvasElement;

      if (chartData && chartContainer !== null && chartData?.[id]) {
        return new Chart(chartContainer, chartData[id]);
      }

      return null;
    });

    return () => {
      chartInstances.forEach((chart) => chart?.destroy());
    };
  }, [chartIds, chartData]);

  return htmlText;
}

export default useEmbeddedCharts;
