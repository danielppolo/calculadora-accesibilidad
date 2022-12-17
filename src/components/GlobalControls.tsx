import React, { useState } from 'react';
import { Modal, Button, Tooltip, FloatButton } from 'antd';
import { useMapParams } from 'src/context/mapParams';
import Overview from 'src/components/CitiesOverview';

function GlobalControls() {
  const { onReset, current } = useMapParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="fixed z-20 bottom-12 right-4">
      <div className="space-y-4">
        <div>
          <Tooltip title="Regresar" placement="left">
            <Button
              // disabled={!current.cityCode}
              className="bg-white"
              shape="circle"
              size="large"
              type="default"
              onClick={() => onReset({ flyToOrigin: true })}
              icon={
                <span className="material-symbols-outlined leading-normal text-[16px]">
                  zoom_out_map
                </span>
              }
            />
          </Tooltip>
        </div>

        <div>
          <Tooltip title="¿Qué es la calculadora?" placement="left">
            <Button
              className="bg-white"
              shape="circle"
              size="large"
              type="default"
              onClick={() => setIsModalOpen(true)}
              icon={
                <span className="material-symbols-outlined leading-normal text-[16px]">
                  help
                </span>
              }
            />
          </Tooltip>
        </div>

        <Modal
          title="Visualizador de accesibilidad urbana"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
        >
          <Overview />
        </Modal>
      </div>
    </div>
  );
}

export default GlobalControls;
