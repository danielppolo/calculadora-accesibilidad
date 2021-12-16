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
      main: '#221E1B',
    },
    secondary: {
      main: '#FFF',
    },
    info: {
      light: '#65948f',
      dark: '#00524c',
      main: '#30726d',
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Calculadora de accesibilidad</title>
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
