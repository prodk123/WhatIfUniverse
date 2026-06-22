import { SimulatorConfig } from '@/types/simulator';

const createCareerSim = (
  slug: string,
  title: string,
  desc: string,
  inputs: any[],
  taxRateNew: number,
  defaultCurrencyCode?: string,
  notice?: string
): SimulatorConfig => ({
  slug,
  title,
  category: 'career',
  description: desc,
  explanation: `Compare your current trajectory with ${title.toLowerCase()}. It factors in salary, expenses, and taxes to show your true savings difference over time.`,
  inputs,
  engine: 'salary-comparison',
  engineConfig: { taxRateCurrent: 25, taxRateNew },
  defaultCurrencyCode,
  notice,
  chartType: 'area',
  chartKeys: {
    xAxis: 'year',
    lines: [
      { key: 'currentSavings', label: 'Current Path Savings', color: '#9CA3AF' },
      { key: 'newSavings', label: 'New Path Savings', color: '#2563EB' },
    ],
  },
  insights: [],
  faqs: [
    { question: 'Are these numbers exact?', answer: 'No, they are approximations based on flat tax rates and estimated expenses. Your actual take-home pay will depend on precise tax brackets.' },
  ],
  relatedSlugs: [],
});

const defaultCurrentSalary = { name: 'currentSalary', label: 'Current Monthly Salary', type: 'number', defaultValue: 100000, min: 20000, max: 1000000, step: 10000, prefix: '₹', validation: [] };
const defaultCurrentExpenses = { name: 'currentExpenses', label: 'Current Monthly Expenses', type: 'number', defaultValue: 40000, min: 10000, max: 500000, step: 5000, prefix: '₹', validation: [] };
const defaultYears = { name: 'years', label: 'Years to Project', type: 'slider', defaultValue: 5, min: 1, max: 20, step: 1, suffixStr: ' years', validation: [] };

export const careerSimulators: SimulatorConfig[] = [
  createCareerSim('move-to-dubai', 'What If I Move to Dubai?', 'Tax-free salary vs higher cost of living. Compare your home country lifestyle with Dubai.', [
    defaultCurrentSalary,
    defaultCurrentExpenses,
    { name: 'newSalary', label: 'Expected Dubai Salary (Monthly)', type: 'number', defaultValue: 20000, min: 5000, max: 100000, step: 1000, prefix: 'AED ', validation: [] },
    { name: 'newExpenses', label: 'Estimated Dubai Expenses (Monthly)', type: 'number', defaultValue: 8000, min: 2000, max: 50000, step: 1000, prefix: 'AED ', validation: [] },
    defaultYears
  ], 0, 'AED', 'Implemented currency conversion factor between home country (India) and target country (Dubai). All calculations are based on 1 AED = 26 RS (2026).'),
  
  createCareerSim('move-to-usa', 'What If I Move to the USA?', 'High tech salary vs high taxes and rent.', [
    defaultCurrentSalary,
    defaultCurrentExpenses,
    { name: 'newSalary', label: 'Expected US Salary (Monthly)', type: 'number', defaultValue: 10000, min: 3000, max: 50000, step: 500, prefix: '$', validation: [] },
    { name: 'newExpenses', label: 'Estimated US Expenses (Monthly)', type: 'number', defaultValue: 4000, min: 1500, max: 20000, step: 500, prefix: '$', validation: [] },
    defaultYears
  ], 35, 'USD', 'Implemented currency conversion factor between home country (India) and target country (USA). All calculations are based on 1 USD = 83 RS (2026).'),
  
  createCareerSim('switch-to-tech', 'What If I Switch to Tech?', 'Higher starting salary after a bootcamp.', [
    defaultCurrentSalary,
    defaultCurrentExpenses,
    { name: 'bootcampCost', label: 'Bootcamp / Upskilling Cost', type: 'number', defaultValue: 100000, min: 0, max: 1000000, step: 10000, prefix: '₹', validation: [] },
    { name: 'newSalary', label: 'Expected Tech Salary (Monthly)', type: 'number', defaultValue: 150000, min: 50000, max: 1000000, step: 10000, prefix: '₹', validation: [] },
    defaultYears
  ], 20),
  
  createCareerSim('negotiate-salary', 'What If I Negotiate a Raise?', 'The long-term impact of asking for more.', [
    defaultCurrentSalary,
    defaultCurrentExpenses,
    { name: 'raisePercent', label: 'Expected Raise', type: 'slider', defaultValue: 20, min: 5, max: 100, step: 5, suffixStr: '%', validation: [] },
    defaultYears
  ], 25),
  
  createCareerSim('freelance-fulltime', 'What If I Go Freelance?', 'Variable income vs fixed salary.', [
    defaultCurrentSalary,
    defaultCurrentExpenses,
    { name: 'newSalary', label: 'Expected Freelance Income (Monthly)', type: 'number', defaultValue: 200000, min: 50000, max: 2000000, step: 10000, prefix: '₹', validation: [] },
    { name: 'newExpenses', label: 'Freelance Expenses (Software, Taxes)', type: 'number', defaultValue: 20000, min: 5000, max: 200000, step: 5000, prefix: '₹', validation: [] },
    defaultYears
  ], 20),
  
  createCareerSim('join-early-startup', 'What If I Join an Early Stage Startup?', 'Lower base salary but equity potential (equity not factored here).', [
    defaultCurrentSalary,
    defaultCurrentExpenses,
    { name: 'newSalary', label: 'Startup Base Salary (Monthly)', type: 'number', defaultValue: 80000, min: 20000, max: 500000, step: 5000, prefix: '₹', validation: [] },
    defaultYears
  ], 25),
  
  createCareerSim('remote-work', 'What If I Work Remotely?', 'Same salary, but moving to a low-cost city.', [
    defaultCurrentSalary,
    defaultCurrentExpenses,
    { name: 'newExpenses', label: 'Remote City Expenses (Monthly)', type: 'number', defaultValue: 20000, min: 10000, max: 200000, step: 5000, prefix: '₹', validation: [] },
    defaultYears
  ], 25),
  
  createCareerSim('moonlighting', 'What If I Take a Second Job?', 'Extra income vs burnout.', [
    defaultCurrentSalary,
    defaultCurrentExpenses,
    { name: 'newSalary', label: 'Total Combined Income (Monthly)', type: 'number', defaultValue: 180000, min: 50000, max: 1000000, step: 10000, prefix: '₹', validation: [] },
    defaultYears
  ], 30),
  
  createCareerSim('digital-nomad', 'What If I Become a Digital Nomad?', 'Earning in USD, spending in low cost countries.', [
    defaultCurrentSalary,
    defaultCurrentExpenses,
    { name: 'newSalary', label: 'Nomad Income (Monthly)', type: 'number', defaultValue: 300000, min: 50000, max: 1000000, step: 10000, prefix: '₹', validation: [] },
    { name: 'newExpenses', label: 'Nomad Lifestyle Expenses (Monthly)', type: 'number', defaultValue: 150000, min: 30000, max: 500000, step: 10000, prefix: '₹', validation: [] },
    defaultYears
  ], 20),
];
