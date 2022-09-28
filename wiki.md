# README
Geo-visualization tool for ITDP generated data.

## Setup
The application uses a few third-party services in order to run.

**External requirements**
* AWS S3 Bucket
* [Contentful Account](https://www.contentful.com/sign-up/)
* [Mapbox Account](https://account.mapbox.com/auth/signup/)

**Local requirements**
* [Node](https://nodejs.org/es/download/)
* Package manager such as `npm` or `yarn`

**Environment variables:**
```
NEXT_PUBLIC_BUCKET_BASE_URL=
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=
NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN=
```

To start the app in development mode run: 
```
yarn dev
```

## Deploy
See [Next.js deployment](https://nextjs.org/docs/deployment) for instructions.

# Data structure

## Glossary

**Country**

**City**

**Grid**

**Visualization**

**Visualization scenario**




## AWS bucket structure

> The AWS bucket must implement public READ policies. If open source consider making it fully public, otherwise whitelist the app domain.

The application needs a public directory with following directory structure: 
``` md
📦 aws
 ┗ 📂 v1
 ┃ ┣ 📂 cities
 ┃ ┃ ┗ 📂 <city_code>
 ┃ ┃ ┃ ┣ 📂 grids
 ┃ ┃ ┃ ┃ ┗ 📜 <grid_code>.json
 ┃ ┃ ┃ ┗ 📂 visualizations
 ┃ ┃ ┃ ┃ ┗ 📂 <visualization_code>
 ┃ ┃ ┃ ┃ ┃ ┣ 📂 <scenario_code>
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜 <cell_id>.json
 ┃ ┃ ┃ ┃ ┃ ┗ 📜 <scenario_code>.json
 ┃ ┃ ┗ 📜 cities_geometry.json
```

Where 
* **city_code** is the unique identifier (via Contentful)
* **grid_code** is the unique identifier for a grid pattern (via Contentful)
* **visualization_code** is the unique identifier for a visualization (via Contentful)
* **scenario_code** is the unique identifier for a scenario in a visualization (via Contentful)
* **cell_id** is the unique identifier for a cell in a grid. Defined by the team. Eg. `8849b0b11bfffff`

> All codes must be in `snake_case`

## Types of visualization
The tool supports two types of visualizations:

### Absolute visualization
Displays information in a selected city.
![[1663216785.png]]
_Features_:
* Uses the _value_ to determine the color an opacity of a cell.
* Colours the entire city.
* Ability to nest filters.

### Relative visualization
Displays information around a location (cell) in the map.
![[1663216936.png]]

_Features_:
* Use the value to determine 

## Display de areas metropolitanas
La calculadora solicitará el archivo con la geometría de las zonas metropolitanas al cargar la aplicación. Inmediatamente después de recibir la configuración remota de Contentful, mostrará únicamente las áreas metropolitanas que se encuentren activas (`City.active`). 

> Para activar una zona metropolitana se debe cambiar el atributo `active` desde Contentful.

#### Estructura
El diccionario de áreas metropolitanas está formato JSON con la siguiente estructura:
```typescript
{
    data: Record<City.code, GeoJSONFeature>;
}
```

Ejemplo:
```json
{
    "data": {
        "cdmx": {
            geometry: {type: "Polygon", ...},
            properties: {},
            type: "Feature"
        },
        "guadalajara": {
            geometry: {type: "Polygon", ...},
            properties: {},
            type: "Feature"
        },
        ...
    }
}
```


#### Almacenamiento
> Se usa únicamente 1 archivo para que la calculadora cargue más veloz.

Este archivo está almacenado en el directorio _root_ de la calculadora en AWS con el nombre `cities_geometry.json`

```
/calculadora_oportunidades/v1/core/cities_geometry.json
```


## Display de HEX grid
Al momento que se selecciona una ciudad, la aplicación revisará la configuración y ,dependiendo de las rejillas que estén disponibles, solicitará los archivos (JSON) correspondientes a AWS. 

> Las rejillas disponibles se determinan a través de Contentful en la instancia correspondiente de la ciudad.

#### Estructura
El diccionario de la rejilla está formato JSON con la siguiente estructura:
```typescript
{
    data: Record<ID, GeoJSONFeature>;
}
```

Ejemplo:
```json
{
    "data": {
        "8849b0b11bfffff": {
            geometry: {type: "Polygon", ...},
            properties: {}, // 
            type: "Feature"
        },
        "8849b0b025fffff": {
            geometry: {type: "Polygon", ...},
            properties: {},
            type: "Feature"
        },
        ...
    }
}
```

> ⚠️ El atributo de properties debe ser un objeto vacío. Las propiedades deben ser declaradas en los **archivos de visualización.** (Ver abajo 👇)


#### Almacenamiento
Este archivo está almacenado en el directorio relativo a la ciudad en AWS con el nombre `:hex_code.json`, siendo `:hex_code` definido previamente en Contentful.

```
/calculadora_oportunidades/v1/cities/:city_code/hex_grid/:hex_code.json
```


## Display de visualizaciones relativas a la ciudad (JSON)
Este tipo de visualización hace uso de la rejilla HEX para pintar el mapa con los colores correspondientes. Las visualizaciones pueden ser filtradas con buckets predefinidos en Contentful. (ej. tiempo).


#### Estructura
Los archivos de visualización se almacenan en formato JSON. Representan un diccionario con los IDs de los hexágonos como _keys_ y un objeto de propiedades como valor.
```typescript
{
    data: Record<ID, Record<Property.code, number | string>>;
}
```

Cada nivel de anidado en el diccionario se representará en la calculadora como un control que el usuario puede usar para filtrar los resultados. Para poder mostrar los filtros en la aplicación es necesario declarar las propiedades desde Contentful.


> 🔥 Se recomienda no usar mas de 4 propiedades por diccionario, y se recomienda que el nombre de la propiedad sea corto. Esto debido a que la aplicación muestra los controles con botones horizontales.


Ejemplo para _visualización que únicamente pinta los hexágonos con el color correspondiente_:

> Esta estructura de datos permite mostrar 4 visualizaciones.

```json
{
    "data": {
        "8849b0b11bfffff": {
            clinics: 0,
            empress: 8,
            escuels: 0,
            jobs_w: 24,
        },
        "8849b0b025fffff": {
            clinics: 1,
            empress: 16,
            escuels: 2,
            jobs_w: 12,
        },
        ...
    }
}
```



Ejemplo para _visualización que permite filtrar por transporte y tiempo_:

> Esta estructura de datos permite mostrar 48 visualizaciones.

```json
{
    "data": {
        "8849b0b11bfffff": {
            clinics: {
                car: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
                public_transport: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
                walk: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
                bycicle: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
            },
            empress: {
                car: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
                public_transport: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
                walk: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
                bycicle: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
            },
            escuels: {
                car: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
                public_transport: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
                walk: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
                bycicle: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
            },
            jobs_w: {
                car: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
                public_transport: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
                walk: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
                bycicle: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
            },
        },
        "8849b0b025fffff": {
            clinics: {
                car: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
                public_transport: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
                walk: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
                bycicle: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
            },
            empress: {
                car: {
                    15_min: {
                            7am: 45
                            8am: 68, // TODO: 
                        },
                    30_min: 78,
                    60_min: 823,
                },
                public_transport: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
                walk: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
                bycicle: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
            },
            escuels: {
                car: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
                public_transport: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
                walk: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
                bycicle: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
            },
            jobs_w: {
                car: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
                public_transport: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
                walk: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
                bycicle: {
                    15_min: 45,
                    30_min: 78,
                    60_min: 823,
                },
            },
        },
        ...
    }
}
```


#### Almacenamiento
Este archivo está almacenado en el directorio relativo a la ciudad en AWS con el nombre `:visualization_variant.json`, siendo `:visualization_variant` definido previamente en Contentful.

> 🚀 No hay límite en el número de variantes para una visualización. La aplicación las muestra en forma de lista.

```
/calculadora_oportunidades/v1/cities/:city_code/visualizations/:visualization_code/:visualization_variant.json
```


## Display de visualizaciones relativas a un hexágono (JSON)
> Ejemplo: Isocronas.

Este tipo de visualización hace uso de la rejilla HEX para pintar el mapa con los colores correspondientes en relación a un hexágono seleccionado. Las visualizaciones pueden ser filtradas con buckets predefinidos en Contentful. (ej. tiempo).


#### Estructura
Los archivos de visualización se almacenan en formato JSON. Representan un diccionario con los IDs de los hexágonos como _keys_ y un objeto de propiedades como valor.
```typescript
{
    data: Record<ID, Record<Property.code, number | string>>;
}
```


Ejemplo para _visualización de área alcanzable desde hexágono_:

> Esta estructura de datos permite mostrar 4 visualizaciones. Se extiende a 12 con filtros de tiempo (En caso de ser declarados los buckets desde Contentful).

```json
{
    "data": {
        "8849b0b11bfffff": {
            car: 0,
            public_transport: 8,
            bycicle: 0,
            walk: 24,
        },
        "8849b0b025fffff": {
            car: 0,
            public_transport: 8,
            bycicle: 0,
            walk: 24,
        },
        ...
    }
}
```



#### Almacenamiento
Este archivo está almacenado en el subdirectorio de la variante de la visualización usando el ID del hexágono como nombre del archivo. Ejemplo `8849b0b025fffff.json`. Esto permite a la aplicación solicitar el archivo correcto cuando se selecciona el hexágono.

```
/calculadora_oportunidades/v1/cities/:city_code/visualizations/:visualization_code/:visualization_variant/:hexagon_id.json
```



## Display visualizaciones estáticas (GeoJSON)
> Ejemplo: Red vial, marginación federal, densidad federal.


#### Almacenamiento
Se almacenan como [Mapbox Tilesets](https://studio.mapbox.com/tilesets/). Si la visualización esta segmentada o tiene capas, entonces se debe crear 1 tileset por capa para poder asignar un color y nombre independiente.

Ejemplo:
Para la siguiente visualización se deben de crear 6 tilesets distintos y declarar los correspondientes _MapboxTileset_ en Contentful.
![[1661749906.png]]


## Estructura de datos de la aplicación
```typescript
// Platform
type City = {
    // Nombre de la ciudad. Visible para el usuario.
    name: string;
    // Código único en formato snake_case. Se usa para referenciar la ciudad en las distintas partes del código.
    code: string;  
    // País al que pertenece.
    country: Country;  
    // Esconde/muestra la ciudad en la calculadora.
    active: boolean;
    // Representa la latitud del centro de la ciudad.
    lat: number;
    // Representa la longitud del centro de la ciudad.
    lng: number;
    // Color en formato HEX. Usado para charts, etc.
    color: string;
    // Visualización por default que se muestra cuando se selecciona la ciudad.
    defaultVisualization: Visualization;
    // Visualizaciones disponibles para la ciudad.
    visualizations: Visualization[];
    // Visualizaciones de Mapbox disponibles para la ciudad.
    statucVisualizations: StaticVisualization[];
    
    // Sidebar information
    // Total de oportunidades en la ciudad. Usado en charts.
    totalOpportunities: number;
}

type Country = {
    // Nombre del país. Visible para el usuario.
    name: string;
    // Código único en formato snake_case. Se usa para referenciar el país en las distintas partes del código.
    code: string;
    // Esconde/muestra la ciudad en la calculadora.
    active: boolean;  
    // Visualizaciones de Mapbox disponibles para el país.
    statucVisualizations: StaticVisualization[]; 
}

type HEXGrid = {
    // Unique code in snake_case. Represents the variant.
    code: string;
    // Tamaño del hexágono base.
    size: number;
}


type Transport = {
    // Nombre del transporte. Visible para el usuario.
    name: string;
    // Código único en formato snake_case. Se usa para referenciar el transport en las distintas partes del código.
    code: string;    
}

type Visualization = {
    // Ciudad a la que pertenece la visualización.
    city: City;
    // Nombre de la visualización. Visible para el usuario. 
    name: string;
    // Código único en formato snake_case. Se usa para referenciar la visualización en las distintas partes del código.
    code: string;    
    // Default variant to display.
    defaultVariant: VisualizationVariant;
    // Variants for the visualization. E.g. Different time. 
    variants: VisualizationVariant[];
    // HEX Grid que usa la visualización.
    hexGrid: HEXGrid.code;
}


type VisualizationVariant = {
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
    defaultProperties: Properties[]
}


type DataProvider = {
     // Código único en formato snake_case. Se usa para referenciar el proveedor de datos en las distintas partes del código.
    code: string;
    // Nombre del proveedor de datos visible para el cliente.
    name: string;
    // Dirección URL del proveedor de datos.
    url: string;
    // Dirección URL del asset a mostrar.
    logotype: string;
}


type Properties = {
    // Nombre de la propiedad. Visible para el usuario.
    name: string;
    // Código único en formato snake_case. Se usa para referenciar la propiedad en las distintas partes del código.
    code: string;    
}

type StaticVisualization = {
     // Nombre de la visualización. Visible para el usuario en la leyenda.
    name: string;
    // Código único en formato snake_case. Se usa para referenciar la ciudad en las distintas partes del código.
    code: string;  
    // Layers que component el mapa. 
    mapboxTilesets: MapboxTileset[];
}

type MapboxTileset = {
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


// Landing
type LandingPage = {
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

```



### FAQ.
* ¿Cómo agrego una nueva ciudad?
    1. Crear una instancia del modelo _Country_ en Contentful. (En caso de requerirlo).
    2. Crear una instancia del modelo _City_ en Contentful con los campos correspondientes.
    3. Actualizar el diccionario de ciudades (JSON). Agregar el nuevo _key_ usando el código de la ciudad y asignar como valor el GeoJSON del área metropolitana.



---
**Modificador de tipo de transporte**

* Congestion en distintos horarios.
    * Aplica solo para carro.
    * Aplica solo para ciertos mapas.

* Comparacion habilitada para todos los mapas de tipo isocrona.
* Buckets solo sirven para isocronas (NOT)
.