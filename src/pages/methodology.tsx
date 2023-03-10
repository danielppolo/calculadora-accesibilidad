/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-danger */

import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import NavBar from 'src/components/Navbar';
import Footer from 'src/components/Footer';

const tm = require('markdown-it-texmath');
const md = require('markdown-it')({ html: true }).use(tm, {
  engine: require('katex'),
  delimiters: 'dollars',
  katexOptions: { macros: { '\\RR': '\\mathbb{R}' } },
});

const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ?? '',
});

export default function Home() {
  const [data, setData] = useState<any>(null);

  const str =
    "Euler's identity $e^{i\\pi}+1=0$ is a beautiful formula in $\\RR^2$.";

  useEffect(() => {
    const fetchLandingPage = async () => {
      try {
        const response = await client.getEntry(
          process.env.NEXT_PUBLIC_METHODOLOGY_PAGE_ID
        );
        setData(response.fields);
      } catch (e) {
        console.log(e);
      }
    };

    fetchLandingPage();
  }, []);

  if (!data) {
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <CircularProgress color="inherit" />
    </Backdrop>;
  }

  console.log(data);

  return (
    <div>
      <NavBar />
      <Container maxWidth="md">
        <div className="prose max-w-none">
          <div className="my-12">
            <div className="my-8">
              <div
                className="text-3xl font-bold"
                dangerouslySetInnerHTML={{
                  __html: md.render(data?.mainTitle || ''),
                }}
              />
            </div>
            <div
              className="mb-4"
              dangerouslySetInnerHTML={{
                __html: md.render(data?.mainBody || ''),
              }}
            />
          </div>

          <div
            className="text-2xl"
            dangerouslySetInnerHTML={{
              __html: md.render(data?.sectionOneTitle || ''),
            }}
          />
          <Grid container spacing={3} className="mb-8">
            <Grid item xs={12} lg={6}>
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: md.render(data?.sectionOneBody || ''),
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img
                className="w-full object-cover h-48"
                src={`https:${data?.sectionOneImage?.fields?.file?.url}`}
                alt="Img"
              />
              <legend className="text-xs text-center">
                {data?.sectionOneImageLegend}
              </legend>
            </Grid>
          </Grid>

          <Grid container className="my-16">
            <Grid item xs={12}>
              <img
                className="object-cover w-full h-full"
                src={`https:${data?.sectionTwoImage?.fields?.file?.url}`}
                alt=""
              />
              <legend className="text-xs text-center">
                {data?.sectionTwoImageLegend}
              </legend>
            </Grid>
          </Grid>

          <Grid container spacing={3} className="my-8">
            <Grid item xs={12}>
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: md.render(data?.sectionThreeBody || ''),
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <img
                className="h-96 w-full object-cover"
                src={`https:${data?.sectionFourImage?.fields?.file?.url}`}
                alt="Mapa"
              />
              <legend className="text-xs text-center">
                {data?.sectionFourImageLegend}
              </legend>
            </Grid>
          </Grid>

          <Grid container spacing={3} className="mb-8">
            <Grid item xs={12}>
              <div
                className="text-2xl"
                dangerouslySetInnerHTML={{
                  __html: md.render(data?.sectionFiveTitle || ''),
                }}
              />
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: md.render(data?.sectionFiveBody || ''),
                }}
              />
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: md.render(str),
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} className="mb-8">
            <Grid item xs={12}>
              <div
                className="text-2xl"
                dangerouslySetInnerHTML={{
                  __html: md.render(data?.sectionSixTitle || ''),
                }}
              />
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: md.render(data?.sectionSixBody || ''),
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} className="mb-8">
            <Grid item xs={12}>
              <div
                className="text-2xl"
                dangerouslySetInnerHTML={{
                  __html: md.render(data?.subpoenasTitle || ''),
                }}
              />
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: md.render(data?.subpoenasBody || ''),
                }}
              />
            </Grid>
          </Grid>
        </div>
      </Container>
      <div className="my-32" />
      <Footer />
    </div>
  );
}
