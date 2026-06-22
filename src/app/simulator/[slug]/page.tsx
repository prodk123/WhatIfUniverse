import { getCategoryBySlug } from '@/config/categories';
import { getSimulatorBySlug } from '@/config/simulators';
import { notFound } from 'next/navigation';
import { SimulatorPage } from '@/components/simulator/SimulatorPage';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const simulator = getSimulatorBySlug(resolvedParams.slug);
  
  if (!simulator) {
    return {};
  }

  return {
    title: simulator.title,
    description: simulator.description,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const simulator = getSimulatorBySlug(resolvedParams.slug);
  
  if (!simulator) {
    notFound();
  }

  const category = getCategoryBySlug(simulator.category);

  return <SimulatorPage simulator={simulator} category={category!} />;
}
