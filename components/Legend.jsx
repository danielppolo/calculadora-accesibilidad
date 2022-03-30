import React from 'react';
import Card from './Card';

const Swatch = ({
  color,
}) => (
  <div className="h-4 w-4" style={{ backgroundColor: color, opacity: 0.5 }} />
);

const LegendItem = ({ color, label }) => (
  <div className="flex items-center mb-1">
    <Swatch color={color} />
    <span className="ml-2 text-xs">{label}</span>
  </div>
);

function Legend({
  title,
  items,
}) {
  return (
    <div className='flex items-end'>
      <Card className="md:w-80 md:max-w-xl h-1/3 z-50 p-4 pt-2 w-full md:h-auto">
      <h3 className="text-base font-semibold pb-2">{title}</h3>
      {
        items.map(({ color, label }) => (<LegendItem key={label} color={color} label={label} />))
      }
    </Card>
    </div>
  );
}

Legend.propTypes = {

};

export default Legend;
