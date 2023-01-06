import React from 'react';
import { marked } from 'marked';
import useConfig from 'src/hooks/data/useConfig';

marked.setOptions({
  gfm: true,
});

function Notes() {
  const { data: config } = useConfig();

  return (
    <div
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{
        __html: marked.parse(config?.notes?.body || ''),
      }}
    />
  );
}

export default Notes;
