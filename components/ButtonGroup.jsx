import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

export default function ButtonGroup({
  options = [],
}) {
  const leftClasses = 'rounded-l-lg border';
  const middleClasses = 'border-t border-b';
  const rightClasses = 'rounded-r-md border';
  return (
    <div className="relative inline-flex rounded-md shadow-sm w-full" role="group">
      {
        options.map(({
          label, onClick, icon, color, active, ...otherProps
        }, index) => (
          <button
            key={index}
            {...otherProps}
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
