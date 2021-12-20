### Calculadora de accesibilidad

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Data
The application uses GeoJSON to display the geometry on top of the map. To render everything properly, it needs every file to follow a specific format.

## Storage
The storage service of choice is AWS S3. All documents consumed by the application are located in the bucket `bucket_name`. The directory structure MUST follow the specified convention for the application to fetch.

```markdown
└── data
│   └── <city>
│       ├── main.json  # Dictionary of hexagons. (See Cities below)
│       ├── <scenario>
│       │    ├── <hexagon_id>.json  
│       │    ├── <hexagon_id>.json
│       │    │
│       │    .
│       └── <scenario>
│            ├── <hexagon_id>.json
│            ├── <hexagon_id>.json
│            │
│            .


 ```

### Cities
Functions as a dictionary of the hexagons that compose the city. 
`<city>.json`
```json
{
  "<hexagon_id>": {
    "type": "Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": [...]
    },
    "properties": {
      "empresas": number,
      "trabajos": number,
      "clinicas": number,
      "escuelas": number
    }
  },
  ...
}
```

### Hexagon
Represents all the relationships the hexagon has with his peers. There MUST exist a single JSON for every hexagon in the `<:city>.json`. 
`<hexagon_id>.json`
```json
{
  "<:hexagon_id>": [<:walk_time>, <:bike_time>, <:car_time>],
  ...
}
```
