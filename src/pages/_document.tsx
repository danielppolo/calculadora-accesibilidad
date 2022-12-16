import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

function Document() {
  return (
    <Html>
      <Head>
        <title>Visualizador de accesibilidad urbana</title>
        <meta
          name="description"
          content="Este proyecto tiene como objetivo mostrar las oportunidades de las 20 zonas metropolitanas más grandes de México."
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="icon"
          href="https://ideamos.mx/wp-content/uploads/2020/09/cropped-Captura-de-Pantalla-2020-09-24-a-las-21.29.52-2-32x32.png"
          sizes="32x32"
        />
        <link
          rel="stylesheet"
          id="pofo-adobe-font-css"
          href="https://use.typekit.net/yee4veh.css"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
export default Document;
