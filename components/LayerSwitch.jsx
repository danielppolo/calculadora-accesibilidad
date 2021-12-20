import React from 'react';
import { Tooltip } from '@mui/material';

function LayerSwitch({
  active,
  onChange,
  title,
  legend,
  children,
}) {
  return (
    <Tooltip title={title} placement="right">
      <button
        onClick={onChange}
        type="button"
        className={`${active ? 'text-red' : 'text-black'} bg-white border border-gray-300 hover:bg-gray-50 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
      >
        {children}
      </button>
    </Tooltip>
  );
}

export default LayerSwitch;
