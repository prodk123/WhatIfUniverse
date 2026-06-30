import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  prefixStr?: string;
  suffixStr?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, prefixStr, suffixStr, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <div className="relative flex items-center">
          {prefixStr && (
            <span className="absolute left-3 text-gray-500 dark:text-gray-400 text-sm">
              {prefixStr}
            </span>
          )}
          <input
            ref={ref}
            aria-label={label}
            className={`flex h-10 w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-3 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors
              ${prefixStr ? (prefixStr.length > 2 ? 'pl-16' : prefixStr.length > 1 ? 'pl-10' : 'pl-8') : ''}
              ${suffixStr ? 'pr-8' : ''}
              ${error ? 'border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
            {...props}
          />
          {suffixStr && (
            <span className="absolute right-3 text-gray-500 dark:text-gray-400 text-sm">
              {suffixStr}
            </span>
          )}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
