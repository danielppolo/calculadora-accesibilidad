import { useMapboxLayerManager } from 'src/context/mapboxLayerManager';
import { useMapParams } from 'src/context/mapParams';
import { generateVariantId, getFlattenFilters } from 'src/utils';
import getGridId from 'src/utils/getGridId';
import {
  FeatureDictionary,
  MapParamsState,
  Visualization,
  VisualizationVariant,
} from 'src/types';
import { COMPARABLE_KEY } from 'src/constants';
import isComparable from 'src/utils/isComparable';
import getDefaultVisualizationFilters from 'src/utils/getDefaultVisualizationFilters';
import filterFeatures from 'src/utils/filterFeatures';
import buildUnitDictionary from 'src/utils/buildUnitDictionary';
import getComparableFilter from 'src/utils/getComparableFilter';

interface RenderParams {
  data: Record<string, any>;
  currentVisualization: Visualization;
  currentVariant: VisualizationVariant;
  grid: FeatureDictionary;
  featureId?: string;
  current: Partial<MapParamsState>;
  cityCode: string;
}

function useRenderVisualization() {
  const { onFiltersChange } = useMapParams();
  const { add } = useMapboxLayerManager();

  return ({
    data,
    currentVisualization,
    currentVariant,
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

        const comparableFilter = getComparableFilter(currentVisualization);
        const optionColor = comparableFilter?.options.find(
          (option) => variantFilters[comparableFilter.code] === option.code
        )?.color;

        currentVisualization.customScales?.forEach((scale) => {
          const { features, values, maxValue } = filterFeatures({
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
          console.log(id);

          add({
            id,
            legendTitle: currentVisualization.name,
            features,
            property: totalProperty,
            values,
            maxValue,
            visible: false,
            numberOfScales: currentVisualization?.scalesCount,
            customScales: currentVisualization?.customScales,
            customLegend: {
              title: comparableFilter?.name ?? '',
              scales:
                comparableFilter?.options.map((option) => ({
                  color: option.color ?? '',
                  opacity: 1,
                  label: option.name,
                  topValue: 0,
                })) ?? [],
            },
            scaleColors: [
              optionColor ?? currentVisualization.minColor,
              optionColor ?? currentVisualization.maxColor,
            ],
            unit,
            opacity: 1,
            beforeId: getGridId(cityCode, currentVisualization?.grid.code),
            scaleFormula: 'none',
          });
        });
      });
    } else {
      variants.forEach((variantFilters) => {
        const unit =
          currentVisualization?.unit?.shortName ??
          unitDict[Object.values(variantFilters)[0]]?.toLowerCase();

        const { features, values, maxValue } = filterFeatures({
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
          values,
          maxValue,
          visible: false,
          scaleFormula: currentVisualization.scaleFormula,
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
