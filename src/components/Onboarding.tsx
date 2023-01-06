import React, { memo } from 'react';
import useConfig from 'src/hooks/data/useConfig';
import useEmbeddedCharts from 'src/hooks/useEmbeddedCharts';

function Onboarding() {
  const { data: config } = useConfig();
  const dangerousHTML = useEmbeddedCharts({
    text: config?.onboardingText,
    chartData: config?.onboardingChartData,
  });

  return (
    <div
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{
        __html: dangerousHTML,
      }}
    />
  );
}

export default memo(Onboarding);
