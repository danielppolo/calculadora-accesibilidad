import React from 'react';

interface SwatchProps {
  color: string;
}

interface LegendItemProps extends SwatchProps {
  label: string;
}

interface LegendProps {
  title: string;
  items: LegendItemProps[];
}

const Swatch = ({ color }: SwatchProps) => (
  <div className="h-4 w-4" style={{ backgroundColor: color, opacity: 0.5 }} />
);

const LegendItem = ({ color, label }: LegendItemProps) => (
  <div className="flex items-center mb-1">
    <Swatch color={color} />
    <span className="ml-2 text-xs">{label}</span>
  </div>
);

function Legend({ title, items }: LegendProps) {
  return (
    <div className="w-full">
      <h3 className="text-sm font-medium pb-2">{title}</h3>
      {items.map(({ color, label }) => (
        <LegendItem key={label} color={color} label={label} />
      ))}
    </div>
  );
}

Legend.propTypes = {};

export default Legend;
