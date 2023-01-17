import React, { memo } from 'react';
import { useMapParams } from 'src/context/mapParams';
import { Select, Radio, Space, Slider, Segmented, Tag } from 'antd';
import type { RadioChangeEvent } from 'antd';
import type { SliderMarks } from 'antd/es/slider';
import { Filter } from 'src/types';

interface FilterPickerProps {
  filter: Filter;
  comparable?: boolean;
  disabled?: boolean;
}

interface TagRenderProps {
  label: React.ReactNode;
  color?: string;
  iconName?: string;
  closable: boolean;
  onClose: () => void;
}

const tagRender = ({
  label,
  color,
  closable,
  iconName,
  onClose,
}: TagRenderProps) => {
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={color}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ margin: 4 }}
      icon={
        iconName && (
          <span className="material-symbols-outlined leading-0 text-[10px] mr-1">
            {iconName}
          </span>
        )
      }
    >
      {label}
    </Tag>
  );
};

function FilterPicker({ filter, comparable, disabled }: FilterPickerProps) {
  const { current, onFiltersChange } = useMapParams();

  const value = current.filters?.[filter.code];

  if (comparable) {
    const optionDictionary = filter.options.reduce(
      (acc: Record<string, typeof filter.options[0]>, opt) => {
        acc[opt.code] = opt;
        return acc;
      },
      {}
    );

    return (
      <Select
        disabled={disabled}
        mode="tags"
        allowClear
        showArrow
        defaultValue={value}
        value={typeof value === 'string' ? [value] : value}
        onChange={(val: string | string[]) => {
          onFiltersChange?.({ [filter.code]: val }, 'merge');
        }}
        options={filter.options.map((opt) => ({
          label: opt.name,
          value: opt.code,
        }))}
        tagRender={(props) =>
          tagRender({
            ...props,
            color: optionDictionary[props!.value]?.color,
            iconName: optionDictionary[props!.value]?.iconName,
          })
        }
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
        defaultValue={value as string}
        value={value as string}
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
    const marks = filter.options.reduce((acc: SliderMarks, variant, index) => {
      if (acc) {
        acc[index] = variant.name;
      }
      return acc;
    }, {});
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
