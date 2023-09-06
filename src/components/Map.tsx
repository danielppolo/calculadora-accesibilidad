import useGridListeners from 'src/hooks/data/useGridListeners';

import React from 'react';

import Sidebar from 'src/components/Sidebar';
import Credits from 'src/components/CreditsCard';
import useCityMarkers from 'src/hooks/useCityMarkers';
import useMapFit from 'src/hooks/useMapFit';
import useGridRender from 'src/hooks/data/useGridRender';
import useIsochroneVisualizationRender from 'src/hooks/data/useIsochroneVisualizationRender';
import useVariantVisualizationRender from 'src/hooks/data/useVariantVisualizationRender';
import useZoomToReset from 'src/hooks/useZoomToReset';

import { message } from 'antd';
import { useIntl } from 'react-intl';
import GlobalControls from './GlobalControls';
import CityPicker from './CityPicker';
import VisualizationPicker from './VisualizationPicker';
import WhiteLabelLogotype from './WhitelabelLogotype';
import FeedbackForm from './FeedbackForm';

function Map() {
  const intl = useIntl();
  const [messageApi, contextHolder] = message.useMessage();

  useMapFit();
  useZoomToReset();

  useCityMarkers();

  useGridRender();
  useGridListeners();

  useIsochroneVisualizationRender({
    onError: () => {
      messageApi.error(
        intl.formatMessage({
          defaultMessage: 'Algo salió mal, intenta de nuevo',
          id: 'xbJd+t',
        })
      );
    },
  });
  useVariantVisualizationRender({
    onError: () => {
      messageApi.error(
        intl.formatMessage({
          defaultMessage: 'Algo salió mal, intenta de nuevo',
          id: 'xbJd+t',
        })
      );
    },
  });

  return (
    <>
      <div className="fixed z-20 top-4 left-4 right-4 md:right-auto md:w-1/4 space-y-4">
        <WhiteLabelLogotype />
        <CityPicker />
        <VisualizationPicker />
      </div>
      <Sidebar />
      <GlobalControls />
      <FeedbackForm />

      <Credits />
      {contextHolder}
    </>
  );
}

export default Map;
