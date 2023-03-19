import { Config } from 'src/types';
import extractReferences from 'src/utils/extractContentfulReferences';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

async function getConfig(locale: string): Promise<Config> {
  const config = await client.getEntry(
    process.env.NEXT_PUBLIC_VISUALIZATION_TOOL_ID,
    { include: 6, locale }
  );

  return extractReferences(config.fields);
}

export default getConfig;
