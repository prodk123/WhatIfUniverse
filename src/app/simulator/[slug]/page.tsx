import { getCategoryBySlug } from '@/config/categories';
import { getSimulatorBySlug } from '@/config/simulators';
import { notFound } from 'next/navigation';
import { SimulatorPage } from '@/components/simulator/SimulatorPage';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const simulator = getSimulatorBySlug(resolvedParams.slug);
  
  if (!simulator) {
    return {};
  }

  const category = getCategoryBySlug(simulator.category);
  const ogUrl = new URL(`${siteConfig.url}/api/og`);
  ogUrl.searchParams.set('title', simulator.title);
  ogUrl.searchParams.set('categoryName', category?.name || '');
  ogUrl.searchParams.set('categoryColor', category?.color || '');

  return {
    title: simulator.title,
    description: simulator.description,
    alternates: {
      canonical: `${siteConfig.url}/simulator/${simulator.slug}`,
    },
    openGraph: {
      title: simulator.title,
      description: simulator.description,
      url: `${siteConfig.url}/simulator/${simulator.slug}`,
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

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const simulator = getSimulatorBySlug(resolvedParams.slug);
  
  if (!simulator) {
    notFound();
  }

  const category = getCategoryBySlug(simulator.category);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: simulator.title,
    description: simulator.description,
    applicationCategory: 'CalculatorApplication',
    operatingSystem: 'Any',
    url: `${siteConfig.url}/simulator/${simulator.slug}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.url
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category?.name || 'Category',
        item: `${siteConfig.url}/category/${category?.slug}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: simulator.title,
        item: `${siteConfig.url}/simulator/${simulator.slug}`
      }
    ]
  };

  const faqJsonLd = simulator.faqs && simulator.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: simulator.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <SimulatorPage simulator={simulator} category={category!} />
    </>
  );
}
