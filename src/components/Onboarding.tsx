import React, { memo, useEffect } from 'react';
import { ONBOARDING_STORAGE_KEY } from 'src/constants';
import useConfig from 'src/hooks/data/useConfig';
import useEmbeddedCharts from 'src/hooks/useEmbeddedCharts';

function Onboarding() {
  const { data: config } = useConfig();
  const dangerousHTML = useEmbeddedCharts({
    text: config?.onboardingText,
    chartData: config?.onboardingChartConfig,
  });

  useEffect(() => {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, Date.now().toString());
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
