import React from 'react';

function Step({
  children,
  title,
  number,
}) {
  return (
    <div>
      <h3 className="text-md font-medium mb-2 text-black">
        Paso
        {' '}
        {number}
        .
        {' '}
        {title}
      </h3>
      {
      children
      }
    </div>
  );
}

export default Step;
