/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import theme from 'src/styles/theme';
import type { AppProps } from 'next/app';

import 'mapbox-gl/dist/mapbox-gl.css';
import 'src/styles/globals.css';
import 'src/styles/overrides.css';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Visualizador de accesibilidad urbana</title>
        <meta name="description" content="Este proyecto tiene como objetivo mostrar las oportunidades de las 20 zonas metropolitanas más grandes de México." />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link rel="icon" href="https://ideamos.mx/wp-content/uploads/2020/09/cropped-Captura-de-Pantalla-2020-09-24-a-las-21.29.52-2-32x32.png" sizes="32x32" />
        <link rel="stylesheet" id="pofo-adobe-font-css" href="https://use.typekit.net/yee4veh.css" type="text/css" media="all" />
      </Head>
      <Component {...pageProps} />
      <div id="popup" className="bg-gray-800 text-white fixed rounded-sm p-2 text-xs" />
    </ThemeProvider>
  );
}

export default MyApp;
