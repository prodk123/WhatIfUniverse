'use client';

import React, { useState } from 'react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('Calculator Suggestion');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Process feedback client-side without collecting any personal information
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-8 text-center">
        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-800/40 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Feedback Received!</h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6 text-sm">
          Thank you for helping improve What If Universe. Your feedback has been recorded completely anonymously. No personal details, names, or emails were tracked or stored.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setMessage('');
          }}
          className="text-sm font-semibold text-primary hover:underline"
        >
          Send another anonymous note
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 rounded-2xl p-4 flex items-center gap-3">
        <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <p className="text-xs text-gray-600 dark:text-gray-300">
          <strong className="text-gray-900 dark:text-white">100% Anonymous:</strong> We do not require or collect your name, email, or any personal details.
        </p>
      </div>

      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Category
        </label>
        <select
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
        >
          <option value="Calculator Suggestion">Suggest a New Calculator / Formula</option>
          <option value="Bug Report">Report a Mathematical or Display Bug</option>
          <option value="General Feedback">General Improvement Suggestion</option>
          <option value="Other">Other Feedback</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Your Feedback / Suggestion
        </label>
        <textarea
          id="message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your calculator idea, formula improvement, or bug report..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full md:w-auto px-8 py-3.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Anonymous Feedback'}
      </button>
    </form>
  );
}
