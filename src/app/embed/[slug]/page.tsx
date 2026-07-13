import React from 'react';
import { getSimulatorBySlug } from '@/config/simulators';
import { getCategoryBySlug } from '@/config/categories';
import { SimulatorPage } from '@/components/simulator/SimulatorPage';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

// Embed pages are iframed copies of a simulator — don't index them
// separately; point canonical back to the main simulator page.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${siteConfig.url}/simulator`,
  },
};

export default async function EmbedSimulatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const simulator = getSimulatorBySlug(resolvedParams.slug);

  if (!simulator) {
    notFound();
  }

  const category = getCategoryBySlug(simulator.category);

  if (!category) {
    notFound();
  }

  return <SimulatorPage simulator={simulator} category={category} isEmbed={true} />;
}
