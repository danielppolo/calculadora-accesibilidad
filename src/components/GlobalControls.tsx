import React, { useState } from 'react';
import { Modal, Button, Tooltip } from 'antd';
import { useMapParams } from 'src/context/mapParams';
import { ONBOARDING_STORAGE_KEY } from 'src/constants';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import Notes from './Notes';
import Download from './Download';
import Onboarding from './Onboarding';

function GlobalControls() {
  const intl = useIntl();
  const { onReset } = useMapParams();
  const router = useRouter();
  const [notesOpen, setNotesOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(
    !localStorage.getItem(ONBOARDING_STORAGE_KEY)
  );

  return (
    <div className="fixed z-20 bottom-12 left-4">
      <div className="space-y-4">
        <div>
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Regresar',
              id: 'q400kG',
            })}
            placement="left"
          >
            <Button
              className="bg-white"
              shape="circle"
              size="large"
              type="default"
              onClick={router.back}
              icon={
                <span className="material-symbols-outlined leading-normal text-[16px]">
                  arrow_back
                </span>
              }
            />
          </Tooltip>
        </div>

        <div>
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Descargar selección',
              id: 'wD9OZu',
            })}
            placement="left"
          >
            <Download />
          </Tooltip>
        </div>

        <div>
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Ver mapa',
              id: 'wuF55Z',
            })}
            placement="left"
          >
            <Button
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
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Tour',
              id: '47V97K',
            })}
            placement="left"
          >
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
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Notas',
              id: 'BErqbB',
            })}
            placement="left"
          >
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

        <Modal
          open={onboardingOpen}
          closable={false}
          onCancel={() => setOnboardingOpen(false)}
          cancelText={intl.formatMessage({
            defaultMessage: 'Cancelar',
            id: 'nZLeaQ',
          })}
          onOk={() => setOnboardingOpen(false)}
          footer={[
            <Button
              key="submit"
              className="bg-black"
              type="primary"
              onClick={() => setOnboardingOpen(false)}
            >
              OK
            </Button>,
          ]}
        >
          <Onboarding />
        </Modal>

        <Modal
          open={notesOpen}
          onCancel={() => setNotesOpen(false)}
          bodyStyle={{
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
          width={800}
          cancelText={intl.formatMessage({
            defaultMessage: 'Cancelar',
            id: 'nZLeaQ',
          })}
          footer={[
            <Button
              key="submit"
              className="bg-black"
              type="primary"
              onClick={() => setNotesOpen(false)}
            >
              OK
            </Button>,
          ]}
        >
          <Notes />
        </Modal>
      </div>
    </div>
  );
}

export default GlobalControls;
