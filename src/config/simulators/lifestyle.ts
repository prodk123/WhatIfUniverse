import { SimulatorConfig } from '@/types/simulator';

const createLifestyleSim = (
  slug: string,
  title: string,
  desc: string,
  inputs: any[]
): SimulatorConfig => ({
  slug,
  title,
  category: 'lifestyle',
  description: desc,
  explanation: `Calculate the extra time and productivity gained by ${title.toLowerCase()}. Small daily habits compound into years of extra living.`,
  inputs,
  engine: 'linear-projection',
  engineConfig: { type: 'time' },
  chartType: 'bar',
  chartKeys: {
    xAxis: 'year',
    lines: [
      { key: 'metric', label: 'Extra Productive Hours', color: '#0891B2' },
    ],
  },
  insights: [],
  faqs: [
    { question: 'What is a 40-hour work week equivalent?', answer: 'It shows how many standard full-time work weeks you gain by reclaiming this time.' },
  ],
  relatedSlugs: [],
});

const defaultProductivePercent = { name: 'productivePercent', label: '% of Reclaimed Time Used Productively', type: 'slider', defaultValue: 80, min: 10, max: 100, step: 10, suffixStr: '%', validation: [] };
const defaultYears = { name: 'years', label: 'Years to Project', type: 'slider', defaultValue: 5, min: 1, max: 20, step: 1, suffixStr: ' years', validation: [] };

export const lifestyleSimulators: SimulatorConfig[] = [
  createLifestyleSim('wake-up-early', 'What If I Wake Up Early?', 'Gaining uninterrupted morning hours.', [
    { name: 'currentWakeTime', label: 'Current Wake Up Time (24h)', type: 'slider', defaultValue: 8, min: 4, max: 12, step: 0.5, suffixStr: ':00', validation: [] },
    { name: 'targetWakeTime', label: 'Target Wake Up Time (24h)', type: 'slider', defaultValue: 5, min: 4, max: 12, step: 0.5, suffixStr: ':00', validation: [] },
    defaultProductivePercent,
    defaultYears
  ]),
  
  createLifestyleSim('digital-detox', 'What If I Delete Social Media?', 'Reclaiming screen time for real life.', [
    { name: 'dailyHoursSaved', label: 'Daily Screen Time Saved', type: 'slider', defaultValue: 3, min: 1, max: 8, step: 0.5, suffixStr: ' hours', validation: [] },
    defaultProductivePercent,
    defaultYears
  ]),
  
  createLifestyleSim('commute-by-train', 'What If I Take the Train Instead of Driving?', 'Reading or working during commute.', [
    { name: 'dailyHoursSaved', label: 'Daily Commute Time Reclaimed', type: 'slider', defaultValue: 2, min: 0.5, max: 4, step: 0.5, suffixStr: ' hours', validation: [] },
    defaultProductivePercent,
    defaultYears
  ]),
  
  createLifestyleSim('stop-watching-tv', 'What If I Stop Watching TV/Netflix?', 'Reclaiming evening hours.', [
    { name: 'dailyHoursSaved', label: 'Daily TV Time Saved', type: 'slider', defaultValue: 3, min: 1, max: 6, step: 0.5, suffixStr: ' hours', validation: [] },
    defaultProductivePercent,
    defaultYears
  ]),
  
  createLifestyleSim('meal-prep', 'What If I Meal Prep on Sundays?', 'Saving daily cooking time.', [
    { name: 'dailyHoursSaved', label: 'Daily Cooking/Cleaning Time Saved', type: 'slider', defaultValue: 1.5, min: 0.5, max: 3, step: 0.5, suffixStr: ' hours', validation: [] },
    defaultProductivePercent,
    defaultYears
  ]),
  
  createLifestyleSim('hire-a-cleaner', 'What If I Hire a Cleaner?', 'Trading money for time.', [
    { name: 'dailyHoursSaved', label: 'Daily Chores Time Saved', type: 'slider', defaultValue: 1, min: 0.5, max: 4, step: 0.5, suffixStr: ' hours', validation: [] },
    defaultProductivePercent,
    defaultYears
  ]),
  
  createLifestyleSim('no-meetings', 'What If I Decline Pointless Meetings?', 'Reclaiming deep work hours.', [
    { name: 'dailyHoursSaved', label: 'Daily Meeting Time Saved', type: 'slider', defaultValue: 2, min: 0.5, max: 5, step: 0.5, suffixStr: ' hours', validation: [] },
    defaultProductivePercent,
    defaultYears
  ]),
  
  createLifestyleSim('live-close-to-work', 'What If I Move Next to My Office?', 'Eliminating the commute completely.', [
    { name: 'dailyHoursSaved', label: 'Daily Commute Time Saved', type: 'slider', defaultValue: 2, min: 0.5, max: 4, step: 0.5, suffixStr: ' hours', validation: [] },
    defaultProductivePercent,
    defaultYears
  ]),
  
  createLifestyleSim('stop-gaming', 'What If I Stop Playing Video Games?', 'Redirecting gaming hours.', [
    { name: 'dailyHoursSaved', label: 'Daily Gaming Time Saved', type: 'slider', defaultValue: 2, min: 1, max: 8, step: 0.5, suffixStr: ' hours', validation: [] },
    defaultProductivePercent,
    defaultYears
  ]),
  
  createLifestyleSim('audiobooks-on-commute', 'What If I Listen to Audiobooks?', 'Learning while stuck in traffic.', [
    { name: 'dailyHoursSaved', label: 'Daily Commute Time Used For Learning', type: 'slider', defaultValue: 1.5, min: 0.5, max: 4, step: 0.5, suffixStr: ' hours', validation: [] },
    defaultProductivePercent,
    defaultYears
  ]),
];
