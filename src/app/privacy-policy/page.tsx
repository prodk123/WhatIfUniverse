import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Privacy Policy | What If Universe',
  description: 'Privacy Policy for What If Universe. Learn how we handle your data and protect your privacy.',
  alternates: {
    canonical: `${siteConfig.url}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-8 md:py-12 px-4 md:px-8 max-w-4xl">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy' },
        ]}
        className="mb-8"
      />

      <article className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">Last updated: October 21, 2026</p>

        <div className="prose dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Welcome to What If Universe (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and being transparent about our data practices. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website at what-if-universe.com (the &quot;Site&quot;).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">2.1 Information You Provide</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our simulators and calculators are designed to work entirely in your browser. All numerical inputs you enter into our calculators (such as salary amounts, investment figures, or health metrics) are processed locally on your device and are <strong className="text-gray-900 dark:text-white">never transmitted to our servers</strong>. We do not store, log, or have access to any values you enter.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">2.2 Automatically Collected Information</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              When you visit our Site, we may automatically collect certain standard technical information, including your IP address, browser type, device type, operating system, referring URLs, pages viewed, and the dates/times of visits. This information is collected through cookies and similar technologies for analytics and advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700 dark:text-gray-300">
              <li>To operate, maintain, and improve our Site and services</li>
              <li>To understand how visitors use our Site through analytics</li>
              <li>To display relevant advertisements through Google AdSense</li>
              <li>To detect and prevent fraud or abuse</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Third-Party Services</h2>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">4.1 Google AdSense</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We use Google AdSense to display advertisements on our Site. Google AdSense uses cookies and web beacons to serve ads based on your prior visits to our Site or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our Site and/or other sites on the Internet. You may opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">4.2 Google Analytics</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We use Google Analytics to understand how visitors interact with our Site. Google Analytics collects information such as how often users visit the Site, what pages they visit, and what other sites they used prior to coming to our Site. We use this information solely to improve our Site. You can opt out by installing the{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">4.3 Cloudflare</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              We use Cloudflare for content delivery, DNS, and security services. Cloudflare may collect certain technical data as part of its service. For more information, see{' '}
              <a href="https://www.cloudflare.com/privacypolicy/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Cloudflare&apos;s Privacy Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Cookies</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our Site uses cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-white">Essential cookies:</strong> To remember your currency preference and theme selection (light/dark mode)</li>
              <li><strong className="text-gray-900 dark:text-white">Analytics cookies:</strong> To understand site usage through Google Analytics</li>
              <li><strong className="text-gray-900 dark:text-white">Advertising cookies:</strong> To serve relevant ads through Google AdSense</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Data Security</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect the information we collect. Our Site uses HTTPS encryption, Content Security Policy headers, and other security best practices. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Children&apos;s Privacy</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Our Site is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us so we can promptly delete it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Your Rights</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Because What If Universe operates with a zero-data collection policy—we do not collect, store, or require your name, email address, or calculator inputs—we hold no identifiable personal records on our visitors. All calculations execute solely in your local browser.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Changes to This Policy</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. Your continued use of the Site after any changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Contact Us</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have any questions or feedback about this Privacy Policy, please reach out via our{' '}
              <a href="/contact" className="text-primary hover:underline">Feedback page</a>{' '}
              or submit an issue on our public{' '}
              <a href="https://github.com/prodk123/WhatIfUniverse" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub repository</a>.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
