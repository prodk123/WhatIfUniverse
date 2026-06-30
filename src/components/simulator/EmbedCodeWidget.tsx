'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/config/site';

interface EmbedCodeWidgetProps {
  simulatorSlug: string;
}

export function EmbedCodeWidget({ simulatorSlug }: EmbedCodeWidgetProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const embedUrl = `${siteConfig.url}/embed/${simulatorSlug}`;
  const embedCode = `<iframe src="${embedUrl}" width="100%" height="800" frameborder="0" allowfullscreen style="border: 1px solid #eee; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);"></iframe>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden mt-8 transition-colors duration-300">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 md:p-6 bg-white dark:bg-slate-950 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="font-bold text-gray-900 dark:text-white">Embed this Calculator</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Add this calculator to your own website or blog</p>
          </div>
        </div>
        <svg className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="p-4 md:p-6 border-t border-gray-200 dark:border-slate-800">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Copy the code below and paste it into your website&apos;s HTML editor. It works perfectly on WordPress, Webflow, Notion, and custom sites.
          </p>
          
          <div className="relative">
            <textarea
              readOnly
              value={embedCode}
              className="w-full h-24 p-4 bg-gray-100 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-mono text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center shadow-sm"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Code
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
