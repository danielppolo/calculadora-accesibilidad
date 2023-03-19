import React from 'react';
import { useMapParams } from 'src/context/mapParams';
import useCurrentVisualization from 'src/hooks/data/useCurrentVisualization';
import useCurrentVariant from 'src/hooks/data/useCurrentVariant';
import { Select, Radio, Space, Slider } from 'antd';
import type { RadioChangeEvent } from 'antd';
import type { SliderMarks } from 'antd/es/slider';
import { useIntl } from 'react-intl';

function VariantPicker() {
  const intl = useIntl();
  const { onVariantChange, current } = useMapParams();
  const getCurrentVisualization = useCurrentVisualization();
  const currentVisualization = getCurrentVisualization(current);
  const variants = currentVisualization?.variants.filter(
    (variant) => variant.active
  );
  const getCurrentVariant = useCurrentVariant();
  const currentVariant = getCurrentVariant(current);
  const isDisabled = !current.cityCode;

  if (currentVisualization?.variantSelectorType === 'slider') {
    const marks =
      variants?.reduce((acc: SliderMarks, variant, index) => {
        if (acc) {
          acc[index] = variant.name;
        }
        return acc;
      }, {}) ?? {};

    const valueIndex =
      variants?.findIndex((prop) => prop.code === currentVariant?.code) ?? 0;

    return (
      <Slider
        className="w-[90%] mx-auto"
        marks={marks}
        defaultValue={valueIndex}
        min={0}
        max={(variants?.length ?? 1) - 1}
        tooltip={{ formatter: null }}
        onChange={(val) => {
          if (
            current.cityCode &&
            current.visualizationCode &&
            variants?.length
          ) {
            onVariantChange?.({
              cityCode: current.cityCode,
              visualizationCode: current.visualizationCode,
              variantCode: variants[val].code,
            });
          }
        }}
      />
    );
  }

  if (currentVisualization?.variantSelectorType === 'radio') {
    return (
      <Radio.Group
        onChange={(e: RadioChangeEvent) => {
          if (current.cityCode && current.visualizationCode) {
            onVariantChange?.({
              cityCode: current.cityCode,
              visualizationCode: current.visualizationCode,
              variantCode: e.target.value,
            });
          }
        }}
        value={currentVariant?.code}
      >
        <Space direction="vertical">
          {variants?.map((variant) => (
            <Radio key={variant?.code} value={variant?.code}>
              {variant?.name}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    );
  }

  return (
    <Select
      defaultValue={currentVariant?.name}
      value={currentVariant?.name}
      onChange={(nextVariant) => {
        if (current.cityCode && current.visualizationCode) {
          onVariantChange?.({
            cityCode: current.cityCode,
            visualizationCode: current.visualizationCode,
            variantCode: nextVariant,
          });
        }
      }}
      options={
        variants?.map((variant) => ({
          label: variant.name,
          value: variant.code,
        })) ?? []
      }
      placeholder={intl.formatMessage({
        defaultMessage: 'Selecciona un escenario',
        id: 'fh45pJ',
      })}
      disabled={isDisabled}
      style={{ width: '100%' }}
    />
  );
}

export default VariantPicker;
