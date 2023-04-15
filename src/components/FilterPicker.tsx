import React, { memo } from 'react';
import { useMapParams } from 'src/context/mapParams';
import { Select, Radio, Space, Slider, Segmented, Tag } from 'antd';
import type { RadioChangeEvent } from 'antd';
import type { SliderMarks } from 'antd/es/slider';
import { Filter } from 'src/types';
import { useIntl } from 'react-intl';
import GridButton from './GridButton';

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
  const intl = useIntl();
  const { current, onFiltersChange } = useMapParams();

  const value = current.filters?.[filter.code];
  const comparableValue = typeof value === 'string' ? [value] : value;

  if (comparable) {
    if (filter.selectorType === 'grid-button') {
      return (
        <div className="grid grid-cols-3 gap-2">
          {filter.options.map((opt) => {
            const isSelected = comparableValue?.includes(opt.code);

            const handleClick = () => {
              const newValue = comparableValue?.includes(opt.code)
                ? comparableValue?.filter((val) => val !== opt.code)
                : [...(comparableValue ?? []), opt.code];

              onFiltersChange?.({ [filter.code]: newValue }, 'merge');
            };

            return (
              <GridButton
                key={opt.code}
                disabled={disabled || opt?.disabled}
                isSelected={isSelected}
                onClick={handleClick}
                icon={
                  opt.iconName ? (
                    <span className="material-symbols-outlined leading-0 text-[20px]">
                      {opt.iconName}
                    </span>
                  ) : null
                }
                label={opt.name}
                color={opt.color}
              />
            );
          })}
        </div>
      );
    }

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
        value={comparableValue}
        onChange={(val: string | string[]) => {
          onFiltersChange?.({ [filter.code]: val }, 'merge');
        }}
        options={filter.options.map((opt) => ({
          label: opt.name,
          value: opt.code,
          disabled: opt?.disabled,
        }))}
        tagRender={(opts) =>
          tagRender({
            ...opts,
            color: optionDictionary[opts!.value]?.color,
            iconName: optionDictionary[opts!.value]?.iconName,
          })
        }
        placeholder={intl.formatMessage({
          defaultMessage: 'Selecciona un filtro',
          id: '2/eL6I',
        })}
        style={{ width: '100%' }}
      />
    );
  }

  if (filter.selectorType === 'grid-button') {
    return (
      <div className="grid grid-cols-3 gap-2">
        {filter.options.map((opt) => {
          const isSelected = Array.isArray(value)
            ? value.includes(opt.code)
            : value === opt.code;

          return (
            <GridButton
              key={opt.code}
              disabled={disabled || opt?.disabled}
              isSelected={isSelected}
              onClick={() => {
                onFiltersChange?.({ [filter.code]: opt.code }, 'merge');
              }}
              icon={
                opt.iconName ? (
                  <span className="material-symbols-outlined leading-0 text-[20px]">
                    {opt.iconName}
                  </span>
                ) : null
              }
              label={opt.name}
              color={opt.color}
            />
          );
        })}
      </div>
    );
  }

  if (filter.selectorType === 'button') {
    return (
      <Segmented
        disabled={disabled}
        block
        defaultValue={value as string}
        value={value as string}
        options={filter.options.map((opt) => ({
          value: opt.code,
          disabled: opt?.disabled,
          label: opt.iconName ? undefined : opt.name,
          icon: opt.iconName && (
            <span className="material-symbols-outlined leading-normal text-[16px]">
              {opt.iconName}
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
      (opt) => opt.code === current.filters?.[filter.code]
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
          {filter.options?.map((opt) => (
            <Radio key={opt?.code} value={opt?.code} disabled={opt?.disabled}>
              {opt?.name}
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
        disabled: opt?.disabled,
      }))}
      placeholder={intl.formatMessage({
        defaultMessage: 'Selecciona un filtro',
        id: '2/eL6I',
      })}
      style={{ width: '100%' }}
    />
  );
}

export default memo(FilterPicker);
