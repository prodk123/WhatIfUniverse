'use client';

import React, { useState } from 'react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className = '' }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <div className={`border border-gray-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-300 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`
              ${index !== 0 ? 'border-t border-gray-200 dark:border-slate-800' : ''}
            `}
          >
              <button
                className="flex w-full items-center justify-between px-4 py-4 text-left focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-slate-800 transition-colors hover:bg-gray-50 dark:hover:bg-slate-800"
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
              >
                <span className="font-medium text-gray-900 dark:text-white">{item.title}</span>
                <svg
                  className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isOpen && (
              <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
