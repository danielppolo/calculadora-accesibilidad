import React, { memo, useEffect } from 'react';
import useConfig from 'src/hooks/data/useConfig';
import useEmbeddedCharts from 'src/hooks/useEmbeddedCharts';

function Onboarding() {
  const { data: config } = useConfig();
  const dangerousHTML = useEmbeddedCharts({
    text: config?.onboardingText,
    chartData: config?.onboardingChartConfig,
  });

  useEffect(() => {
    localStorage.setItem('onboarded', Date.now().toString());
  }, []);

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
