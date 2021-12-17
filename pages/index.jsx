import React from 'react';
import { Container, Grid } from '@mui/material';
import Link from 'next/link';

const Button = () => (
  <Link href="/map">
    <button className="bg-blue rounded-full px-4 py-2 text-white font-medium">Accede a la plataforma</button>
  </Link>
);

export default function Home() {
  return (
    <div>
      <div className="bg-blue h-16 text-white flex items-center justify-between px-16">
        <img className="h-6" src="/logo-ideamos-blanco.png" alt="Logotipo" />
        <div className="space-x-8 text-2xl">
          <a className="hover:opacity-70 duration-100" href="https://ideamos.mx/el-programa">El programa</a>
          <a className="hover:opacity-70 duration-100" href="https://ideamos.mx/indice-de-pilotos">Los pilotos</a>
          <a className="hover:opacity-70 duration-100" href="https://ideamos.mx/noticias">Noticias</a>
          <a className="hover:opacity-70 duration-100" href="https://ideamos.mx/convocatoria">Convocatoria</a>
        </div>
      </div>
      <div className="bg-blue h-16 text-white flex items-center justify-between px-16">
        <div>
          <p>Una iniciativa de:</p>
          <p>Con apoyo de:</p>
        </div>
        <div className="">
          <a href="https://github.com/itdp">
            <img className="h-8" src="/github.png" alt="Github Logo" />
          </a>
        </div>
      </div>
      <Container maxWidth="md">
        <div className="my-12">
          <div className="my-8">
            <h1 className="text-center text-3xl font-bold">
              Visualizador de accesibilidad urbana y acceso a oportunidades
            </h1>
            <h2 className="text-center text-xl">
              Una plataforma para facilitar el diseño de soluciones de movilidad en ciudades mexicanas
            </h2>
          </div>
          <p className="mb-4">
            Esta herramienta interactiva facilita el análisis de accesibilidad urbana en 20 ciudades mexicanas, al visibilizar in-
            formación integrada sobre la oferta de transporte, y acceso a, empleos, escuelas, clínicas.
          </p>
          <p className="mb-4">
            <strong>¿El objetivo?</strong>
            {' '}
            generar referencias que contribuyan al diseño de soluciones de movilidad, principalmente para ciu-
            dades y servicios de las Empresas de Redes de Transporte (ERT).
          </p>

          <div className="flex justify-center my-8">
            <Button />
          </div>
        </div>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            <img src="" alt="" />
            <p>
              Las ciudades podrán identificar
              zonas de baja accesibilidad a
              oportunidades y brechas de acceso
              a la movilidad en diferentes sectores
              de la población, entre otros
              indicadores que pueden ser
              considerados en el diseño y
              planeación de servicios de
              transporte.

            </p>
          </Grid>
          <Grid item xs={12} lg={3}>
            <img src="" alt="" />
            <p>
              Las empresas de la red de
              transporte (ERT) podrán explorar
              zonas con poca oferta de movilidad
              o movilidad limitada, así como
              identificar zonas con alta atracción
              de viajes poco atendidas donde
              será posible ofrecer servicios
              adaptados con nuevas opciones de
              transporte.
            </p>
          </Grid>
          <Grid item xs={12} lg={3}>
            <img src="" alt="" />
            <p>
              Las y los estudiantes, docentes e
              investigadores que realizan análisis
              sobre movilidad, urbanismo y
              accesibilidad podrán explorar
              indicadores integrados por área
              geográfica en 20 ciudades
              mexicanas.
            </p>
          </Grid>
          <Grid item xs={12} lg={3}>
            <img src="" alt="" />
            <p>
              La ciudadanía podrá conocer las
              medidas de accesibilidad y
              oportunidades de áreas de interés
              para habitar o emprender negocios.
            </p>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <img src="" alt="" />
          </Grid>
          <Grid item xs={12} lg={6}>
            <h3>
              Diseño de soluciones considerando el acceso
              a oportunidades:
            </h3>
            <p>
              La accesibilidad urbana nos indica a cuántas oportunidades (empleos,
              empresas, clínicas, servicios básicos, etc) se puede acceder en un tiempo y
              medio de transporte dados.

              Esta plataforma integra distintos mapas que nos muestran la accesibilidad
              urbana por áreas geográficas o hexágonos de 20 ciudades mexicanas:
            </p>
            <ul>
              <li>
                Mapa de accesibilidad urbana por ciudad, con indicadores desagregados
                por género e índice de marginación.
              </li>
              <li>Mapa de acceso a oportunidades por ciudad.</li>
              <li>
                Mapa con áreas geográficas desagregado por modo de transporte y
                tiempo de traslado.
              </li>
            </ul>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <img src="" alt="" />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <h3>
              Explorar la plataforma es muy sencillo.
            </h3>
            <p>
              También, puedes agendar un taller para aprovechar todo su potencial:
            </p>
            <ol>
              <li>
                Da click en un hexágono + bullet explicativo
              </li>
              <li>Selecciona el tiempo + bullet</li>
              <li>
                Selecciona modo de transporte.
              </li>
              <li>Observa la isocrona y el histograma.</li>
            </ol>
            <p>
              Escribe a ideamos@itdp.org para agendar un taller, asesoría o aclarar
              cualquier duda que no esté incluida en nuestra sección de Preguntas
              Frecuentes.
            </p>

            <Button />
          </Grid>
          <Grid item xs={12} lg={6}>
            <img src="" alt="" />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <img src="" alt="" />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h3>Preguntas frequentes</h3>
            <p className="font-bold">Pregunta: Mi ciudad no está en la plataforma ¿qué puedo hacer?</p>
            <p>
              Respuesta: Puedes contactarnos si quieres explorar los análisis para una ciudad que no se encuentra en la
              plataforma, puedes contactarnos.
            </p>

            <p className="font-bold">Pregunta: ¿Cómo puedo citar la información de la plataforma?</p>
            <p>
              Respuesta: Puedes contactarnos si quieres explorar los análisis para una ciudad que no se encuentra en la
              plataforma, puedes contactarnos.
            </p>

            <p className="font-bold">Pregunta: ¿Puedo usar la herramienta para mis proyectos?</p>
            <p>
              Respuesta: Sí, la herramienta es de código abierto y está publicada en un repositorio de Github. Puedes modificar,distribuir y
              adaptar, siempre que le reconozca al ITDP la creación original.
            </p>
            <p className="font-bold">Pregunta: ¡Tengo más preguntas!</p>
            <p>Respuesta: Envíanos un correo a ideamos@itdp.org.</p>
            <p className="font-bold">Pregunta: ¿Dónde puedo descargar la información?</p>
            <p>
              Respuesta: La información de accesibilidad y acceso a oportunidades puede descargarse dentro de la plataforma a través del
              botón “Descargar”. Por el momento no es posible descargar todos los datos al mismo tiempo, pero si lo necesitas ponte en
              contacto con nosotros.
            </p>
          </Grid>
        </Grid>

      </Container>
      <div className="bg-black h-16 text-white flex items-center justify-between px-16">
        <div>
          <p>Una iniciativa de:</p>
          <p>Con apoyo de:</p>
        </div>
        <div className="">
          <a href="https://github.com/itdp">
            <img className="h-8" src="/github.png" alt="Github Logo" />
          </a>
        </div>
      </div>
    </div>
  );
}
