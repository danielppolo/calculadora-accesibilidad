/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import Link from 'next/link';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { marked } from 'marked';
import { Input, Button } from 'antd';
import NavBar from 'src/components/Navbar';
import Footer from 'src/components/Footer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const contentful = require('contentful');

marked.setOptions({
  gfm: true,
});

const client = contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ?? '',
});

const CustomButton = () => (
  <Link passHref href="/map">
    <button
      type="button"
      className="bg-blue rounded-full px-4 py-2 text-white font-medium"
    >
      Accede a la plataforma
    </button>
  </Link>
);

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchLandingPage = async () => {
      try {
        const response = await client.getEntry(
          process.env.NEXT_PUBLIC_LANDING_PAGE_ID
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

  return (
    <div>
      <NavBar />
      <Container maxWidth="md">
        <div className="prose max-w-none">
          <div className="my-12">
            <div className="my-8">
              <div
                className="text-center text-3xl mb-2 font-bold"
                dangerouslySetInnerHTML={{
                  __html: marked.parse(data?.title || ''),
                }}
              />
              <div
                className="text-center text-xl"
                dangerouslySetInnerHTML={{
                  __html: marked.parse(data?.subtitle || ''),
                }}
              />
            </div>
            <div
              className="mb-4"
              dangerouslySetInnerHTML={{
                __html: marked.parse(data?.descriptionHead || ''),
              }}
            />
            <div className="flex justify-center my-8">
              <CustomButton />
            </div>
          </div>

          <Grid container spacing={3} className="my-8">
            <Grid item xs={12} lg={3}>
              <img
                className="w-full object-cover h-48 mb-8"
                src={`https:${data?.feature1img?.fields?.file?.url}`}
                alt="Img"
              />
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: marked.parse(data?.feature1 || ''),
                }}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <img
                className="w-full object-cover h-48 mb-8"
                src={`https:${data?.feature2img?.fields?.file?.url}`}
                alt="Img"
              />
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: marked.parse(data?.feature2 || ''),
                }}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <img
                className="w-full object-cover h-48 mb-8"
                src={`https:${data?.feature3img?.fields?.file?.url}`}
                alt="Img"
              />
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: marked.parse(data?.feature3 || ''),
                }}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <img
                className="w-full object-cover h-48 mb-8"
                src={`https:${data?.feature4img?.fields?.file?.url}`}
                alt="Img"
              />
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: marked.parse(data?.feature4 || ''),
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={4} className="my-16">
            <Grid item xs={12} lg={6}>
              <img
                className="object-cover w-full h-full"
                src={`https:${data?.section1img?.fields?.file?.url}`}
                alt=""
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <div
                dangerouslySetInnerHTML={{
                  __html: marked.parse(data?.sectionTwo || ''),
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <img
                className="h-96 w-full object-cover"
                src={`https:${data?.map?.fields?.file?.url}`}
                alt="Mapa"
              />
              <legend className="text-xs text-center">{data?.mapLegend}</legend>
            </Grid>
          </Grid>

          <Grid container spacing={3} className="my-16">
            <Grid item xs={12} lg={6}>
              <div
                dangerouslySetInnerHTML={{
                  __html: marked.parse(data?.sectionThree || ''),
                }}
              />
              <CustomButton />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img
                className="h-full w-full object-cover"
                src={`https:${data?.section2img?.fields?.file?.url}`}
                alt="GIF"
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} className="my-12">
            <Grid item xs={12}>
              <img
                className="w-full object-cover h-96"
                src={`https:${data?.gif?.fields?.file?.url}`}
                alt=""
              />
              <legend className="text-xs text-center">{data?.gifLegend}</legend>
            </Grid>
          </Grid>

          <Grid container spacing={3} className="my-12 text-sm">
            <Grid item xs={12}>
              <h3 className="font-bold text-xl mb-6 text-center">
                Preguntas frequentes
              </h3>
              <div
                className="space-y-4"
                dangerouslySetInnerHTML={{
                  __html: marked.parse(data?.faq || ''),
                }}
              />
            </Grid>
          </Grid>
        </div>
        <div>
          <h3 className="font-bold text-xl mt-24 mb-6 text-center">
            Comentarios y sugerencias
          </h3>

          {/* <iframe
            height="437"
            title="Embedded Wufoo Form"
            style={{ width: '100%', border: 'none' }}
            sandbox="allow-popups-to-escape-sandbox allow-top-navigation allow-scripts allow-popups allow-forms allow-same-origin"
            src="https://danielppolo.wufoo.com/embed/zdgpcky1nrnmky/"
          >
            {' '}
            <a href="https://danielppolo.wufoo.com/forms/zdgpcky1nrnmky/">
              Fill out my Wufoo form!
            </a>{' '}
          </iframe> */}

          <form name="contact" method="POST" data-netlify="true">
            <input type="hidden" name="form-name" value="contact" />
            <p className="mb-4">
              <label>
                <Input type="text" name="name" placeholder="Nombre" />
              </label>
            </p>
            <p className="mb-4">
              <label>
                <Input type="email" name="email" placeholder="Email" />
              </label>
            </p>
            <p className="mb-4">
              <label>
                <Input.TextArea name="message" placeholder="Sugerencias" />
              </label>
            </p>
            <p>
              <Button htmlType="submit" type="dashed" block size="large">
                Send
              </Button>
            </p>
          </form>
        </div>
      </Container>
      <div className="my-32" />
      <Footer />
    </div>
  );
}
