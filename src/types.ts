import mapboxgl, { LngLatLike } from 'mapbox-gl';
import type { Feature, Polygon } from 'geojson';
import { ChartConfiguration } from 'chart.js';

export type ContentfulImage = {
  file?: {
    url: string;
  };
};

export type ID = string;

export type ColorExpression = mapboxgl.Expression;

export type MapParamsState = {
  gridCode?: string;
  cityCode?: string;
  visualizationCode?: string;
  variantCode?: string;
  featureId?: string;
  filters?: Record<string, string>;
};

export type MapMouseEvent = mapboxgl.MapMouseEvent & {
  features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
} & mapboxgl.EventData;

type Color = string;

export type Legend = {
  title: string;
  scales: Array<{
    color: string;
    opacity?: number;
    label: string;
    topValue: number;
  }>;
};

// Represents a filter option. It is a property in the dataset JSON.
export type Option = {
  // Human-friendly name.
  name: string;
  // Machine friendly code. Must match propery in the JSON.
  code: string;
  // Unit.
  unit?: string;
  // Material Icon code. Visit https://fonts.google.com/icons
  iconName?: string;
  // Tilesets to enable when the option toggles.
  enabledMapboxTilesets?: MapboxTileset[];
};

// Represents a grid of features
export type Grid = {
  // Machine friendly code. Must match the grid JSON name.
  code: string;
  // Size.
  size: number;
};

// Represents a data provider.
export type DataProvider = {
  // Human-friendly name.
  name: string;
  // Machine friendly code.
  code: string;
  // Provider's URL.
  url?: string;
  // Logotype.
  logo?: ContentfulImage;
  // Helper text.
  helperText?: string;
};

// Represents a Mapbox Tileset. Visit https://studio.mapbox.com/tilesets
export type MapboxTileset = {
  // Tileset's ID.
  id: string;
  // Tileset's source layer.
  sourceLayer: string;
  // Style type.
  type: 'fill' | 'line';
  // Human-friendly name.
  name: string;
  // Fill color, when type fill. Must be a valid MapboxExpression
  fillColorExpression?: ColorExpression;
  // Fill opacity, when type fill.
  fillOpacity?: number;
  // Line color, when type line. Must be a valid MapboxExpression
  lineColorExpression?: ColorExpression;
  // Line opacity, when type line.
  lineOpacity?: number;
  // Line width, when type line.
  lineWidth?: number;
  // Legend object to override the auto-generated.
  legendRanges?: Legend['scales'];
};

// Represents a visualization variant. It's a dataset.
export type VisualizationVariant = {
  // Human-friendly name.
  name: string;
  // Machine friendly code. Must match the filename or namespace in AWS.
  code: string;
  // Visibility. Defaults to false.
  active?: boolean;
  // Unit
  unit?: string;
  // Data providers
  dataProviders?: DataProvider[];
  // Tilesets available when city is selected.
  mapboxTilesets?: MapboxTileset[];
};

// Represents a filter for a visualization.
export type Filter = {
  // Human-friendly name.
  name: string;
  // Machine friendly code.
  code: string;
  // Collection of options.
  options: Option[];
  // Preselected option.
  defaultOption: Option;
  // Selector interface.
  selectorType?: 'button' | 'select' | 'slider' | 'radio';
};

// Represents a visualization.
export type Visualization = {
  // Human-friendly name.
  name: string;
  // Machine friendly code. Must match the AWS namespace.
  code: string;
  // Visibility. Defaults to false.
  active?: boolean;
  // Enables comparison mode.
  comparable?: boolean;
  // Variants for the visualization. E.g. Different time.
  variants: VisualizationVariant[];
  // Default variant to display when toggled.
  defaultVariant: VisualizationVariant;
  // Grid used.
  grid: Grid;
  // Filters available for the datasets.
  filters: Filter[];
  // Color assigned to the minimum value.
  minColor: Color;
  // Color assigned to the maximum value.
  maxColor: Color;
  // Value assigned to the minimum value.
  minValue: number;
  // Value assigned to the maximum value.
  maxValue: number;
  // Number of scales to for the color breakdown. Defaults to 6.
  scalesCount?: number;
  // Overrides the programmatically generated scales.
  customScales?: number[];
  // Text associated to the visualization.
  helperText?: string;
  // Chart.js configuration. Visit https://www.chartjs.org/docs/latest/configuration/
  chartConfig?: Record<ID, ChartConfiguration>;
  // Selector interface for the variants. Defaults to `select`.
  variantSelectorType?: 'select' | 'slider' | 'radio';
  // Tilesets available when city is selected.
  mapboxTilesets?: MapboxTileset[];
  // Visualization relative to:
  relativeTo: 'city' | 'feature';
};

// Represents a country
export type Country = {
  // Human-friendly name.
  name: string;
  // Machine friendly code.
  code: string;
};

// Represents a City
export type City = {
  // Human-friendly name.
  name: string;
  // Machine friendly code. Must match the AWS namespace.
  code: string;
  // Country
  country: Country;
  // Visibility. Defaults to false.
  active?: boolean;
  // City centre coordinates.
  coordinates: LngLatLike;
  // Associated color.
  color: Color;
  // Visualizations associated.
  visualizations: Visualization[];
  // Visualization to enable when city is selected.
  defaultVisualization: Visualization;
  // Tilesets available when city is selected.
  mapboxTilesets?: MapboxTileset[];
  // Arbitraty key-value data.
  metadata: Record<string, any>;
};

export type Code = string;

export type UUID = string;

export type FeatureDictionary = Record<UUID, Feature<Polygon>>;

export type Note = {
  title?: string;
  body?: string;
};

// Tool configuration.
export type Config = {
  // Human-friendly name.
  title?: string;
  // Onboarding text.
  onboardingText?: string;
  // Onboarding charts.
  onboardingChartConfig?: Record<ID, ChartConfiguration>;
  // Available cities.
  cities: City[];
  // Tilesets available globally.
  mapboxTilesets: MapboxTileset[];
  // Tilesets to enable when application loads.
  enabledMapboxTilesets?: MapboxTileset[];
  // Notes
  notes?: Note;
};

export type MapData = Record<
  City['code'],
  {
    grids: Record<Code, FeatureDictionary>;
    visualizations: Record<Code, Record<string, Record<Code, any>>>;
  }
>;
