import React from 'react';

export function InsightsSection({ insights }: { insights: string[] }) {
  if (insights.length === 0) return null;

  return (
    <div className="bg-indigo-50 dark:bg-slate-900/50 border border-indigo-100 dark:border-indigo-900/30 rounded-xl p-6 transition-colors duration-300">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
        </svg>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Insights & Takeaways</h2>
      </div>
      <ul className="space-y-3">
        {insights.map((insight, idx) => (
          <li key={idx} className="flex items-start text-gray-700 dark:text-gray-300">
            <span className="text-primary mr-2">•</span>
            <span>{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
