import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/globals.css';
import '../styles/overrides.css';
import 'tailwindcss/tailwind.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A1A1A',
    },
    secondary: {
      main: '#F1F3EE',
    },
    info: {
      light: '#307DC6',
      dark: '#307DC6',
      main: '#307DC6',
    },
    warning: {
      light: '#F1BB43',
      dark: '#F1BB43',
      main: '#F1BB43',
    },
    blue: {
      light: '#307DC6',
      dark: '#307DC6',
      main: '#307DC6',
    },
    yellow: {
      light: '#F1BB43',
      dark: '#F1BB43',
      main: '#F1BB43',
    },
    aqua: {
      light: '#43C6CB',
      dark: '#43C6CB',
      main: '#43C6CB',
    },
    green: {
      light: '#54AC59',
      dark: '#54AC59',
      main: '#54AC59',
    },
    pink: {
      light: '#FF9DE1',
      dark: '#FF9DE1',
      main: '#FF9DE1',
    },
    orange: {
      light: '#FE8840',
      dark: '#FE8840',
      main: '#FE8840',
    },
    red: {
      light: '#DA546F',
      dark: '#DA546F',
      main: '#DA546F',
    },
    purple: {
      light: '#7054BC',
      dark: '#7054BC',
      main: '#7054BC',
    },
  },
});

function MyApp({ Component, pageProps }) {
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
