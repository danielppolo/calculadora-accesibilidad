import React, { useEffect, useState } from 'react';
import { marked } from 'marked';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const contentful = require('contentful');

marked.setOptions({
  gfm: true,
});

const client = contentful.createClient({
  space: 'f9qr8a787ywo',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ?? '',
});

function Notes() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await client.getEntry('3oodmOkYxL9imqZm9cmAxk');
        setData(response.fields);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCities();
  }, []);

  return (
    <div
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{
        __html: marked.parse(data?.body || ''),
      }}
    />
  );
}

export default Notes;
