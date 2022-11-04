import React, { ForwardedRef } from 'react';

type Option = {
  label?: string;
  icon?: React.ReactNode | JSX.Element;
  color?: string;
  active?: boolean;
  onClick?: () => void;
};

interface ButtonGroupProps {
  options: Option[];
}

function ButtonGroup(
  { options = [] }: ButtonGroupProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const leftClasses = 'rounded-l-lg border';
  const middleClasses = 'border-t border-b';
  const rightClasses = 'rounded-r-md border';
  return (
    <div className="flex flex-wrap w-full gap-1" ref={ref}>
      {options.map(
        ({ label = '', onClick, icon, color, active = false }, index) => (
          <button
            key={label}
            type="button"
            onClick={onClick}
            className={`${color && active ? `text-${color}` : 'text-black'} ${
              active ? 'bg-white' : 'bg-gray-200'
            }  border rounded pointer inline-flex items-center justify-center py-2 px-4 text-sm font-medium border-gray-300 hover:bg-gray-100 hover:text-blue-700 focus:z-10 disabled:opacity-50`}
          >
            {icon}
            {label}
          </button>
        )
      )}
    </div>
  );
}

export default React.forwardRef(ButtonGroup);
