import React, { ForwardedRef } from 'react';

type Option = {
  label?: string;
  onClick: () => void;
  icon?: React.ReactNode | JSX.Element;
  color?: string;
  active: boolean;
}

interface ButtonGroupProps {
  options: Option[]
}

function ButtonGroup({
  options = [],
  ...otherProps
}: ButtonGroupProps, ref: ForwardedRef<HTMLDivElement>) {
  const leftClasses = 'rounded-l-lg border';
  const middleClasses = 'border-t border-b';
  const rightClasses = 'rounded-r-md border';
  return (
    <div className="flex rounded-md shadow-sm w-full" {...otherProps} ref={ref}>
      {
        options.map(({
          label = '', onClick, icon, color, active,
        }, index) => (
          <button
            key={index}
            type="button"
            onClick={onClick}
            className={`${index === 0 ? leftClasses : index === options.length - 1 ? rightClasses : middleClasses} ${(color && active) ? `text-${color}` : 'text-black'} ${active ? 'bg-white' : 'bg-gray-200'} pointer inline-flex flex-grow items-center justify-center py-2 px-4 text-sm font-medium border-gray-300 hover:bg-gray-100 hover:text-blue-700 focus:z-10 disabled:opacity-50`}
          >
            {icon}
            {label}
          </button>
        ))
      }
    </div>
  );
}

export default React.forwardRef(ButtonGroup);
