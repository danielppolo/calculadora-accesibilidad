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

function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'sofia-pro',
          colorPrimary: '#1A1A1A',
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>

      <div
        id="popup"
        className="bg-gray-800 text-white fixed rounded-sm p-2 text-xs"
      />
    </ConfigProvider>
  );
}

export default App;
