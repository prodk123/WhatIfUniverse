import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Terms of Service | What If Universe',
  description: 'Terms of Service for What If Universe. Read our terms and conditions for using our interactive simulators and calculators.',
  alternates: {
    canonical: `${siteConfig.url}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="container mx-auto py-8 md:py-12 px-4 md:px-8 max-w-4xl">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Terms of Service' },
        ]}
        className="mb-8"
      />

      <article className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">Terms of Service</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">Last updated: October 21, 2026</p>

        <div className="prose dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              By accessing and using What If Universe (&quot;the Site&quot;), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Description of Service</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              What If Universe provides free, interactive financial calculators, health projections, career comparison tools, education ROI simulators, business revenue models, and lifestyle optimization calculators. All calculations are performed client-side in your browser. The Site also publishes educational guide articles with embedded calculators.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Disclaimer of Professional Advice</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The content, calculators, and tools on this Site are provided for <strong className="text-gray-900 dark:text-white">educational and informational purposes only</strong>. They do not constitute professional financial, investment, medical, legal, tax, or career advice. Our calculators use simplified mathematical models and historical averages that may not reflect actual market conditions, tax laws, or individual circumstances.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              You should always consult with a qualified professional (financial advisor, physician, lawyer, career counselor) before making any significant decisions based on information from this Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Accuracy of Information</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              While we strive to provide accurate calculations and up-to-date information, we make no warranties or representations regarding the accuracy, completeness, or reliability of any content on the Site. Exchange rates, tax brackets, interest rates, and other financial data used in our calculators are approximations and may not be current.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Use of the Site</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">You agree to use the Site only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700 dark:text-gray-300">
              <li>Use the Site in any way that violates applicable laws or regulations</li>
              <li>Attempt to interfere with or disrupt the Site&apos;s infrastructure</li>
              <li>Use automated systems (bots, scrapers) to access the Site without our permission</li>
              <li>Reproduce, distribute, or create derivative works from the Site&apos;s content without authorization</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Intellectual Property</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              All content on the Site — including text, graphics, logos, calculator engines, guide articles, and software — is the property of What If Universe and is protected by intellectual property laws. You may embed our calculators on your own website using the provided embed code, but you may not modify, reverse-engineer, or redistribute the underlying code.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Third-Party Advertising</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The Site displays advertisements provided by Google AdSense. These ads may use cookies and tracking technologies to serve personalized content. We are not responsible for the content or privacy practices of third-party advertisers. See our Privacy Policy for more details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Limitation of Liability</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              To the fullest extent permitted by law, What If Universe shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Site. This includes, without limitation, any financial losses incurred as a result of relying on calculator outputs or guide content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Changes to Terms</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the Site. Your continued use of the Site after changes are posted constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Contact</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:legal@what-if-universe.com" className="text-primary hover:underline">legal@what-if-universe.com</a>.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
