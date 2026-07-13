import { getGuideBySlug } from '@/config/guides';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedSimulators } from '@/components/simulator/RelatedSimulators';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { AdSlot } from '@/components/layout/AdSlot';
import { autoLinkText } from '@/lib/seo-linker';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const guide = getGuideBySlug(resolvedParams.slug);
  
  if (!guide) {
    return {};
  }

  const ogUrl = new URL(`${siteConfig.url}/api/og`);
  ogUrl.searchParams.set('title', guide.title);
  ogUrl.searchParams.set('categoryName', 'Guide');

  return {
    title: `${guide.title} | What If Universe`,
    description: guide.description,
    alternates: {
      canonical: `${siteConfig.url}/guides/${guide.slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `${siteConfig.url}/guides/${guide.slug}`,
      type: 'article',
      publishedTime: guide.date,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
        }
      ]
    }
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const guide = getGuideBySlug(resolvedParams.slug);
  
  if (!guide) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    datePublished: guide.date,
    author: {
      '@type': 'Organization',
      name: 'What If Universe',
      url: siteConfig.url
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container mx-auto py-8 md:py-12 px-4 md:px-8 max-w-4xl">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Guides', href: '/guides' },
            { label: guide.title },
          ]}
          className="mb-8"
        />

        <article className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <header className="mb-12 border-b border-gray-100 dark:border-slate-800 pb-10">
            <time className="text-primary font-medium tracking-wide text-sm mb-4 block" dateTime={guide.date}>
              {new Date(guide.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight mb-6">
              {guide.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              {guide.description}
            </p>
          </header>

          <div className="mb-12">
            <AdSlot position="hero" />
          </div>

          <div className="max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-12 mb-6 tracking-tight" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6 tracking-tight border-b border-gray-200 dark:border-slate-800 pb-4" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 tracking-tight" {...props} />,
                p: ({node, ...props}) => <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-gray-700 dark:text-gray-300" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-lg text-gray-700 dark:text-gray-300" {...props} />,
                li: ({node, ...props}) => <li className="pl-2" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-gray-900 dark:text-white" {...props} />,
                em: ({node, ...props}) => <em className="italic text-gray-800 dark:text-gray-200" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600 dark:text-gray-400 my-6 bg-gray-50 dark:bg-slate-800/50 py-3 pr-4 rounded-r-lg" {...props} />,
                a: ({ node, href, children, ...props }) => {
                  if (href?.startsWith('/embed/')) {
                    const embedSlug = href.replace('/embed/', '');
                    return (
                      <span className="block my-12 w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <iframe 
                          src={`/embed/${embedSlug}`} 
                          className="w-full border-0"
                          style={{ minHeight: '850px' }}
                          title={`Calculator: ${embedSlug}`}
                        />
                      </span>
                    );
                  }
                  return <a href={href} className="text-primary font-medium hover:underline decoration-primary/50 underline-offset-4 transition-all" {...props}>{children}</a>;
                }
              }}
            >
              {autoLinkText(guide.content)}
            </ReactMarkdown>
          </div>

          <div className="mt-16">
            <AdSlot position="bottom" />
          </div>
        </article>

        {guide.relatedSimulators && guide.relatedSimulators.length > 0 && (
          <div className="mt-12">
            <RelatedSimulators slugs={guide.relatedSimulators} title="Calculators featured in this guide" />
          </div>
        )}
      </div>
    </>
  );
}
