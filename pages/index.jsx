import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { marked } from 'marked';
const contentful = require("contentful");

marked.setOptions({
  gfm: true,
})

const client = contentful.createClient({
  space: "f9qr8a787ywo",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
});

const Button = () => (
  <Link href="/map">
    <button className="bg-blue rounded-full px-4 py-2 text-white font-medium">Accede a la plataforma</button>
  </Link>
);



export default function Home() {
  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await client.getEntry('3q2QHn4ewv8QKVKo10Lkpa')
        setData(response.fields)
      } catch(e) {
        console.log(e)
      }
    }
    fetchCities()
  }, []);

  if (!data) {
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
      <CircularProgress color="inherit" />
    </Backdrop>
  }

  console.log(data)
  return (
    <div>
      <div className="bg-blue h-16 px-4 text-white flex items-center justify-between relative md:px-16">
        <a href="https://ideamos.mx/">
          <img className="h-6" src="/logo-ideamos-blanco.png" alt="Logotipo" />
        </a>
        <div id="desktop-menu" className="space-x-8 text-2xl hidden md:block">
          <a className="hover:opacity-70 duration-100" href="https://ideamos.mx/el-programa">El programa</a>
          <a className="hover:opacity-70 duration-100" href="https://ideamos.mx/indice-de-pilotos">Los pilotos</a>
          <a className="hover:opacity-70 duration-100" href="https://ideamos.mx/noticias">Noticias</a>
          <a className="hover:opacity-70 duration-100" href="https://ideamos.mx/convocatoria">Convocatoria</a>
        </div>
        <MenuIcon className="text-white md:hidden" onClick={() => setExpanded(!expanded)} />
        <div id="mobile-menu" className={`absolute top-16 left-0 right-0 bg-blue opacity-90 duration-300 overflow-hidden ${expanded ? 'h-64' : 'h-0'}`}>
          <a className="duration-100 flex items-center text-2xl p-2 font-bold h-16 border-b border-white" href="https://ideamos.mx/el-programa">El programa</a>
          <a className="duration-100 flex items-center text-2xl p-2 font-bold h-16 border-b border-white" href="https://ideamos.mx/indice-de-pilotos">Los pilotos</a>
          <a className="duration-100 flex items-center text-2xl p-2 font-bold h-16 border-b border-white" href="https://ideamos.mx/noticias">Noticias</a>
          <a className="duration-100 flex items-center text-2xl p-2 font-bold h-16" href="https://ideamos.mx/convocatoria">Convocatoria</a>
        </div>
      </div>
      <div className="bg-blue h-32 px-4 text-white flex items-center justify-between md:px-16 md:h-16">
        <div className="md:items-center md:space-x-16 md:flex">
          <div className="space-x-8 flex items-center h-12">
            <p className="font-bold text-xl">Una iniciativa de:</p>
            <a target="_blank" href="https://mexico.itdp.org">
              <img className="h-8" src="/itdp.png" alt="ITDP Logo" />
            </a>
          </div>
          <div className="space-x-8 flex items-center h-12">
            <p className="font-bold text-xl">Con apoyo de:</p>
            <a target="_blank" href="https://www.iadb.org/es">
              <img className="h-8" src="/bid.png" alt="BID Logo" />
            </a>
            <a target="_blank" href="https://bidlab.org/es">
              <img className="h-8" src="/bid-lab.png" alt="BID LAB Logo" />
            </a>
          </div>
        </div>
        <div className="hidden md:block">
          <a href="https://github.com/ITDPmx/calculadora-accesibilidad">
            <img className="h-6" src="/github.png" alt="Github Logo" />
          </a>
        </div>
      </div>
      <Container maxWidth="md" >
        <div className="prose max-w-none">
        <div className="my-12">
          <div className="my-8">
            <div className="text-center text-3xl mb-2 font-bold" dangerouslySetInnerHTML={{__html: marked.parse(data?.title || '')}} />
            <div className="text-center text-xl" dangerouslySetInnerHTML={{__html: marked.parse(data?.subtitle || '')}} />
          </div>
          <div className="mb-4" dangerouslySetInnerHTML={{__html: marked.parse(data?.descriptionHead || '')}} />
          <div className="flex justify-center my-8">
            <Button />
          </div>
        </div>

        <Grid container spacing={3} className="my-8">
          <Grid item xs={12} lg={3}>
            <img className="w-full object-cover h-48 mb-8" src={'https:' + data?.feature1img?.fields?.file?.url} alt="Img" />
            <div className="text-sm" dangerouslySetInnerHTML={{__html: marked.parse(data?.feature1 || '')}} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <img className="w-full object-cover h-48 mb-8" src={'https:' + data?.feature2img?.fields?.file?.url} alt="Img" />
            <div className="text-sm" dangerouslySetInnerHTML={{__html: marked.parse(data?.feature2 || '')}} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <img className="w-full object-cover h-48 mb-8" src={'https:' + data?.feature3img?.fields?.file?.url} alt="Img" />
            <div className="text-sm" dangerouslySetInnerHTML={{__html: marked.parse(data?.feature3 || '')}} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <img className="w-full object-cover h-48 mb-8" src={'https:' + data?.feature4img?.fields?.file?.url} alt="Img" />
            <div className="text-sm" dangerouslySetInnerHTML={{__html: marked.parse(data?.feature4 || '')}} />
          </Grid>
        </Grid>

        <Grid container spacing={4} className="my-16">
          <Grid item xs={12} lg={6}>
            <img className="object-cover w-full h-full" src={'https:' + data?.section1img?.fields?.file?.url} alt="" />
          </Grid>
          <Grid item xs={12} lg={6}>
            <div dangerouslySetInnerHTML={{__html: marked.parse(data?.sectionTwo || '')}} />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <img className="h-96 w-full object-cover" src={'https:' + data?.map?.fields?.file?.url} alt="Mapa" />
          </Grid>
        </Grid>

        <Grid container spacing={3} className="my-16">
          <Grid item xs={12} lg={6}>
            <div dangerouslySetInnerHTML={{__html: marked.parse(data?.sectionThree || '')}} />
            <Button />
          </Grid>
          <Grid item xs={12} lg={6}>
            <img className="h-full w-full object-cover" src={'https:' + data?.section2img?.fields?.file?.url} alt="GIF" />
          </Grid>
        </Grid>

        <Grid container spacing={3} className="my-12">
          <Grid item xs={12}>
            <img className="w-full object-cover h-96" src={'https:' + data?.gif?.fields?.file?.url} alt="" />
          </Grid>
        </Grid>

        <Grid container spacing={3} className="my-12 text-sm">
          <Grid item xs={12}>
            <h3 className="font-bold text-xl mb-6 text-center">Preguntas frequentes</h3>
            <div className="space-y-4" dangerouslySetInnerHTML={{__html: marked.parse(data?.faq || '')}}/>
          </Grid>
        </Grid>
        </div>
      </Container>
      <div className="my-32" />
      <div className="bg-black h-16 text-white flex items-center justify-between px-16">
        <div className="space-x-4 flex items-center">
          <a href="https://mexico.itdp.org" target="_blank" rel="noopener noreferrer">
            <img className="h-5" src="/itdp.png" alt="ITDP Logo" />
          </a>
          <a href="https://ideamos.mx/">
            <img className="h-3" src="/logo-ideamos-blanco.png" alt="Logotipo" />
          </a>
          <a href="https://www.iadb.org/es" target="_blank" rel="noopener noreferrer">
            <img className="h-5" src="/bid.png" alt="BID Logo" />
          </a>
          <a href="https://bidlab.org/es" target="_blank" rel="noopener noreferrer">
            <img className="h-5" src="/bid-lab.png" alt="BID LAB Logo" />
          </a>
        </div>
      </div>
    </div>
  );
}
