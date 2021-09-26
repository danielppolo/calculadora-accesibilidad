import React from 'react';

const Swatch = ({
  color,
}) => (
  <div className="h-4 w-4" style={{backgroundColor: color}}></div>
)

const LegendItem = ({color, label}) => (
  <div className="flex items-center">
    <Swatch color={color} />
    <span className="ml-2 text-xs">{label}</span>
  </div>
)

function Legend({
  title,
  items,
}) {
  return (
    <div className="bg-white rounded-md overflow-y-auto fixed bottom-4 left-4 right-4 h-1/3 z-50 shadow-lg p-4 md:top-auto md:bottom-8 md:right-8 md:left-auto md:w-1/4 md:h-auto">
      <h3 className="text-xs font-semibold pb-2">{title}</h3>
      {
        items.map(({color, label}) => (<LegendItem key={label} color={color} label={label} />))
      }
    </div>
  );
}

Legend.propTypes = {

};

export default Legend;
