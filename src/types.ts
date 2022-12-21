import { LngLatLike } from 'mapbox-gl';
import type { Feature, Polygon } from 'geojson';
import { ChartConfiguration } from 'chart.js';

export type ContentfulImage = {
  file?: {
    url: string;
  };
};

export type MapParamsState = {
  gridCode?: string;
  cityCode?: string;
  visualizationCode?: string;
  variantCode?: string;
  featureId?: string;
  filters?: Record<string, string>;
};

export type MapboxLayerManager = {
  toggle: () => void;
  isActive: boolean;
  legend: Legend;
};

export type MapMouseEvent = mapboxgl.MapMouseEvent & {
  features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
} & mapboxgl.EventData;

type Color = string;

export type Scenario = {
  bucketName: string;
  name: string;
};

export type Legend = {
  title: string;
  intervals: {
    color: string;
    label: string;
  }[];
};

// Platform
export type Property = {
  // Nombre de la propiedad. Visible para el usuario.
  name: string;
  // Código único en formato snake_case. Se usa para referenciar la propiedad en las distintas partes del código.
  code: string;
  // Unit to display when hovering over a feature.
  unit?: string;
  // Material Icon name. https://fonts.google.com/icons
  iconName?: string;
  // Layers to be enabled on selection.
  enabledMapboxTilesets?: MapboxTileset[];
};

export type Grid = {
  // Unique code in snake_case. Represents the variant.
  code: string;
  // Tamaño del hexágono base.
  size: number;
};

export type DataProvider = {
  // Código único en formato snake_case. Se usa para referenciar el proveedor de datos en las distintas partes del código.
  code: string;
  // Nombre del proveedor de datos visible para el cliente.
  name: string;
  // Dirección URL del proveedor de datos.
  url: string;
  // Dirección URL del asset a mostrar.
  logo?: ContentfulImage;
  // Nombre del proveedor de datos visible para el cliente.
  label?: string;
};

export type MapboxTileset = {
  // Aplication layer code. Unique.
  code: string;
  // Mapbox's layer code.
  sourceLayer: string;
  // Mapbox's tileset ID.
  tilesetId: string;
  // Geomtry visualization type.
  type: 'fill' | 'line';
  // Layer name. Visible to the user.
  name: string;
  // Geometry fill color in HEX code.
  fillColor?: string;
  // Geometry fill opacity. 0-1.
  fillOpacity?: number;
  // Geometry line color in HEX code.
  lineColor?: string;
  // Geometry line opacity. 0-1.
  lineOpacity?: number;
  // Geometry line width in pixels.
  lineWidth?: number;
  // Custom legend
  customLegend?: Legend;
  // Color property
  colorProperty?: string;
};

export type StaticVisualization = {
  // Nombre de la visualización. Visible para el usuario en la leyenda.
  name: string;
  // Código único en formato snake_case. Se usa para referenciar la ciudad en las distintas partes del código.
  code: string;
  // Layers que component el mapa.
  mapboxTilesets: MapboxTileset[];
};

export type VisualizationVariant = {
  // Nombre de la visualización. Visible para el usuario.
  name: string;
  // Código único en formato snake_case. Se usa para referenciar la visualización en las distintas partes del código.
  code: string;
  // Proveedor de datos para la visualización.
  dataProviders: DataProvider[];
  // Unidad de los valores
  unit: string;
  // Tipo de visualización. Determina su display e interactividad.
  relative: 'city' | 'hexagon';
  // Default static visualization. Enabled when users select viz.
  defaultStaticVisualizations: StaticVisualization[];
};

export type Filter = {
  // Nombre de la visualización. Visible para el usuario.
  name: string;
  // Código único en formato snake_case. Se usa para referenciar la visualización en las distintas partes del código.
  code: string;
  // Controles activados por default
  properties: Property[];
  // Controles activados por default
  defaultProperty: Property;
  // Controles activados por default. Defaults to select.
  selectorType?: 'button' | 'select' | 'slider' | 'radio';
};

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
  // Controles activados por default
  filters: Filter[];
  // Min color
  minColor: Color;
  // Max color
  maxColor: Color;
  // Max color
  text?: string;
  // Chart.js congifuration. https://www.chartjs.org/docs/latest/configuration/
  chartConfig?: Record<string, ChartConfiguration>;
  // Controles activados por default. Defaults to select.
  variantSelectorType?: 'select' | 'slider' | 'radio';
  // Number of steps to for the color breakdown.
  ranges?: string[];
  // Buckets para filtrar los valores. (En caso de requerir filtro)
  groups?: string[];
};

export type Country = {
  // Nombre del país. Visible para el usuario.
  name: string;
  // Código único en formato snake_case. Se usa para referenciar el país en las distintas partes del código.
  code: string;
  // Esconde/muestra la ciudad en la calculadora.
  active: boolean;
  // Visualizaciones de Mapbox disponibles para el país.
  staticVisualizations: StaticVisualization[];
};

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
  // Controles activados por default. Defaults to select.
  visualizationSelectorType?: 'select' | 'radio';

  metadata: {
    // Total de oportunidades en la ciudad. Usado en charts.
    totalOpportunities?: number;
  };
};

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
};

export type Code = string;

export type UUID = string;

export type FeatureDictionary = Record<UUID, Feature<Polygon>>;

export type Config = Record<City['code'], City>;

export type MapData = Record<
  City['code'],
  {
    grids: Record<Code, FeatureDictionary>;
    visualizations: Record<Code, Record<string, Record<Code, any>>>;
  }
>;
