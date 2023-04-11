import React from 'react';

interface GridButtonProps {
  onClick: () => void;
  icon?: React.ReactNode;
  isSelected?: boolean;
  disabled?: boolean;
  label: string;
  color?: string;
}

function GridButton({
  onClick,
  icon,
  isSelected,
  label,
  color,
  disabled,
}: GridButtonProps) {
  return (
    <button
      disabled={disabled}
      type="button"
      title={label}
      className={`h-12 w-full rounded-md border border-gray-300 hover:bg-neutral-100 transition  disabled:opacity-30 disabled:cursor-not-allowed ${
        isSelected && 'bg-neutral-100 border-neutral-400'
      }`}
      onClick={onClick}
      style={
        isSelected && color
          ? {
              borderColor: color,
            }
          : {}
      }
    >
      <div className="flex items-center justify-center" style={{ color }}>
        {icon ?? <span className="text-xs">{label}</span>}
      </div>
    </button>
  );
}

export default GridButton;
