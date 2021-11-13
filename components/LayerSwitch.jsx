import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';

// import Switch from '@mui/material/Switch';
// import LayersIcon from '@mui/icons-material/Layers';
// import LayersClearIcon from '@mui/icons-material/LayersClear';

function LayerSwitch({
  checked,
  onChange,
  title,
  legend,
}) {
  return (
    <div className="flex w-full justify-between items-center">
      <div>
        <h3 className="text-sm font-medium mb-0">{title}</h3>
        {legend && (
        <p className="text-[10px] text-gray-600 font-medium mb-2">
          {legend}
        </p>
        )}
      </div>
      {/* <Switch checked={checked} onChange={onChange} /> */}
      <IconButton color="primary" component="span" onClick={onChange}>
        {
        checked ? (<VisibilityIcon />) : (<VisibilityOffIcon className="text-gray-300" />)
      }
      </IconButton>
    </div>
  );
}

export default LayerSwitch;
