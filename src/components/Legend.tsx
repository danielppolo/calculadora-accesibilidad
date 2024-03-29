import React from 'react';

interface SwatchProps {
  color: string;
  opacity?: number;
}

interface LegendItemProps extends SwatchProps {
  label: string;
}

interface LegendProps {
  title: string;
  scales: LegendItemProps[];
}

const Swatch = ({ color, opacity = 1 }: SwatchProps) => (
  <div className="h-4 w-4" style={{ backgroundColor: color, opacity }} />
);

const LegendItem = ({ color, label, opacity }: LegendItemProps) => (
  <div className="flex items-center mb-1">
    <Swatch color={color} opacity={opacity} />
    <span className="ml-2 text-xs">{label}</span>
  </div>
);

function Legend({ title, scales }: LegendProps) {
  return (
    <div className="w-full">
      <p className="mb-2 text-gray-700">{title}</p>
      {scales.map(({ color, label, opacity }) => (
        <LegendItem
          key={label + color}
          color={color}
          opacity={opacity}
          label={label}
        />
      ))}
    </div>
  );
}

export default Legend;
