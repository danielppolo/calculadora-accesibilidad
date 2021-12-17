import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

function Loader({ loading }) {
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
