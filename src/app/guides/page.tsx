import { guides } from '@/config/guides';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata = {
  title: 'Guides & Resources | What If Universe',
  description: 'Learn how to make the best life decisions with math-backed formulas and ROI calculators.',
};

export default function GuidesIndexPage() {
  return (
    <div className="container mx-auto py-8 md:py-12 px-4 md:px-8 max-w-4xl">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Guides' },
        ]}
        className="mb-8"
      />
      
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">Guides & Resources</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
          Deep dives into the math behind major life decisions. We do the calculations so you don&apos;t have to.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {guides.map((guide) => (
          <Link href={`/guides/${guide.slug}`} key={guide.slug} className="block group">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 transform group-hover:-translate-y-1">
              <div className="text-sm text-primary font-medium mb-3">{new Date(guide.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">{guide.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{guide.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
