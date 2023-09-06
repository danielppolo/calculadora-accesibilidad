## Storage

> The bucket must implement public READ policies. If open source consider making it fully public, otherwise whitelist the app domain.

The application needs a public directory with following directory structure: 

``` md
📦 bucket
 ┗ 📂 v1
 ┃ ┣ 📂 cities
 ┃ ┃ ┗ 📂 :city_code
 ┃ ┃ ┃ ┣ 📂 grids
 ┃ ┃ ┃ ┃ ┗ 📜 :grid_code.json
 ┃ ┃ ┃ ┗ 📂 visualizations
 ┃ ┃ ┃ ┃ ┗ 📂 :visualization_code
 ┃ ┃ ┃ ┃ ┃ ┣ 📂 :variant_code
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜 :feature_id.json
 ┃ ┃ ┃ ┃ ┃ ┗ 📜 :variant_code.json
 ┃ ┃ ┗ core
 ┃ ┃ ┃ ┗ 📜 cities_geometry.json
```

Where 
* **:city_code** is the unique identifier declared in the **configuration object**
* **:grid_code** is the unique identifier for a grid pattern declared in the **configuration object**
* **:visualization_code** is the unique identifier for a visualization declared in the **configuration object**
* **:variant_code** is the unique identifier for a scenario in a visualization declared in the **configuration object**.
* **:feature_id** is the unique identifier for a cell in a grid.

> All codes must be in `snake_case`


---
## Data

### Configuration object
Setups the entire application. It can be served with a third-party CMS, custom backend, or as a static JSON. The file `useConfig` loads the object and when used a different service to serve the file it only requires to add an adapter to load the file.

See the **Reference/Data Types** section at the end of the document in order to have a complete picture of the object.

```typescript
type Config = {
	title?: string;
	onboardingText?: string;
	onboardingChartConfig?: Record<ID, ChartConfiguration>;
	cities: City[];
	mapboxTilesets: MapboxTileset[];
	enabledMapboxTilesets?: MapboxTileset[];
	notes?: Note;
	logotype?: Image;
}
```


### Cities geometry object
Renders the initial geometry when the application loads, depending on the active cities and the available geometries available in this document. This serves as a dictionary of geometries for every city available in the application. The format is a [GeoJSON](https://datatracker.ietf.org/doc/html/rfc7946), more specifically, a [FeatureCollection](https://datatracker.ietf.org/doc/html/rfc7946#section-3.3). Each [Feature](https://datatracker.ietf.org/doc/html/rfc7946#section-3.2) in the collection must contain a property `code` which should match the ID/code declared in the **configuration object**.

This file must be stored in `/core/cities_geometry.json`


```typescript
{
	"type": "FeatureCollection",
	"name": "Zonas Metropolitanas",
	"features": [
		{
			"type": "Feature",
			"properties": {
				"code": REPLACE_WITH_CITY_UNIQUE_ID
			},
			"geometry": {
				"type": "MultiPolygon",
				"coordinates": [...],
				...
			},
			...
		},
		{...},
	]
}
```


### Grid object
Represents a dictionary of GeoJSON [Features](https://datatracker.ietf.org/doc/html/rfc7946#section-3.2), however the format is a plain [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON). The keys of the object are the Feature **IDs** and the values are GeoJSON [Features](https://datatracker.ietf.org/doc/html/rfc7946#section-3.2). Due to the nature of a GeoJSON  [Feature](https://datatracker.ietf.org/doc/html/rfc7946#section-3.2), the grid cell can be any shape, a square, hexagon or a custom one. The grid object is the foundation on which the visualizations are built, they provide the geometry.

This file must be stored in `/cities/:city_code/grids/:grid_code.json`. It's important to note that the name of the file must match the ID/code in the **configuration object**

```typescript
Record<ID, Feature>
```


### Visualization object
Renders a map in the application. The format is a plain [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) where the keys are **grid cell IDs** and the values are arbitrary metadata. Keep in mind that all IDs must contain the same metadata in order to render all cells properly. 

```typescript
Record<ID, Metadata>
```


### Metadata object
As mentioned previously, the metadata is an arbitrary object containing integers that allow the application to: 
- render filters
- render charts
- render legends
- render geometry in the map with the correct styles

It's important to note that the structure of the object is mapped to UI. Each level of nesting in the object represent a **filter**. The nesting is mapped from the most general (the outer nesting) to the most specific (the inner nesting). Translated to the UI, the filters render in a stack, where the outer nesting is on top and the inner nesting at the bottom. 

>⚠️ It's really important to note that the **Configuration Object** must declare the Filter object with the Options in the same order as the nesting is. If the order don't match the application will render none.


Each key in the object represents a Option **code**, and they must match the codes/IDs declared in the **Configuration Object** for the application to load correctly.

Finally the inner most values, which must be an integer, are used for calculations.



---
## How to...
The following is a step by step guide on how to perform common actions. This should allow anyone to setup the application. The guide is generic, it doesn't mention specific third party services, so please read the information above in order to setup the different external services for storage and CMS to fit your needs.

#### How to add a new city?
1. Update the `/core/cities_geometry.json` file to include the new city geometry within the [FeatureCollection](https://datatracker.ietf.org/doc/html/rfc7946#section-3.3) (see Cities Geometry Object)
2. Declare the new **City** in the **Configuration Object** with all the corresponding fields set.

#### How to add a visualization?
1. Add a new **City** if needed.
1. Add a new **Grid** if needed.
2. Declare a new **Visualization** in the **Configuration Object**
3. Declare a new default **Visualization Variant** for this **Visualization**
##### Static (relative to the city)
2. Set the **Visualization** `relativeTo` property to `city`
3. Upload the corresponding JSON to `/cities/:city/visualizations/:variant_code.json` (see Visualization Object)
##### Dynamic (relative to a point in the map)
2. Set the **Visualization** `relativeTo` property to `feature`
3. Create a new directory in`/cities/:city/visualizations/:variant_code/`
4. Upload a JSON per feature in the **Grid** used to `/cities/:city/visualizations/:variant_code/:feature_id.json` (see Visualization Object)

#### How to add scenarios to a visualization?
1. Declare a new **Visualization Variant** for the **Visualization** in question.
2. Assign the **Visualization Variant** as part of the **Visualization**
##### Static (relative to the city)
3. Upload the corresponding JSON to `/cities/:city/visualizations/:variant_code.json` (see Visualization Object)
##### Dynamic (relative to a point in the map)
3. Create a new directory in`/cities/:city/visualizations/:variant_code/
4. Upload a JSON per feature in the **Grid** used to `/cities/:city/visualizations/:variant_code/:feature_id.json` (see Visualization Object)

#### How to add a map with a different grid?
1. Declare a new **Grid** in the **Configuration Object**
2. Upload the Grid Object **JSON** to `/cities/:city/grids/:grid_code.json` (see Grid Object)
3. Update or create the **Visualization** in order to use the correct **Grid** code. 
4. When updating a **Visualization**, you must update all the JSON (see Visualization Object) because the IDs of the cell IDs won't match.


#### How to add a charts to visualization metadata?
1. Create a **Visualization** if needed
2. Enter text in the field `helperText`
3. Enter a placeholder text using the `{{ID}}` syntax. This placeholder is replaced with the Chart later.
4. Setup the `chartConfig` which is a **Chart Config** 

```typescript
Record<ID_FROM_HELPER_TEXT, ChartConfiguration>
```

Consider that the `ChartConfiguration` is an object in the [Chart.js Configuration Object](https://www.chartjs.org/docs/latest/configuration)

#### How to add Mapbox Tilesets?
1. Add a new **Mapbox Tileset** in the **Configuration Object** and set the two required properties: `sourceLayer` and `id` (Tileset ID). They come from the [Mapbox Studio Tileset](https://studio.mapbox.com/tilesets/) panel. 
2. Assign the **Mapbox Tileset** to either: a Country, a City, a Visualization, a Visualization Variant. The application have granular control on where to have the tilesets available depending on the selected visualization. It's possible to automatically turn on Tilesets. This configuration exists for the City and the Filter.

**Customizing styles**
It uses the [Mapbox Style Expressions](https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions) which is a JSON-like format. [See reference](https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions).

#### How to setup filters?
See the Metadata Object

#### How to create visualizations that allow comparison?
1. Create the **Visualization**.
2. Set the **Visualization** `comparableOptions`to the Options in the Filter that allow multiple selection.
3. Set the **Visualization** `customScales` to an array. This property represents the buckets in which the values will be compared. Eg. `[15, 30, 60]` will render the UI to compare from 0-15, 16-30, 31-60.

---
## Reference

## Data types
The following types represent all the data used in the application and the purpose for each of them. This might be useful to build and/or setup a custom CMS.

```typescript

type Unit = {
	name?: string;
	shortName?: string;
	type?: string;
};

// Represents a filter option. It is a property in the dataset JSON.
type Option = {
	// Human-friendly name.
	name: string;
	// Machine friendly code. Must match property in the JSON.
	code: string;
	// Associated color.
	color?: Color;
	// Unit.
	unit?: string;
	// Material Icon code. Visit https://fonts.google.com/icons
	iconName?: string;
	// Tilesets to enable when the option toggles.
	enabledMapboxTilesets?: MapboxTileset[];
	// Disabled the option.
	disabled?: boolean;
};

// Represents a grid of features
type Grid = {
	// Machine friendly code. Must match the grid JSON name.
	code: string;
	// Size.
	size: number;
};

// Represents a data provider.
type DataProvider = {
	// Human-friendly name.
	name: string;
	// Machine friendly code.
	code: string;
	// Provider's URL.
	url?: string;
	// Logotype.
	logo?: Image;
	// Helper text.
	helperText?: string;
	// Max height for the logo.
	maxHeight?: number;
};

// Represents a Mapbox Tileset. Visit https://studio.mapbox.com/tilesets
type MapboxTileset = {
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
type VisualizationVariant = {
	// Human-friendly name.
	name: string;
	// Machine friendly code. Must match the filename or namespace in AWS.
	code: string;
	// Visibility. Defaults to false.
	active?: boolean;
	// Data providers
	dataProviders?: DataProvider[];
	// Tilesets available when city is selected.
	mapboxTilesets?: MapboxTileset[];
};

// Represents a filter for a visualization.
type Filter = {
	// Human-friendly name.
	name: string;
	// Machine friendly code.
	code: string;
	// Collection of options.
	options: Option[];
	// Preselected option.
	defaultOption: Option;
	// Selector interface.
	selectorType?: 'button' | 'select' | 'slider' | 'radio' | 'grid-button';
};

  

// Represents a visualization.
type Visualization = {
	metadata?: VisualizationMetadata;
	// Machine friendly code. Must match the AWS namespace.
	code: string;
	// Visibility. Defaults to false.
	active?: boolean;
	// Enables comparison mode.
	comparableOptions?: Option[];
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
	// Scale formula
	scaleFormula?: 'linear' | 'quantile';
	// Group
	visualizationGroup?: VisualizationGroup;
	// Picker type for autogenerated filter.
	customScaleSelectorType?: 'select' | 'slider' | 'radio';
};

// Represents a country
type Country = {
	// Human-friendly name.
	name: string;
	// Machine friendly code.
	code: string;
};

  

// Represents a City
type City = {
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

  
type Code = string;
type UUID = string;
type FeatureDictionary = Record<UUID, Feature<Polygon>>;

type Note = {
	title?: string;
	body?: string;
};

// Tool configuration.
type Config = {
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
	// Logotype
	logotype?: Image;
};

type MapData = Record<
	City['code'],
	{
	grids: Record<Code, FeatureDictionary>;
	visualizations: Record<Code, Record<string, Record<Code, any>>>;
	}
>;

type VisualizationGroup = {
	// Human-friendly name.
	name: string;
	// Machine friendly code. Must match the AWS namespace.
	code: string;
};

type VisualizationMetadata = {
	// Human-friendly name.
	name: string;
	// Human-friendly description.
	shortDescription?: string;
	// Human-friendly full description.
	fullDescription?: string;
	// Unit
	unit?: Unit;
};

```

