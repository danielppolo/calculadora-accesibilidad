# README
Web geo-visualization tool by ITDP.

## Setup
The application uses a few third-party services in order to run.

**External requirements**
* AWS S3 Bucket
* CMS or backend service. Recommended [Contentful](https://www.contentful.com/sign-up/)
* [Mapbox Account](https://account.mapbox.com/auth/signup/)

**Local requirements**
* [Node](https://nodejs.org/es/download/)
* Package manager such as `npm` or `yarn`

**Environment variables:**
```
NEXT_PUBLIC_BUCKET_BASE_URL=
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=
NEXT_PUBLIC_CONTENTFUL_SPACE=
NEXT_PUBLIC_VISUALIZATION_TOOL_ID=
NEXT_PUBLIC_LANDING_PAGE_ID=
NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN=
NEXT_PUBLIC_MAPBOX_STYLE_URL=
```

To start the app in development mode run: 
```
yarn dev
```

## Deploy
See [Netlify](https://docs.netlify.com/welcome/add-new-site/) for instructions.


