import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | What If Universe',
  description: 'Learn about What If Universe — free interactive simulators and calculators for money, career, health, education, and life decisions.',
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8 md:py-12 px-4 md:px-8 max-w-4xl">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'About' },
        ]}
        className="mb-8"
      />

      <article className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-10 tracking-tight">About What If Universe</h1>

        <div className="prose dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              What If Universe was built on a simple belief: <strong className="text-gray-900 dark:text-white">every major life decision deserves a mathematical model</strong>. Whether you&apos;re deciding to pursue a Master&apos;s degree, negotiating a salary raise, quitting smoking, or starting a YouTube channel — the financial and health consequences of your choices compound over years and decades in ways that are impossible to intuit.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              We build free, interactive simulators that let you plug in your own numbers and instantly see the projected outcome mapped on a chart. No signups, no paywalls, no data collection — just math.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What We Offer</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We currently offer <strong className="text-gray-900 dark:text-white">75+ interactive calculators</strong> across six categories:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 dark:text-gray-300">
              <li>
                <Link href="/category/money" className="text-primary hover:underline font-medium">Money</Link> — Investment growth, SIP calculators, compound interest projections, lump sum analysis, and FIRE (Financial Independence) planning
              </li>
              <li>
                <Link href="/category/career" className="text-primary hover:underline font-medium">Career</Link> — Salary comparison tools for relocating to Dubai, USA, or going freelance, factoring in taxes, cost of living, and purchasing power
              </li>
              <li>
                <Link href="/category/health" className="text-primary hover:underline font-medium">Health</Link> — Quantify the long-term impact of walking 10,000 steps, quitting smoking, intermittent fasting, lifting weights, and cutting sugar
              </li>
              <li>
                <Link href="/category/education" className="text-primary hover:underline font-medium">Education</Link> — ROI calculators for Master&apos;s degrees, MBAs, Medical school, Law school, and professional certifications like CFA
              </li>
              <li>
                <Link href="/category/business" className="text-primary hover:underline font-medium">Business</Link> — Revenue projections for YouTube channels, blogs, newsletters, SaaS startups, e-commerce, and Airbnb hosting
              </li>
              <li>
                <Link href="/category/lifestyle" className="text-primary hover:underline font-medium">Lifestyle</Link> — Time reclamation calculators for waking up early, digital detox, meal prep, and eliminating commutes
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Our Calculators Work</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Every calculator on What If Universe is powered by a mathematical engine that runs entirely in your browser. Here&apos;s what makes our tools different:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-white">Client-side computation:</strong> All calculations happen on your device. Your financial data never leaves your browser.</li>
              <li><strong className="text-gray-900 dark:text-white">Multi-currency support:</strong> Switch between INR, USD, EUR, GBP, AED, SAR, and more with automatic conversion.</li>
              <li><strong className="text-gray-900 dark:text-white">Interactive charts:</strong> Every simulator renders a real-time chart that updates as you adjust inputs, so you can visually see the impact of each variable.</li>
              <li><strong className="text-gray-900 dark:text-white">Embeddable:</strong> All our calculators can be embedded on third-party websites and blogs via an iframe.</li>
              <li><strong className="text-gray-900 dark:text-white">Structured data:</strong> Every page includes Schema.org structured data (FAQPage, WebApplication, BreadcrumbList) for rich search results.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Guides</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Beyond calculators, we publish in-depth{' '}
              <Link href="/guides" className="text-primary hover:underline font-medium">educational guides</Link>{' '}
              that break down the mathematics behind major life decisions. Our guides explain concepts like opportunity cost, compound interest, break-even timelines, and tax implications — with embedded interactive calculators so you can follow along with your own numbers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Important Disclaimer</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              What If Universe provides educational tools and informational content only. Our calculators use simplified mathematical models based on historical averages and assumptions. They are <strong className="text-gray-900 dark:text-white">not</strong> a substitute for professional financial, medical, legal, or career advice. Always consult a qualified professional before making significant life decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Feedback & Contributions</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Have a suggestion for a new calculator, found a mathematical edge case, or want to contribute?{' '}
              Leave an anonymous suggestion via our{' '}
              <Link href="/contact" className="text-primary hover:underline font-semibold">Feedback page</Link>
              {' '}or open an issue on our public{' '}
              <a href="https://github.com/prodk123/WhatIfUniverse" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">GitHub repository</a>.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
