import { Button, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LaunchIcon from '@mui/icons-material/Launch';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
    <div>
      <div
        className="flex items-end cursor-pointer mb-4"
        onClick={() => setOpen(true)}
      >
        <p className="text-sm font-medium">Ver notas</p>
        <LaunchIcon className="h-4 ml-1" />
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center w-full h-screen place-items-center z-[1600]"
      >
        <div className="max-w-3xl max-h-screen bg-white px-4 lg:px-8 py-6  overflow-y-auto">
          <div className="mb-4 lg:hidden">
            <Button
              startIcon={<ArrowBackIcon />}
              size="medium"
              onClick={() => setOpen(false)}
            >
              Regresar
            </Button>
          </div>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: marked.parse(data?.body || ''),
            }}
          />
        </div>
      </Modal>
    </div>
  );
}

export default Notes;
