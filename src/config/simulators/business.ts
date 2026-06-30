import { SimulatorConfig } from '@/types/simulator';

const createBusinessSim = (
  slug: string,
  title: string,
  desc: string,
  inputs: any[],
  growth: number,
  metricName: string,
  unitName: string,
  audienceName: string,
  platformName: string,
  isPer1000: boolean = true
): SimulatorConfig => ({
  slug,
  title,
  category: 'business',
  description: desc,
  explanation: `See the compound growth of ${title.toLowerCase()}. Consistency over time leads to exponential growth in ${audienceName.toLowerCase()} and revenue.`,
  inputs,
  engine: 'linear-projection',
  engineConfig: { type: 'business', baseGrowthRate: growth, metricName, unitName, audienceName, platformName, isPer1000 },
  chartType: 'area',
  chartKeys: {
    xAxis: 'year',
    lines: [
      { key: 'metric', label: 'Monthly Revenue', color: '#EA580C' },
    ],
  },
  insights: [],
  faqs: [
    { question: 'Is this linear?', answer: `No, ${platformName.toLowerCase()} usually grows exponentially as your efforts compound.` },
  ],
  relatedSlugs: [],
});

const defaultYears = { name: 'years', label: 'Years to Project', type: 'slider', defaultValue: 3, min: 1, max: 10, step: 1, suffixStr: ' years', validation: [] };

export const businessSimulators: SimulatorConfig[] = [
  createBusinessSim('start-youtube-channel', 'What If I Start a YouTube Channel?', 'Projecting AdSense revenue over 3 years.', [
    { name: 'unitsPerMonth', label: `Videos Per Month`, type: 'slider', defaultValue: 4, min: 1, max: 30, step: 1, validation: [] },
    { name: 'rpm', label: `Revenue Per 1000 Views (RPM)`, type: 'number', defaultValue: 150, min: 10, max: 2000, step: 10, prefix: '$', validation: [] },
    defaultYears
  ], 1.5, 'Subscribers', 'Videos', 'Views', 'YouTube', true),
  
  createBusinessSim('start-blog', 'What If I Start a Blog?', 'SEO growth and affiliate revenue.', [
    { name: 'unitsPerMonth', label: `Articles Per Month`, type: 'slider', defaultValue: 8, min: 1, max: 30, step: 1, validation: [] },
    { name: 'rpm', label: `Revenue Per 1000 Readers`, type: 'number', defaultValue: 500, min: 50, max: 5000, step: 50, prefix: '$', validation: [] },
    defaultYears
  ], 1.3, 'Traffic', 'Articles', 'Readers', 'Blogging', true),
  
  createBusinessSim('start-newsletter', 'What If I Start a Newsletter?', 'Sponsorships and paid subscriptions.', [
    { name: 'unitsPerMonth', label: `Newsletters Per Month`, type: 'slider', defaultValue: 4, min: 1, max: 30, step: 1, validation: [] },
    { name: 'rpm', label: `Revenue Per 1000 Subscribers`, type: 'number', defaultValue: 2000, min: 100, max: 10000, step: 100, prefix: '$', validation: [] },
    defaultYears
  ], 1.4, 'Subscribers', 'Newsletters', 'Readers', 'Email Newsletters', true),
  
  createBusinessSim('saas-startup', 'What If I Build a SaaS?', 'Recurring revenue.', [
    { name: 'newCustomers', label: `New Customers Per Month`, type: 'slider', defaultValue: 10, min: 1, max: 500, step: 1, validation: [] },
    { name: 'price', label: `Monthly Subscription Price`, type: 'number', defaultValue: 1000, min: 100, max: 50000, step: 100, prefix: '$', validation: [] },
    defaultYears
  ], 1.5, 'MRR', 'Features', 'User', 'SaaS', false),
  
  createBusinessSim('ecommerce-store', 'What If I Start E-commerce?', 'Dropshipping or private label.', [
    { name: 'newCustomers', label: `Sales Per Month`, type: 'slider', defaultValue: 50, min: 10, max: 1000, step: 10, validation: [] },
    { name: 'price', label: `Average Profit Per Sale`, type: 'number', defaultValue: 500, min: 50, max: 10000, step: 50, prefix: '$', validation: [] },
    defaultYears
  ], 1.2, 'Sales', 'Products', 'Sale', 'E-commerce', false),
  
  createBusinessSim('airbnb-hosting', 'What If I Host on Airbnb?', 'Real estate cash flow.', [
    { name: 'newCustomers', label: `Nights Booked Per Month`, type: 'slider', defaultValue: 15, min: 1, max: 30, step: 1, validation: [] },
    { name: 'price', label: `Profit Per Night`, type: 'number', defaultValue: 3000, min: 500, max: 20000, step: 500, prefix: '$', validation: [] },
    defaultYears
  ], 1.0, 'Nights', 'Nights Booked', 'Night', 'Airbnb Hosting', false),
  
  createBusinessSim('vending-machines', 'What If I Buy Vending Machines?', 'Passive income from hardware.', [
    { name: 'newCustomers', label: `Machines Placed`, type: 'slider', defaultValue: 2, min: 1, max: 50, step: 1, validation: [] },
    { name: 'price', label: `Monthly Profit Per Machine`, type: 'number', defaultValue: 5000, min: 1000, max: 20000, step: 500, prefix: '$', validation: [] },
    defaultYears
  ], 1.05, 'Sales', 'Machines Placed', 'Sale', 'Vending Machines', false),
];
