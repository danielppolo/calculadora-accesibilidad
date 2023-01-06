import React, { useState } from 'react';
import { Modal, Button, Tooltip, Tour } from 'antd';
import type { TourProps } from 'antd';
import { useMapParams } from 'src/context/mapParams';
import Notes from './Notes';
import Download from './Download';
import Onboarding from './Onboarding';

const steps: TourProps['steps'] = [
  {
    title: 'Visualizador de accesibilidad urbana',
    description: <Onboarding />,
    target: null,
  },
];

function GlobalControls() {
  const { onReset, current } = useMapParams();
  const [notesOpen, setNotesOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  return (
    <div className="fixed z-20 bottom-12 left-4">
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
                setNotesOpen(false);
                setOnboardingOpen(true);
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
                setOnboardingOpen(false);
                setNotesOpen(true);
              }}
              icon={
                <span className="material-symbols-outlined leading-normal text-[16px]">
                  help
                </span>
              }
            />
          </Tooltip>
        </div>

        <Tour
          open={onboardingOpen}
          onClose={() => setOnboardingOpen(false)}
          steps={steps}
        />

        <Modal
          title="Notas"
          open={notesOpen}
          onCancel={() => setNotesOpen(false)}
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
