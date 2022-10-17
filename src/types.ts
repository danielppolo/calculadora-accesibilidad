import { LngLatLike } from 'mapbox-gl';
import { Feature, Polygon } from 'geojson';

export type Scenario = {
  bucketName: string;
  name: string;
}

export type Legend = {
  title: string;
  intervals: {
    color: string;
    label: string;
  }[]
}

// Platform
export type Property = {
  // Nombre de la propiedad. Visible para el usuario.
  name: string;
  // Código único en formato snake_case. Se usa para referenciar la propiedad en las distintas partes del código.
  code: string;
}

export type Grid = {
  // Unique code in snake_case. Represents the variant.
  code: string;
  // Tamaño del hexágono base.
  size: number;
}

export type Transport = {
  // Nombre del transporte. Visible para el usuario.
  name: string;
  // Código único en formato snake_case. Se usa para referenciar el transport en las distintas partes del código.
  code: string;
}

export type DataProvider = {
   // Código único en formato snake_case. Se usa para referenciar el proveedor de datos en las distintas partes del código.
  code: string;
  // Nombre del proveedor de datos visible para el cliente.
  name: string;
  // Dirección URL del proveedor de datos.
  url: string;
  // Dirección URL del asset a mostrar.
  logotype: string;
}

export type MapboxTileset = {
  // Aplication layer code. Unique.
  code: 'uso-agricultura';
  // Mapbox's layer code.
  sourceLayer: 'AGRICULTURA-1nglu1';
  // Mapbox's tileset ID.
  tilesetId: 'mapbox://daniel-itdp.d2k35cu0';
  // Geomtry visualization type.
  type: 'fill' | 'line';
  // Layer name. Visible to the user.
  name: 'Agricultura';
  // Geometry fill color in HEX code.
  fillColor: string;
  // Geometry fill opacity. 0-1.
  fillOpacity: 0.3;
  // Geometry line color in HEX code.
  lineColor: string;
  // Geometry line opacity. 0-1.
  lineOpacity: 0.3;
  // Geometry line width in pixels.
  lineWidth: 0.3;
}

export type StaticVisualization = {
   // Nombre de la visualización. Visible para el usuario en la leyenda.
  name: string;
  // Código único en formato snake_case. Se usa para referenciar la ciudad en las distintas partes del código.
  code: string;
  // Layers que component el mapa.
  mapboxTilesets: MapboxTileset[];
}

export type VisualizationVariant = {
  // Nombre de la visualización. Visible para el usuario.
  name: string;
  // Código único en formato snake_case. Se usa para referenciar la visualización en las distintas partes del código.
  code: string;
  // Proveedor de datos para la visualización.
  dataProvider: DataProvider;
  // Unidad de los valores
  unit: 'minutes' | 'hours' | 'seconds'; // TBD
  // Buckets para filtrar los valores. (En caso de requerir filtro)
  buckets: number[];
  // Tipo de visualización. Determina su display e interactividad.
  type: 'isocrone' | 'static';
  // Default static visualization. Enabled when users select viz.
  defaultStaticVisualizations: StaticVisualization[];
  // Controles activados por default
  properties: Property[]
  // Controles activados por default
  defaultProperties: Property[]
}

export type Visualization = {
  // Nombre de la visualización. Visible para el usuario.
  name: string;
  // Código único en formato snake_case. Se usa para referenciar la visualización en las distintas partes del código.
  code: string;
  // Default variant to display.
  defaultVariant: VisualizationVariant;
  // Variants for the visualization. E.g. Different time.
  variants: VisualizationVariant[];
  // HEX Grid que usa la visualización.
  grid: Grid;
}

export type Country = {
  // Nombre del país. Visible para el usuario.
  name: string;
  // Código único en formato snake_case. Se usa para referenciar el país en las distintas partes del código.
  code: string;
  // Esconde/muestra la ciudad en la calculadora.
  active: boolean;
  // Visualizaciones de Mapbox disponibles para el país.
  staticVisualizations: StaticVisualization[];
}

export type City = {
  // Nombre de la ciudad. Visible para el usuario.
  name: string;
  // Código único en formato snake_case. Se usa para referenciar la ciudad en las distintas partes del código.
  code: string;
  // País al que pertenece.
  country: Country;
  // Esconde/muestra la ciudad en la calculadora.
  active: boolean;
  // Representa las coordenadas centro de la ciudad.
  coordinates: LngLatLike;
  // Color en formato HEX. Usado para charts, etc.
  color: string;
  // Visualización por default que se muestra cuando se selecciona la ciudad.
  defaultVisualization: Visualization;
  // Visualizaciones disponibles para la ciudad.
  visualizations: Visualization[];
  // Visualizaciones de Mapbox disponibles para la ciudad.
  staticVisualizations: StaticVisualization[];

  metadata: {
    // Total de oportunidades en la ciudad. Usado en charts.
    totalOpportunities?: number;
  }
}

// Landing
export type LandingPage = {
  title: string;
  subtitle: string;
  description: string;
  feature1: string;
  feature2: string;
  feature3: string;
  feature4: string;
  feature1Img: string;
  feature2Img: string;
  feature3Img: string;
  feature4Img: string;
  sectionTwo: string;
  sectionThree: string;
  section1Img: string;
  section2Img: string;
  gif: string;
  faq: string;
  map: string;
}

export type Code = string;
export type UUID = string;
export type FeatureDictionary = Record<UUID, Feature<Polygon>>
export type Config = Record<City['code'], City>
export type MapData = Record<City['code'], {
  grids: Record<Code, FeatureDictionary>,
  visualizations: Record<Code, Record<string, Record<Code, any>>>,
}>;
