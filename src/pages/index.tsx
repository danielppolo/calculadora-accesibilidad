/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-danger */
import React, { useState, useEffect, FormEvent } from 'react';
import { Container, Grid } from '@mui/material';
import Link from 'next/link';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { marked } from 'marked';
import { Input, Button, message } from 'antd';
import NavBar from 'src/components/Navbar';
import Footer from 'src/components/Footer';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { DEFAULT_LOCALE } from 'src/constants';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const contentful = require('contentful');

marked.setOptions({
  gfm: true,
});

const client = contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ?? '',
});

const CustomButton = () => {
  const intl = useIntl();
  return (
    <Link passHref href="/map">
      <button
        type="button"
        className="bg-blue rounded-full px-4 py-2 text-white font-medium"
      >
        {intl.formatMessage({
          defaultMessage: 'Accede a la plataforma',
          id: 'zwZ5Xo',
        })}
      </button>
    </Link>
  );
};

export default function Home() {
  const intl = useIntl();
  const [data, setData] = useState<any>(null);
  const { locale } = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchLandingPage = async () => {
      try {
        const response = await client.getEntry(
          process.env.NEXT_PUBLIC_LANDING_PAGE_ID,
          { locale: locale || DEFAULT_LOCALE }
        );
        setData(response.fields);
      } catch (e) {
        console.log(e);
      }
    };

    fetchLandingPage();
  }, [locale]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const formName = formData.get('form-name');
    const name = formData.get('name');
    const email = formData.get('email');
    const formMessage = formData.get('message');

    const encode = (dataToEncode: any) => {
      return Object.keys(dataToEncode)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(
              dataToEncode[key]
            )}`
        )
        .join('&');
    };

    await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: encode({
        'form-name': formName,
        name,
        email,
        message: formMessage,
      }),
    });
    messageApi.success({
      content: intl.formatMessage({
        defaultMessage: '¡Gracias por tus comentarios!',
        id: 'zpoSLn',
      }),
    });
  };

  const handlePizzaSubmit = (event: any) => {
    event.preventDefault();

    const myForm = event.target;
    const formData = new FormData(myForm);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => console.log('/thank-you/'))
      .catch((error) => alert(error));
  };

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
                {intl.formatMessage({
                  defaultMessage: 'Preguntas frequentes',
                  id: 'LfrL11',
                })}
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
            {intl.formatMessage({
              defaultMessage: 'Comentarios y sugerencias',
              id: 'UZExQX',
            })}
          </h3>

          <form
            data-netlify="true"
            name="pizzaOrder"
            method="post"
            netlify-honeypot="bot-field"
            onSubmit={handlePizzaSubmit}
          >
            <input type="hidden" name="form-name" value="pizzaOrder" />
            <label>
              What order did the pizza give to the pineapple?
              <input name="order" type="text" />
            </label>
            <input type="submit" />
          </form>

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="mb-4">
              <label>
                <Input
                  type="text"
                  name="name"
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Nombre',
                    id: 'hCOqfl',
                  })}
                />
              </label>
            </p>
            <p className="mb-4">
              <label>
                <Input
                  type="email"
                  name="email"
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Email',
                    id: 'sy+pv5',
                  })}
                />
              </label>
            </p>
            <p className="mb-4">
              <label>
                <Input.TextArea
                  name="message"
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Sugerencias',
                    id: '7kHB42',
                  })}
                />
              </label>
            </p>
            <p>
              <Button
                htmlType="submit"
                type="primary"
                block
                size="large"
                className="bg-black"
              >
                {intl.formatMessage({
                  defaultMessage: 'Send',
                  id: '9WRlF4',
                })}
              </Button>
            </p>
          </form>
        </div>
      </Container>
      <div className="my-32" />
      <Footer />
      {contextHolder}
    </div>
  );
}
