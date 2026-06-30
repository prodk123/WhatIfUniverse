import React from 'react';

export function Card({
  className = '',
  children,
  onClick,
  style,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <div
      onClick={onClick}
      style={{ overflow: 'hidden', position: 'relative', ...style }}
      className={`bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm transition-colors duration-300
        ${onClick ? 'cursor-pointer hover:border-gray-300 dark:hover:border-slate-600 hover:shadow-md transition-all' : ''} 
        ${className}`}
    >
      {children}
    </div>
  );
}
