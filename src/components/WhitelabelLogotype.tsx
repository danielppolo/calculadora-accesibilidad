import useConfig from 'src/hooks/data/useConfig';
import React from 'react';

function WhiteLabelLogotype() {
  const { data: config } = useConfig();

  if (!config?.logotype?.file?.url) {
    return null;
  }

  return (
    <img className="h-8" src={config?.logotype?.file?.url} alt="Logotype" />
  );
}

export default WhiteLabelLogotype;
