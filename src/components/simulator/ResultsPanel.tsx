import React from 'react';
import { SummaryItem } from '@/types/engine';

export function ResultsPanel({ summary }: { summary: Record<string, SummaryItem> }) {
  const items = Object.values(summary);

  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Results Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div 
            key={idx} 
            className={`relative p-6 rounded-2xl border ${
              item.highlight 
                ? 'bg-gradient-to-br from-[#7c3aed]/10 to-[#2dd4bf]/10 border-[#7c3aed]/30 shadow-[0_0_30px_rgba(124,58,237,0.15)] overflow-hidden' 
                : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-sm'
            }`}
          >
            {item.highlight && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2dd4bf] opacity-10 blur-[50px] rounded-full"></div>
            )}
            <p className={`text-sm font-semibold mb-2 tracking-wide uppercase ${item.highlight ? 'text-[#7c3aed] dark:text-[#a78bfa]' : 'text-gray-500 dark:text-gray-400'}`}>
              {item.label}
            </p>
            <p className={`text-3xl font-extrabold tracking-tight ${item.highlight ? 'text-gray-900 dark:text-white drop-shadow-sm' : 'text-gray-900 dark:text-white'}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
