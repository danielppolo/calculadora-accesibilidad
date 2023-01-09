import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import * as api from './api';

const queries = createQueryKeyStore({
  config: {
    main: {
      queryKey: ['config'],
    },
  },
  cities: {
    all: {
      queryKey: ['cities'],
      queryFn: () => api.getCitiesGeometry(),
    },
  },
  grids: {
    dictionary: (params: api.GetGridParams) => ({
      queryKey: [params],
      queryFn: () => api.getGrid(params),
    }),
    geojson: (params: api.GetGridParams) => ({
      queryKey: [params],
      queryFn: () => api.getGrid(params),
    }),
  },
  visualizationVariants: {
    detail: (params: api.GetVisualizationParams) => ({
      queryKey: [params],
      queryFn: () => api.getVisualization(params),
    }),
    feature: (params: api.GetVisualizationForFeatureParams) => ({
      queryKey: [params],
      queryFn: () => api.getVisualizationForFeature(params),
    }),
  },
});

export default queries;
