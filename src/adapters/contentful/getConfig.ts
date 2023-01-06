import { ChartConfiguration } from 'chart.js';
import { City, MapboxTileset, Note } from 'src/types';
import extractReferences from 'src/utils/extractContentfulReferences';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export type ContentfulConfig = {
  title?: string;
  onboardingText?: string;
  onboardingChartData?: Record<string, ChartConfiguration>;
  cities: City[];
  defaultMapboxTilesets: MapboxTileset[];
  notes?: Note;
};

async function getConfig(): Promise<ContentfulConfig> {
  const config = await client.getEntry(
    process.env.NEXT_PUBLIC_VISUALIZATION_TOOL_ID,
    { include: 6 }
  );

  return extractReferences(config.fields);
}

export default getConfig;
