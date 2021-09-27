import Head from 'next/head';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#221E1B',
    },
    secondary: {
      main: '#FFF',
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
      </Head>
      <Component {...pageProps} />
      <div id="popup" className="bg-gray-800 text-white fixed rounded-sm p-2 text-xs"></div>
    </ThemeProvider>
  );
}

export default MyApp;
