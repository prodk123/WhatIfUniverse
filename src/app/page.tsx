import { Hero } from '@/components/home/Hero';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { HomeFeatures } from '@/components/home/HomeFeatures';
import { AdSlot } from '@/components/layout/AdSlot';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 md:px-8 mt-8">
        <AdSlot position="hero" />
      </div>
      <CategoryGrid />
      <div className="container mx-auto px-4 md:px-8 my-8">
        <AdSlot position="mid" />
      </div>
      <HomeFeatures />
    </>
  );
}
