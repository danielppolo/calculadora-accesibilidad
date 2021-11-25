import React from 'react';

const Swatch = ({
  color,
}) => (
  <div className="h-4 w-4" style={{ backgroundColor: color, opacity: 0.5 }} />
);

const LegendItem = ({ color, label }) => (
  <div className="flex items-center">
    <Swatch color={color} />
    <span className="ml-2 text-xs">{label}</span>
  </div>
);

function Legend({
  title,
  items,
}) {
  return (
    <div className="bg-white h-1/3 z-50 border-2 border-[#e6e6dc] p-4 md:h-auto w-full">
      <h3 className="text-xs font-semibold pb-2 uppercase">{title}</h3>
      {
        items.map(({ color, label }) => (<LegendItem key={label} color={color} label={label} />))
      }
    </div>
  );
}

Legend.propTypes = {

};

export default Legend;
