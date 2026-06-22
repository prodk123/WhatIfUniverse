import { CategoryConfig } from '@/types/simulator';

export const categories: CategoryConfig[] = [
  {
    slug: 'money',
    name: 'Money',
    description: 'Investment, savings, and financial planning simulators to project your wealth growth.',
    icon: 'money',
    color: '#16A34A',
  },
  {
    slug: 'career',
    name: 'Career',
    description: 'Explore job changes, relocations, salary negotiations, and career switches.',
    icon: 'career',
    color: '#2563EB',
  },
  {
    slug: 'health',
    name: 'Health',
    description: 'See the impact of fitness, diet, and lifestyle habits on your long-term health.',
    icon: 'health',
    color: '#DC2626',
  },
  {
    slug: 'education',
    name: 'Education',
    description: 'Evaluate degrees, courses, certifications, and learning paths for ROI.',
    icon: 'education',
    color: '#9333EA',
  },
  {
    slug: 'business',
    name: 'Business',
    description: 'Model startup costs, revenue projections, and break-even timelines.',
    icon: 'business',
    color: '#EA580C',
  },
  {
    slug: 'lifestyle',
    name: 'Lifestyle',
    description: 'Explore living changes — housing, commute, relationships, and daily routines.',
    icon: 'lifestyle',
    color: '#0891B2',
  },
];

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return categories.find((c) => c.slug === slug);
}
