import React from 'react';

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChangeValue?: (value: number) => void;
  suffixStr?: string;
  prefixStr?: string;
}

export function Slider({
  className = '',
  label,
  value,
  min,
  max,
  step = 1,
  onChangeValue,
  suffixStr = '',
  prefixStr = '',
  ...props
}: SliderProps) {
  return (
    <div className={`w-full flex flex-col gap-2 ${className}`}>
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <span className="text-sm font-semibold text-primary">
          {prefixStr}{value}{suffixStr}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChangeValue && onChangeValue(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
        {...props}
      />
      <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 px-1">
        <span>{prefixStr}{min}{suffixStr}</span>
        <span>{prefixStr}{max}{suffixStr}</span>
      </div>
    </div>
  );
}
