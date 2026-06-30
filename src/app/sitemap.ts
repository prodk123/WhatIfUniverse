import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { categories } from '@/config/categories';
import { simulators } from '@/config/simulators';
import { simulatorPermutations } from '@/config/permutations';
import { guides } from '@/config/guides';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  categories.forEach((category) => {
    routes.push({
      url: `${siteConfig.url}/category/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  simulators.forEach((simulator) => {
    routes.push({
      url: `${siteConfig.url}/simulator/${simulator.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    // Add permutations for this simulator
    const perms = simulatorPermutations[simulator.slug];
    if (perms) {
      perms.forEach((perm) => {
        routes.push({
          url: `${siteConfig.url}/simulator/${simulator.slug}/${perm.permutationSlug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      });
    }
  });

  // Add Guides index
  routes.push({
    url: `${siteConfig.url}/guides`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  });

  // Add individual guides
  guides.forEach((guide) => {
    routes.push({
      url: `${siteConfig.url}/guides/${guide.slug}`,
      lastModified: new Date(guide.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return routes;
}
