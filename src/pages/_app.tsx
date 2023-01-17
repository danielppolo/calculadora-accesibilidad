/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';

import 'mapbox-gl/dist/mapbox-gl.css';
import 'src/styles/globals.css';
import 'src/styles/overrides.css';
import 'tailwindcss/tailwind.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
      staleTime: Infinity,
    },
  },
});

const antdTheme = {
  token: {
    fontFamily: 'sofia-pro',
    // colorPrimary: '#1A1A1A',
  },
};

function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={antdTheme}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
