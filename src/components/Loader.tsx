import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

interface LoaderProps {
  loading?: boolean;
}

function Loader({ loading = false }: LoaderProps) {
  return (
    <Backdrop
      sx={{ color: '#F1F3EE', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loader;
