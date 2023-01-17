import { useMapboxLayerManager } from 'src/context/mapboxLayerManager';
import { useMapParams } from 'src/context/mapParams';
import { generateVariantId, getFlattenFilters } from 'src/utils';
import get from 'lodash/get';
import getGridId from 'src/utils/getGridId';
import type { Feature, GeoJsonProperties, Polygon } from 'geojson';
import { FeatureDictionary, MapParamsState, Visualization } from 'src/types';
import { COMPARABLE_KEY } from 'src/constants';
import isComparable from 'src/utils/isComparable';
import getDefaultVisualizationFilters from 'src/utils/getDefaultVisualizationFilters';

interface RenderParams {
  data: Record<string, any>;
  currentVisualization: Visualization;
  grid: FeatureDictionary;
  featureId?: string;
  current: Partial<MapParamsState>;
  cityCode: string;
}

interface GetFeatureParams {
  data: Record<string, any>;
  grid: FeatureDictionary;
  featureId?: string;
  variantFilters: Record<string, string>;
  unit: string;
  totalProperty: string;
  limit?: number;
}

interface GetFeatureReturn {
  features: Feature<Polygon, GeoJsonProperties>[];
  maxValue: number;
}

const getFeatures = ({
  data,
  featureId,
  variantFilters,
  grid,
  totalProperty,
  unit,
  limit,
}: GetFeatureParams): GetFeatureReturn => {
  let maxValue = 0;

  const features = Object.keys(data).reduce((filtered, hexId, index) => {
    const isClickedHexagon = hexId === featureId;
    let total: number =
      get(data[hexId], Object.values(variantFilters), {}) ?? 0;

    if (total > maxValue) {
      maxValue = total;
    }

    if (isClickedHexagon) {
      total = total || 1;
    }

    // We filter features with no data
    const isInRange = limit ? total <= limit : true;
    if ((total > 0 && isInRange) || isClickedHexagon) {
      filtered.push({
        ...grid[hexId],
        // Integer arbitrary identifier
        id: index,
        properties: {
          ...grid[hexId].properties,
          // Hexagon identifier
          id: hexId,
          [totalProperty]: total,
          description: `${new Intl.NumberFormat().format(total)}  ${unit}`,
        },
      });
    }

    return filtered;
  }, [] as Feature<Polygon, GeoJsonProperties>[]);

  return { features, maxValue };
};

const buildUnitDictionary = (filters: Visualization['filters']) => {
  const unitDict: Record<string, string> = {};
  filters.forEach((filter) => {
    filter.options.forEach((option) => {
      if (option.code && option.unit) {
        unitDict[option.code] = option.unit;
      }
    });
  });

  return unitDict;
};

function useRenderVisualization() {
  const { onFiltersChange } = useMapParams();
  const { add } = useMapboxLayerManager();

  return ({
    data,
    currentVisualization,
    grid,
    featureId,
    current,
    cityCode,
  }: RenderParams) => {
    const totalProperty = 'count';
    const filters = currentVisualization?.filters ?? [];
    const variants = getFlattenFilters(filters);
    const unitDict = buildUnitDictionary(filters);

    if (isComparable(currentVisualization)) {
      // We reverse the filters to show layers in the correct order.
      const reversedVariants = [...variants].reverse();
      reversedVariants.forEach((variantFilters) => {
        const unit =
          currentVisualization.unit?.shortName ??
          unitDict[Object.values(variantFilters)[0]]?.toLowerCase();

        const comparableFilter =
          currentVisualization.filters[currentVisualization.filters.length - 1];
        const optionColor = comparableFilter.options.find((option) => {
          return variantFilters[comparableFilter.code] === option.code;
        })?.color;

        currentVisualization.customScales?.forEach((scale) => {
          const { features, maxValue } = getFeatures({
            data,
            grid,
            totalProperty,
            unit,
            variantFilters,
            featureId,
            limit: scale,
          });

          const id = generateVariantId({
            ...current,
            filters: {
              ...variantFilters,
              [COMPARABLE_KEY]: scale.toString(),
            },
          });

          add({
            legendTitle: currentVisualization.name,
            id,
            features,
            property: totalProperty,
            maxValue,
            visible: false,
            numberOfScales: currentVisualization?.scalesCount,
            customScales: currentVisualization?.customScales,
            customLegend: {
              title: comparableFilter?.name,
              scales: comparableFilter.options.map((option) => ({
                color: option.color ?? '',
                opacity: 1,
                label: option.name,
                topValue: 0,
              })),
            },
            scaleColors: [
              optionColor ?? currentVisualization.minColor,
              optionColor ?? currentVisualization.maxColor,
            ],
            unit,
            opacity: 1,
            beforeId: getGridId(cityCode, currentVisualization?.grid.code),
            solid: true,
          });
        });
      });
    } else {
      variants.forEach((variantFilters) => {
        const unit =
          currentVisualization?.unit?.shortName ??
          unitDict[Object.values(variantFilters)[0]]?.toLowerCase();

        const { features, maxValue } = getFeatures({
          data,
          grid,
          totalProperty,
          unit,
          variantFilters,
          featureId,
        });

        const id = generateVariantId({
          ...current,
          filters: variantFilters,
        });

        add({
          legendTitle: currentVisualization.name,
          id,
          features,
          property: totalProperty,
          maxValue,
          visible: false,
          numberOfScales: currentVisualization?.scalesCount,
          customScales: currentVisualization?.customScales,
          scaleColors: [
            currentVisualization.minColor,
            currentVisualization.maxColor,
          ],
          unit,
          beforeId: getGridId(cityCode, currentVisualization?.grid.code),
        });
      });
    }
    const defaultFilters = getDefaultVisualizationFilters(currentVisualization);
    onFiltersChange?.(defaultFilters, 'reset');
  };
}

export default useRenderVisualization;
