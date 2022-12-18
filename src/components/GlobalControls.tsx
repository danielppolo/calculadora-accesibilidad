import React, { useState } from 'react';
import { Modal, Button, Tooltip, Tour } from 'antd';
import { useMapParams } from 'src/context/mapParams';
import Notes from './Notes';
import Download from './Download';
import CitiesOverview from './CitiesOverview';

const steps: TourProps['steps'] = [
  {
    title: 'Visualizador de accesibilidad urbana',
    description: <CitiesOverview />,
    target: null,
  },
];

function GlobalControls() {
  const { onReset, current } = useMapParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(true);

  return (
    <div className="fixed z-20 bottom-12 right-4">
      <div className="space-y-4">
        <div>
          <Tooltip title="Descargar selección" placement="left">
            <Download />
          </Tooltip>
        </div>

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
          <Tooltip title="Tour" placement="left">
            <Button
              className="bg-white"
              shape="circle"
              size="large"
              type="default"
              onClick={() => {
                setIsModalOpen(false);
                setOpen(true);
              }}
              icon={
                <span className="material-symbols-outlined leading-normal text-[16px]">
                  tour
                </span>
              }
            />
          </Tooltip>
        </div>

        <div>
          <Tooltip title="Notas" placement="left">
            <Button
              className="bg-white"
              shape="circle"
              size="large"
              type="default"
              onClick={() => {
                setOpen(false);
                setIsModalOpen(true);
              }}
              icon={
                <span className="material-symbols-outlined leading-normal text-[16px]">
                  help
                </span>
              }
            />
          </Tooltip>
        </div>

        <Tour open={open} onClose={() => setOpen(false)} steps={steps} />

        <Modal
          title="Notas"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          bodyStyle={{
            maxHeight: 300,
            overflowY: 'auto',
          }}
        >
          <Notes />
        </Modal>
      </div>
    </div>
  );
}

export default GlobalControls;
