import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { categories } from '@/config/categories';
import { simulators } from '@/config/simulators';

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
  });

  return routes;
}
