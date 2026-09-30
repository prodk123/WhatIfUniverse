import { getCategoryBySlug } from '@/config/categories';
import { getSimulatorBySlug, simulators } from '@/config/simulators';
import { getPermutation, simulatorPermutations } from '@/config/permutations';
import { notFound } from 'next/navigation';
import { SimulatorPage } from '@/components/simulator/SimulatorPage';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export async function generateStaticParams() {
  const params: { slug: string; permutation: string }[] = [];
  for (const simulator of simulators) {
    const perms = simulatorPermutations[simulator.slug];
    if (perms) {
      for (const perm of perms) {
        params.push({
          slug: simulator.slug,
          permutation: perm.permutationSlug,
        });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string, permutation: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const simulator = getSimulatorBySlug(resolvedParams.slug);
  const permutation = getPermutation(resolvedParams.slug, resolvedParams.permutation);
  
  if (!simulator || !permutation) {
    return {};
  }

  const category = getCategoryBySlug(simulator.category);
  const ogUrl = new URL(`${siteConfig.url}/api/og`);
  ogUrl.searchParams.set('title', permutation.h1);
  ogUrl.searchParams.set('categoryName', category?.name || '');
  ogUrl.searchParams.set('categoryColor', category?.color || '');

  return {
    title: permutation.title,
    description: permutation.description,
    alternates: {
      canonical: `${siteConfig.url}/simulator/${simulator.slug}/${permutation.permutationSlug}`,
    },
    openGraph: {
      title: permutation.title,
      description: permutation.description,
      url: `${siteConfig.url}/simulator/${simulator.slug}/${permutation.permutationSlug}`,
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

export default async function PermutationPage({ params }: { params: Promise<{ slug: string, permutation: string }> }) {
  const resolvedParams = await params;
  const simulator = getSimulatorBySlug(resolvedParams.slug);
  const permutation = getPermutation(resolvedParams.slug, resolvedParams.permutation);
  
  if (!simulator || !permutation) {
    notFound();
  }

  const category = getCategoryBySlug(simulator.category);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: permutation.title,
    description: permutation.description,
    applicationCategory: 'CalculatorApplication',
    operatingSystem: 'Any',
    url: `${siteConfig.url}/simulator/${simulator.slug}/${permutation.permutationSlug}`,
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
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: permutation.h1,
        item: `${siteConfig.url}/simulator/${simulator.slug}/${permutation.permutationSlug}`
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <SimulatorPage simulator={simulator} category={category!} permutation={permutation} />
    </>
  );
}
