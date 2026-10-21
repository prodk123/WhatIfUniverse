import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | What If Universe',
  description: 'Get in touch with the What If Universe team. Suggest a new simulator, report a bug, or ask questions about our mathematical models.',
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
          { label: 'Contact Us' },
        ]}
        className="mb-8"
      />

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">Contact Us</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
          Have a suggestion for a new simulator? Found a bug? Need clarification on our calculation methodology? We would love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">General Inquiries</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">For partnerships, feedback, and press inquiries.</p>
          <a href="mailto:hello@what-if-universe.com" className="text-sm font-semibold text-primary hover:underline">
            hello@what-if-universe.com
          </a>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Calculator Suggestions</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Suggest variables, formulas, or new life models.</p>
          <a href="mailto:support@what-if-universe.com" className="text-sm font-semibold text-emerald-600 hover:underline">
            support@what-if-universe.com
          </a>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Privacy & Data</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Questions regarding data privacy and cookies.</p>
          <a href="mailto:privacy@what-if-universe.com" className="text-sm font-semibold text-purple-600 hover:underline">
            privacy@what-if-universe.com
          </a>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Send Us a Direct Message</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          We usually review submissions and reply within 24 to 48 hours.
        </p>

        <ContactForm />
      </div>

      <div className="bg-gray-50 dark:bg-slate-900/50 rounded-3xl border border-gray-100 dark:border-slate-800/80 p-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Contact Questions</h3>
        <div className="space-y-4 text-gray-600 dark:text-gray-400 text-sm">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Can I embed What If Universe simulators on my site?</h4>
            <p>Yes! Every simulator page has an &quot;Embed this Calculator&quot; button that gives you an iframe snippet ready to paste into WordPress, Webflow, or custom HTML.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">How do you verify the accuracy of the mathematical engines?</h4>
            <p>Our formulas follow standard financial mathematics (e.g. compound interest with periodic contributions, discounted cash flows), established epidemiological habit models, and purchasing power parity databases. However, all tools are intended for educational simulation purposes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
