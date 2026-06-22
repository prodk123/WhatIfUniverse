import { moneySimulators } from './money';
import { careerSimulators } from './career';
import { healthSimulators } from './health';
import { educationSimulators } from './education';
import { businessSimulators } from './business';
import { lifestyleSimulators } from './lifestyle';

export const simulators = [
  ...moneySimulators,
  ...careerSimulators,
  ...healthSimulators,
  ...educationSimulators,
  ...businessSimulators,
  ...lifestyleSimulators,
];

export function getSimulatorBySlug(slug: string) {
  return simulators.find((s) => s.slug === slug);
}

export function getSimulatorsByCategory(categorySlug: string) {
  return simulators.filter((s) => s.category === categorySlug);
}
