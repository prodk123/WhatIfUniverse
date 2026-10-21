'use client';

import React, { useState } from 'react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [topic, setTopic] = useState('Calculator Suggestion');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'b1678c0d-6b92-40fc-91ef-1b405ca78438';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[What If Universe] New Feedback: ${topic}`,
          from_name: 'What If Universe Anonymous Feedback',
          category: topic,
          message: message,
          submitted_at: new Date().toISOString(),
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(result.message || 'Unable to submit feedback. Please try again.');
      }
    } catch {
      setErrorMessage('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
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
          Thank you for helping improve What If Universe. Your suggestion has been dispatched to our inbox completely anonymously. No names, personal credentials, or emails were recorded.
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

      {errorMessage && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-xs text-red-600 dark:text-red-400">
          {errorMessage}
        </div>
      )}

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

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-8 py-3.5 bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100 font-semibold rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Anonymous Feedback'}
        </button>

        <a
          href="https://github.com/prodk123/WhatIfUniverse/issues/new"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors flex items-center gap-1"
        >
          Or open an issue on GitHub →
        </a>
      </div>
    </form>
  );
}
