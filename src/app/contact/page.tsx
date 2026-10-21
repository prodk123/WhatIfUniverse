import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Feedback & Contact | What If Universe',
  description: 'Provide feedback or suggest a calculator for What If Universe completely anonymously. Zero user data collection.',
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto py-8 md:py-12 px-4 md:px-8 max-w-4xl">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Feedback & Contact' },
        ]}
        className="mb-8"
      />

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
          Feedback & Contact
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
          What If Universe is designed with a strict zero-data philosophy. We do not require signups, logins, or user credentials. Share your ideas, report bugs, or suggest formulas completely anonymously.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Anonymous Notes</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Send suggestions or bug alerts below with no name or email required.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-gray-900 dark:text-white mb-4">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">GitHub Issues</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Open a public bug report or pull request on our codebase.
          </p>
          <a
            href="https://github.com/prodk123/WhatIfUniverse"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
          >
            Visit Repository →
          </a>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Zero-Data Policy</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            All calculations run on your device. We never store, log, or request your financial data.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Send Anonymous Feedback</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm">
          Suggest a variable, request a new life scenario, or alert us to a mathematical correction.
        </p>

        <ContactForm />
      </div>

      <div className="bg-gray-50 dark:bg-slate-900/50 rounded-3xl border border-gray-100 dark:border-slate-800/80 p-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4 text-gray-600 dark:text-gray-400 text-sm">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Do I need an account to use the calculators?</h4>
            <p>No. Every calculator on What If Universe is completely open with zero signup, account creation, or email verification required.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Can I embed What If Universe simulators on my site?</h4>
            <p>Yes! Every simulator page has an &quot;Embed this Calculator&quot; button that provides a ready-to-use iframe snippet for your own blog or website.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">How can I contribute a new formula?</h4>
            <p>You can share the mathematical model using the anonymous feedback form above or submit a Pull Request on our GitHub repository.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
