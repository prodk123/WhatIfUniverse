import React from 'react';
import Link from 'next/link';
import { getSimulatorBySlug, getSimulatorsByCategory } from '@/config/simulators';
import { Card } from '@/components/ui/Card';

export function RelatedSimulators({ slugs, currentCategory }: { slugs: string[]; currentCategory: string }) {
  // Try to use provided related slugs first, then fallback to others in the same category
  let relatedSimulators = slugs
    .map(getSimulatorBySlug)
    .filter((s) => s !== undefined)
    .slice(0, 3);
    
  if (relatedSimulators.length < 3) {
    const categorySims = getSimulatorsByCategory(currentCategory)
      .filter((s) => !slugs.includes(s.slug))
      .slice(0, 3 - relatedSimulators.length);
      
    relatedSimulators = [...relatedSimulators, ...categorySims];
  }

  if (relatedSimulators.length === 0) return null;

  return (
    <section className="border-t border-gray-200 dark:border-slate-800 pt-12 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Keep Exploring</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedSimulators.map((simulator) => {
          if (!simulator) return null;
          return (
            <Link href={`/simulator/${simulator.slug}`} key={simulator.slug}>
              <Card className="h-full p-5 flex flex-col hover:border-primary dark:hover:border-primary transition-colors">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 leading-tight">{simulator.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{simulator.description}</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
