import Link from 'next/link';
import React from 'react';
import { getCategoryBySlug } from '@/config/categories';
import { getSimulatorsByCategory } from '@/config/simulators';
import { Card } from '@/components/ui/Card';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const category = getCategoryBySlug(resolvedParams.slug);
  
  if (!category) {
    notFound();
  }

  const categorySimulators = getSimulatorsByCategory(resolvedParams.slug);

  return (
    <div className="container mx-auto py-12 px-4 md:px-8 max-w-6xl">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: category.name },
        ]}
        className="mb-8"
      />
      
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{category.name} Simulators</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">{category.description}</p>
      </div>

      {categorySimulators.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categorySimulators.map((simulator) => (
            <Link href={`/simulator/${simulator.slug}`} key={simulator.slug}>
              <Card className="h-full p-6 flex flex-col hover:border-primary dark:hover:border-primary transition-colors">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">{simulator.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex-grow">{simulator.description}</p>
                <div className="mt-6 text-primary font-medium text-sm flex items-center group">
                  Start Simulation
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-slate-900 rounded-xl p-12 text-center border border-gray-200 dark:border-slate-800">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Coming Soon</h3>
          <p className="text-gray-600 dark:text-gray-400">Simulators for this category are currently being built.</p>
        </div>
      )}
    </div>
  );
}
