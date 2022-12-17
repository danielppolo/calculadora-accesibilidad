import React from 'react';
import { useMapParams } from 'src/context/mapParams';
import { MapboxLayerManager } from 'src/types';
import { Checkbox } from 'antd';

interface MapboxLayerToggleProps {
  economicLayer: MapboxLayerManager;
  densityLayer: MapboxLayerManager;
  roadLayer: MapboxLayerManager;
}

function MapboxLayerToggle({
  economicLayer,
  densityLayer,
  roadLayer,
}: MapboxLayerToggleProps) {
  const { current } = useMapParams();

  return (
    <div>
      <div>
        <Checkbox
          disabled={!current.cityCode}
          onChange={economicLayer.toggle}
          checked={economicLayer.isActive}
        >
          Mostar marginación
        </Checkbox>
      </div>
      <div>
        <Checkbox
          disabled={!current.cityCode}
          onChange={densityLayer.toggle}
          checked={densityLayer.isActive}
        >
          Mostar densidad
        </Checkbox>
      </div>
      <div>
        <Checkbox
          disabled={!current.cityCode}
          onChange={roadLayer.toggle}
          checked={roadLayer.isActive}
        >
          Mostar red vial
        </Checkbox>
      </div>
    </div>
  );
}

export default MapboxLayerToggle;
// const unCheckedChildren = (
//   <span className="material-symbols-outlined text-sm">visibility_off</span>
// );
// const checkedChildren = (
//   <span className="material-symbols-outlined text-sm">visibility</span>
// );

// return (
//   <div>
//     <div>
//       <Switch
//         checkedChildren={checkedChildren}
//         unCheckedChildren={unCheckedChildren}
//         defaultChecked={economicLayer.isActive}
//         disabled={!current.cityCode}
//         onChange={economicLayer.toggle}
//         checked={economicLayer.isActive}
//       />
//       Mostar marginación
//     </div>
//     <div>
//       <Switch
//         checkedChildren={checkedChildren}
//         unCheckedChildren={unCheckedChildren}
//         defaultChecked={roadLayer.isActive}
//         disabled={!current.cityCode}
//         onChange={roadLayer.toggle}
//         checked={roadLayer.isActive}
//       />
//       Mostar red vial
//     </div>
//     <div>
//       <Switch
//         checkedChildren={checkedChildren}
//         unCheckedChildren={unCheckedChildren}
//         defaultChecked={densityLayer.isActive}
//         disabled={!current.cityCode}
//         onChange={densityLayer.toggle}
//         checked={densityLayer.isActive}
//       />
//       Mostar densidad
//     </div>
//   </div>
// );