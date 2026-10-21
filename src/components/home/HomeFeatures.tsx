import React from 'react';
import Link from 'next/link';
import { guides } from '@/config/guides';

export function HomeFeatures() {
  const featuredGuides = guides.slice(0, 3);

  const homeFaqs = [
    {
      q: 'Are What If Universe simulators really free to use?',
      a: 'Yes, 100% free with no signups, paywalls, or credit cards required. All computations run directly in your browser.'
    },
    {
      q: 'Is my personal financial data private?',
      a: 'Completely. Because all mathematical engines execute locally via client-side JavaScript on your device, your numbers, income, and habit data are never sent to or stored on any server.'
    },
    {
      q: 'How accurate are the projections?',
      a: 'Our models use standard economic and mathematical formulas (such as compound interest with periodic contributions, discounted cash flow, and Purchasing Power Parity). While real markets and life involve volatility, our tools provide a mathematically sound baseline for decision making.'
    },
    {
      q: 'Can I embed these calculators on my own website?',
      a: 'Yes! Every calculator includes an "Embed this Calculator" widget with a clean iframe code snippet you can paste into any CMS or HTML page.'
    }
  ];

  return (
    <div className="container mx-auto px-4 md:px-8 space-y-24 my-20">
      {/* 3-Step How It Works */}
      <section>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Three simple steps to replace gut feelings with mathematical clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-primary font-bold text-xl flex items-center justify-center mb-6">
              1
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Select a Scenario</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Explore 75+ verified simulators across Money, Career, Health, Education, Business, and Lifestyle.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 font-bold text-xl flex items-center justify-center mb-6">
              2
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Tune Your Variables</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Adjust monthly contributions, expected returns, local tax rates, and duration using interactive, real-time sliders.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 font-bold text-xl flex items-center justify-center mb-6">
              3
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">See Your Future Mapped</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Instantly view exponential growth charts, break-even timelines, milestone dates, and key strategic takeaways.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Guides Section */}
      <section className="bg-gray-50/50 dark:bg-slate-900/40 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Featured Research & Guides
            </h2>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              In-depth mathematical breakdowns exploring opportunity cost, tax differentials, and compounding habits.
            </p>
          </div>
          <Link
            href="/guides"
            className="mt-4 md:mt-0 font-semibold text-primary hover:underline flex items-center gap-1 text-sm"
          >
            Browse all guides
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredGuides.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group block">
              <div className="h-full bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm group-hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">
                    {new Date(guide.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors mb-3 line-clamp-2">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                    {guide.description}
                  </p>
                </div>
                <div className="mt-6 text-sm font-semibold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Guide →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust & Architecture Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800">
          <div className="text-2xl mb-3">🔒</div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">100% Private</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            All calculations happen entirely in your web browser. No figures are ever stored or uploaded.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800">
          <div className="text-2xl mb-3">📐</div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">Math-Backed Models</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            Formulas derived from established financial mathematics, tax laws, and epidemiological datasets.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800">
          <div className="text-2xl mb-3">🌍</div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">Multi-Currency</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            Seamlessly toggle between INR, USD, EUR, GBP, AED, and SAR with live automatic scaling.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800">
          <div className="text-2xl mb-3">⚡</div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">Zero Signup</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            Instant interactive simulation. No email gate, no accounts, and no paywalls.
          </p>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Everything you need to know about What If Universe and our simulation tools.
          </p>
        </div>

        <div className="space-y-6">
          {homeFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{faq.q}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
