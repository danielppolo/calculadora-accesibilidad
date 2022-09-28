import React from 'react';
import { Tooltip } from '@mui/material';

function LayerSwitch({
  active,
  onChange,
  title,
  legend,
  children,
  disabled,
}) {
  return (
    <Tooltip title={title} placement="bottom" disableTouchListener>
      <button
        disabled={disabled}
        onClick={onChange}
        type="button"
        className={`${active ? 'text-red' : 'text-black'} bg-white border border-gray-300 hover:bg-gray-50 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center disabled:opacity-50`}
      >
        {children}
      </button>
    </Tooltip>
  );
}

export default LayerSwitch;
