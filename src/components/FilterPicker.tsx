import React, { memo } from 'react';
import { useMapParams } from 'src/context/mapParams';
import { Select, Radio, Space, Slider, Segmented } from 'antd';
import type { RadioChangeEvent } from 'antd';
import type { SliderMarks } from 'antd/es/slider';
import { Filter } from 'src/types';

interface FilterPickerProps {
  filter: Filter;
  comparable?: boolean;
  disabled?: boolean;
}

function FilterPicker({ filter, comparable, disabled }: FilterPickerProps) {
  const { current, onFiltersChange } = useMapParams();

  const value = current.filters?.[filter.code];

  if (comparable) {
    return (
      <Select
        disabled={disabled}
        mode="multiple"
        allowClear
        size="large"
        defaultValue={value}
        value={value}
        onChange={(val) => {
          onFiltersChange?.({ [filter.code]: val }, 'merge');
        }}
        options={filter.options.map((opt) => ({
          label: opt.name,
          value: opt.code,
        }))}
        placeholder="Selecciona un filtro"
        style={{ width: '100%' }}
      />
    );
  }

  if (filter.selectorType === 'button') {
    return (
      <Segmented
        disabled={disabled}
        block
        defaultValue={value}
        value={value}
        // TODO: Define if we want both icon and label or just one of them
        options={filter.options.map((prop) => ({
          value: prop.code,
          label: prop.iconName ? undefined : prop.name,
          icon: prop.iconName && (
            <span className="material-symbols-outlined leading-normal text-[16px]">
              {prop.iconName}
            </span>
          ),
        }))}
        onChange={(val) => {
          // @ts-ignore
          onFiltersChange?.({ [filter.code]: val }, 'merge');
        }}
      />
    );
  }

  if (filter.selectorType === 'slider') {
    const marks: SliderMarks = filter.options.reduce((acc, variant, index) => {
      if (acc) {
        acc[index] = variant.name;
      }

      return acc;
    }, {} as SliderMarks);
    const valueIndex = filter.options.findIndex(
      (prop) => prop.code === current.filters?.[filter.code]
    );

    return (
      <Slider
        disabled={disabled}
        className="w-[90%] mx-auto"
        marks={marks}
        defaultValue={valueIndex}
        min={0}
        max={(filter.options?.length ?? 1) - 1}
        tooltip={{ formatter: null }}
        onChange={(val) => {
          onFiltersChange?.(
            { [filter.code]: filter.options[val].code },
            'merge'
          );
        }}
      />
    );
  }

  if (filter.selectorType === 'radio') {
    return (
      <Radio.Group
        disabled={disabled}
        onChange={(e: RadioChangeEvent) => {
          onFiltersChange?.({ [filter.code]: e.target.value }, 'merge');
        }}
        value={value}
      >
        <Space direction="vertical">
          {filter.options?.map((prop) => (
            <Radio key={prop?.code} value={prop?.code}>
              {prop?.name}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    );
  }

  return (
    <Select
      disabled={disabled}
      size="large"
      defaultValue={value}
      value={value}
      onChange={(val) => {
        onFiltersChange?.({ [filter.code]: val }, 'merge');
      }}
      options={filter.options.map((opt) => ({
        label: opt.name,
        value: opt.code,
      }))}
      placeholder="Selecciona un filtro"
      style={{ width: '100%' }}
    />
  );
}

export default memo(FilterPicker);
