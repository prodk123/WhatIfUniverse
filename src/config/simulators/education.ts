import { SimulatorConfig } from '@/types/simulator';

const createEducationSim = (
  slug: string,
  title: string,
  desc: string,
  inputs: any[],
  defaultCurrencyCode?: string,
  notice?: string
): SimulatorConfig => ({
  slug,
  title,
  category: 'education',
  description: desc,
  explanation: `Calculate the ROI of ${title.toLowerCase()}. It factors in tuition costs, loan interest, and opportunity cost (lost salary) against your new expected earnings.`,
  inputs,
  engine: 'roi-calculator',
  engineConfig: {},
  defaultCurrencyCode,
  notice,
  chartType: 'area',
  chartKeys: {
    xAxis: 'year',
    lines: [
      { key: 'noDegreeWealth', label: 'Wealth Without Degree', color: '#9CA3AF' },
      { key: 'degreeWealth', label: 'Wealth With Degree', color: '#9333EA' },
    ],
  },
  insights: [],
  faqs: [
    { question: 'What is opportunity cost?', answer: 'It is the salary you miss out on while you are studying. This simulator adds it to your total cost.' },
    { question: 'How is student loan interest calculated?', answer: 'Interest compounds annually on your total negative wealth (tuition + living expenses) until your higher salary allows you to pay it off.' },
  ],
  relatedSlugs: [],
});

const defaultExpectedSalary = { name: 'expectedSalaryWithoutDegree', label: 'Current / Expected Salary Without Degree (per year)', type: 'number', defaultValue: 600000, min: 0, max: 5000000, step: 50000, prefix: '₹', validation: [] };
const defaultYears = { name: 'years', label: 'Years to Project', type: 'slider', defaultValue: 15, min: 5, max: 30, step: 1, suffixStr: ' years', validation: [] };
const defaultLoanRate = { name: 'loanInterestRate', label: 'Student Loan Interest Rate', type: 'slider', defaultValue: 8, min: 0, max: 20, step: 0.5, suffixStr: '%', validation: [] };

export const educationSimulators: SimulatorConfig[] = [
  createEducationSim('masters-in-usa', 'What If I Do My Master\'s in USA?', 'ROI of a 2-year Master\'s program in the USA.', [
    { name: 'expectedSalaryWithoutDegree', label: 'Current Salary in Home Country', type: 'number', defaultValue: 10000, min: 0, max: 50000, step: 1000, prefix: '$', validation: [] },
    { name: 'tuitionCost', label: 'Total US Degree Cost (Tuition + Living)', type: 'number', defaultValue: 80000, min: 20000, max: 200000, step: 5000, prefix: '$', validation: [] },
    { name: 'studyYears', label: 'Duration of US Degree', type: 'slider', defaultValue: 2, min: 1, max: 5, step: 0.5, suffixStr: ' years', validation: [] },
    { name: 'postGradSalary', label: 'Expected US Tech Salary (per year)', type: 'number', defaultValue: 100000, min: 50000, max: 300000, step: 5000, prefix: '$', validation: [] },
    defaultLoanRate,
    defaultYears
  ], 'USD', 'Implemented currency conversion factor between home country (India) and target country (USA). All calculations are based on 1 USD = 83 RS (2026).'),
  
  createEducationSim('pursue-masters-degree', 'What If I Pursue a Master\'s Degree?', 'ROI of a standard 2-year Master\'s program.', [
    defaultExpectedSalary,
    { name: 'tuitionCost', label: 'Total Degree Cost', type: 'number', defaultValue: 1500000, min: 100000, max: 10000000, step: 100000, prefix: '₹', validation: [] },
    { name: 'studyYears', label: 'Duration of Degree', type: 'slider', defaultValue: 2, min: 1, max: 5, step: 0.5, suffixStr: ' years', validation: [] },
    { name: 'postGradSalary', label: 'Expected Salary After Graduating', type: 'number', defaultValue: 1200000, min: 300000, max: 10000000, step: 100000, prefix: '₹', validation: [] },
    defaultLoanRate,
    defaultYears
  ]),
  
  createEducationSim('get-mba', 'What If I Get an MBA?', 'High upfront cost for high management salary.', [
    defaultExpectedSalary,
    { name: 'tuitionCost', label: 'MBA Tuition & Living Cost', type: 'number', defaultValue: 2500000, min: 500000, max: 10000000, step: 100000, prefix: '₹', validation: [] },
    { name: 'studyYears', label: 'Duration of MBA', type: 'slider', defaultValue: 2, min: 1, max: 3, step: 0.5, suffixStr: ' years', validation: [] },
    { name: 'postGradSalary', label: 'Expected Post-MBA Salary', type: 'number', defaultValue: 2500000, min: 500000, max: 10000000, step: 100000, prefix: '₹', validation: [] },
    defaultLoanRate,
    defaultYears
  ]),
  
  createEducationSim('medical-school', 'What If I Go to Medical School?', 'Long study period but high eventual payoff.', [
    defaultExpectedSalary,
    { name: 'tuitionCost', label: 'Medical School Total Cost', type: 'number', defaultValue: 5000000, min: 1000000, max: 20000000, step: 500000, prefix: '₹', validation: [] },
    { name: 'studyYears', label: 'Duration (MBBS + Residency)', type: 'slider', defaultValue: 6, min: 4, max: 10, step: 1, suffixStr: ' years', validation: [] },
    { name: 'postGradSalary', label: 'Expected Doctor Salary', type: 'number', defaultValue: 3000000, min: 500000, max: 20000000, step: 100000, prefix: '₹', validation: [] },
    defaultLoanRate,
    { name: 'years', label: 'Years to Project', type: 'slider', defaultValue: 25, min: 10, max: 40, step: 1, suffixStr: ' years', validation: [] }
  ]),
  
  createEducationSim('law-school', 'What If I Go to Law School?', '3 years of law school ROI.', [
    defaultExpectedSalary,
    { name: 'tuitionCost', label: 'Law School Total Cost', type: 'number', defaultValue: 1500000, min: 500000, max: 10000000, step: 100000, prefix: '₹', validation: [] },
    { name: 'studyYears', label: 'Duration of Law School', type: 'slider', defaultValue: 3, min: 2, max: 5, step: 0.5, suffixStr: ' years', validation: [] },
    { name: 'postGradSalary', label: 'Expected Lawyer Salary', type: 'number', defaultValue: 1500000, min: 400000, max: 10000000, step: 100000, prefix: '₹', validation: [] },
    defaultLoanRate,
    defaultYears
  ]),
  
  createEducationSim('cfa-certification', 'What If I Get a CFA?', 'Studying while working (no opportunity cost).', [
    defaultExpectedSalary,
    { name: 'tuitionCost', label: 'Total CFA Exam & Prep Cost', type: 'number', defaultValue: 300000, min: 50000, max: 1000000, step: 10000, prefix: '₹', validation: [] },
    { name: 'studyYears', label: 'Opportunity Cost Years', type: 'slider', defaultValue: 0, min: 0, max: 0, step: 1, suffixStr: ' years', validation: [] }, // Locked at 0
    { name: 'postGradSalary', label: 'Expected Salary After CFA', type: 'number', defaultValue: 1200000, min: 500000, max: 10000000, step: 100000, prefix: '₹', validation: [] },
    defaultYears
  ]),
  
  createEducationSim('executive-mba', 'What If I Do an Executive MBA?', 'Expensive but done while working (low opportunity cost).', [
    { name: 'expectedSalaryWithoutDegree', label: 'Current Salary', type: 'number', defaultValue: 2000000, min: 500000, max: 10000000, step: 100000, prefix: '₹', validation: [] },
    { name: 'tuitionCost', label: 'Executive MBA Cost', type: 'number', defaultValue: 3000000, min: 500000, max: 10000000, step: 100000, prefix: '₹', validation: [] },
    { name: 'studyYears', label: 'Opportunity Cost Years', type: 'slider', defaultValue: 0, min: 0, max: 2, step: 0.5, suffixStr: ' years', validation: [] },
    { name: 'postGradSalary', label: 'Expected Salary Post-EMBA', type: 'number', defaultValue: 3500000, min: 1000000, max: 20000000, step: 100000, prefix: '₹', validation: [] },
    defaultLoanRate,
    defaultYears
  ]),
  
  {
    slug: 'drop-out',
    title: 'What If I Drop Out of College?',
    category: 'education',
    description: 'Compare dropping out vs finishing your degree.',
    explanation: 'See how starting work earlier at a lower salary compares to finishing your degree and starting with a higher salary later.',
    inputs: [
      { name: 'expectedSalaryWithoutDegree', label: 'Expected Salary After Dropping Out (per year)', type: 'number', defaultValue: 300000, min: 0, max: 5000000, step: 50000, prefix: '₹', validation: [] },
      { name: 'tuitionCost', label: 'Tuition & Living Costs Saved by Dropping Out', type: 'number', defaultValue: 500000, min: 0, max: 10000000, step: 100000, prefix: '₹', validation: [] },
      { name: 'studyYears', label: 'Years of College Remaining (Skipped)', type: 'slider', defaultValue: 2, min: 0, max: 10, step: 0.5, suffixStr: ' years', validation: [] },
      { name: 'postGradSalary', label: 'Expected Salary If You Finished the Degree (per year)', type: 'number', defaultValue: 800000, min: 0, max: 10000000, step: 100000, prefix: '₹', validation: [] },
      defaultYears
    ],
    engine: 'roi-calculator',
    engineConfig: {},
    chartType: 'area',
    chartKeys: {
      xAxis: 'year',
      lines: [
        { key: 'noDegreeWealth', label: 'Wealth by Dropping Out', color: '#9CA3AF' },
        { key: 'degreeWealth', label: 'Wealth by Finishing Degree', color: '#9333EA' },
      ],
    },
    insights: [],
    faqs: [{ question: 'What is opportunity cost?', answer: 'It is the salary you miss out on while you are studying. This simulator adds it to your total cost.' }],
    relatedSlugs: [],
  },
  
  {
    slug: 'online-degree',
    title: 'What If I Do an Online Degree?',
    category: 'education',
    description: 'Cheaper than on-campus with similar outcomes.',
    explanation: 'See how earning a degree online while continuing to work compares against not getting a degree at all.',
    inputs: [
      defaultExpectedSalary,
      { name: 'tuitionCost', label: 'Cost of Online Degree', type: 'number', defaultValue: 300000, min: 0, max: 10000000, step: 100000, prefix: '₹', validation: [] },
      { name: 'studyYears', label: 'Opportunity Cost (Years taken off work)', type: 'slider', defaultValue: 0, min: 0, max: 10, step: 0.5, suffixStr: ' years', validation: [] },
      { name: 'postGradSalary', label: 'Expected Salary After Online Degree', type: 'number', defaultValue: 800000, min: 0, max: 10000000, step: 100000, prefix: '₹', validation: [] },
      defaultLoanRate,
      defaultYears
    ],
    engine: 'roi-calculator',
    engineConfig: {},
    chartType: 'area',
    chartKeys: {
      xAxis: 'year',
      lines: [
        { key: 'noDegreeWealth', label: 'Wealth Without Online Degree', color: '#9CA3AF' },
        { key: 'degreeWealth', label: 'Wealth With Online Degree', color: '#9333EA' },
      ],
    },
    insights: [],
    faqs: [{ question: 'What is opportunity cost?', answer: 'For online degrees done while working, opportunity cost is usually 0.' }],
    relatedSlugs: [],
  },
];
