A powerful visualization tool developed to make displaying geographical information a breeze. Built on the robust Next.js framework, our application takes static data and transforms it into visually stunning maps and visualizations using Mapbox.js. It's fast, horizontally scalable and highly customizable.

**External requirements**
* Asset Storage. Tested with AWS S3, however, any storage service works with just a few changes to the source code.
* CMS. Tested against [Contentful](https://www.contentful.com/sign-up/), any service such as Strapi or a custom BE will work, however, it may need some changes. Specifically register a new adapter.
* [Mapbox Account](https://account.mapbox.com/auth/signup/)

**Local requirements**
* [Node](https://nodejs.org/es/download/)
* Package manager (`npm` or `yarn`)

**Environment variables:**
```ruby
# AWS S3 URL
NEXT_PUBLIC_BUCKET_BASE_URL=
# Contentful Access Token (API Key)
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=
# Contentful Space ID
NEXT_PUBLIC_CONTENTFUL_SPACE=
# Contentful Remote Configuration ID
NEXT_PUBLIC_VISUALIZATION_TOOL_ID=
# Contentful Landing Page ID
NEXT_PUBLIC_LANDING_PAGE_ID=
# Contentful Methodology Page ID
NEXT_PUBLIC_METHODOLOGY_PAGE_ID=
# Mapbox API Token
NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN=
# Mapbox Style URL. Customizes the map UI.
NEXT_PUBLIC_MAPBOX_STYLE_URL=
```

To start the app in development mode run: 
```
yarn dev
```

## Deploy
See [Next.js Documentation](https://nextjs.org/docs/deployment) for instructions on how to deploy.


