import { City } from 'src/types';
import extractReferences from 'src/utils/extractContentfulReferences';

const contentful = require('contentful');

const client = contentful.createClient({
  space: 'f9qr8a787ywo',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

async function getCities(): Promise<City[]> {
  const contentfulCities = await client.getEntries({
    content_type: 'city',
    include: 5,
  });

  return extractReferences(contentfulCities.items);
}

export default getCities;
