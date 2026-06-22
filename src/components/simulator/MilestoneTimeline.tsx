import React from 'react';
import { Milestone } from '@/types/engine';

export function MilestoneTimeline({ milestones }: { milestones: Milestone[] }) {
  if (milestones.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-6 shadow-sm transition-colors duration-300">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Key Milestones</h2>
      <div className="space-y-6">
        {milestones.map((m, idx) => (
          <div key={idx} className="flex items-start">
            <div className="flex-shrink-0 w-12 text-sm font-bold text-primary mt-0.5">
              Year {m.year}
            </div>
            <div className="ml-4 flex-grow relative">
              {idx !== milestones.length - 1 && (
                <div className="absolute left-2.5 top-6 bottom-[-24px] w-0.5 bg-gray-100 dark:bg-slate-700" />
              )}
              <div className="absolute left-[7px] top-1.5 w-2 h-2 rounded-full bg-primary ring-4 ring-indigo-50 dark:ring-slate-900" />
              <div className="pl-6 pb-1">
                <p className="text-gray-900 dark:text-gray-200 font-medium">{m.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
