import { SimulatorConfig, InputField } from '@/types/simulator';

const createMoneySim = (
  slug: string,
  title: string,
  description: string,
  freq: number,
  inputs: any[],
  fixedRate?: number
): SimulatorConfig => {
  const engineConfig: any = { frequencyMultiplier: freq, isLumpSum: freq === 1 };
  
  return {
    slug,
    title,
    category: 'money',
    description,
    explanation: `Explore the compound growth of ${title.toLowerCase()}. Consistent investing is the key to building massive long-term wealth.`,
    inputs,
    engine: 'compound-growth',
    engineConfig,
    chartType: 'area',
    chartKeys: {
      xAxis: 'year',
      lines: [
        { key: 'invested', label: 'Amount Invested', color: '#9CA3AF' },
        { key: 'value', label: 'Total Value', color: '#16A34A' },
      ],
    },
    insights: [],
    faqs: [
      { question: 'Is the return guaranteed?', answer: fixedRate ? 'Yes, these are fixed rate or government-backed schemes.' : 'No. Equity markets fluctuate, but historically average out over long periods.' },
      { question: 'What about inflation?', answer: 'These numbers are nominal. To get real returns, subtract expected inflation (e.g., 6%) from your return rate.' },
    ],
    relatedSlugs: [],
  };
};

const defaultRateSlider = (defaultValue: number): InputField => ({
  name: 'rate', label: 'Expected Annual Return', type: 'slider', defaultValue, min: 1, max: 30, step: 1, suffixStr: '%', validation: []
});

const defaultYearsSlider = (defaultValue: number): InputField => ({
  name: 'years', label: 'Investment Period', type: 'slider', defaultValue, min: 1, max: 50, step: 1, suffixStr: ' years', validation: []
});

const defaultFixedRate = (rate: number) => ({
  name: 'rate', label: 'Fixed Annual Interest', type: 'slider', defaultValue: rate, min: rate, max: rate, step: 0.1, suffixStr: '%', validation: [] // Essentially locked
});

export const moneySimulators: SimulatorConfig[] = [
  createMoneySim('invest-10-daily', 'What If I Invest $10 Daily?', 'See how $10 every day grows into a massive corpus.', 365, [
    { name: 'dailyAmount', label: 'Daily Investment Amount', type: 'number', defaultValue: 10, min: 1, max: 1000, step: 5, prefix: '$', validation: [] },
    defaultRateSlider(12),
    defaultYearsSlider(15)
  ]),
  createMoneySim('invest-50-daily', 'What If I Invest $50 Daily?', 'Accelerate your wealth with a $50 daily investment.', 365, [
    { name: 'dailyAmount', label: 'Daily Investment Amount', type: 'number', defaultValue: 50, min: 5, max: 2000, step: 10, prefix: '$', validation: [] },
    defaultRateSlider(12),
    defaultYearsSlider(15)
  ]),
  createMoneySim('save-20-percent', 'What If I Save 20% of My Income?', 'The standard 50/30/20 rule in action.', 12, [
    { name: 'income', label: 'Monthly Income', type: 'number', defaultValue: 50000, min: 5000, max: 1000000, step: 5000, prefix: '$', validation: [] },
    { name: 'savingsRate', label: 'Savings Rate', type: 'slider', defaultValue: 20, min: 5, max: 80, step: 5, suffixStr: '%', validation: [] },
    defaultRateSlider(12),
    defaultYearsSlider(20)
  ]),
  createMoneySim('save-50-percent', 'What If I Save 50% of My Income?', 'Extreme savings for early retirement (FIRE).', 12, [
    { name: 'income', label: 'Monthly Income', type: 'number', defaultValue: 100000, min: 10000, max: 2000000, step: 10000, prefix: '$', validation: [] },
    { name: 'savingsRate', label: 'Savings Rate', type: 'slider', defaultValue: 50, min: 10, max: 90, step: 5, suffixStr: '%', validation: [] },
    defaultRateSlider(15),
    defaultYearsSlider(15)
  ]),
  createMoneySim('start-sip-at-20', 'What If I Start a SIP at Age 20?', 'The massive advantage of starting early.', 12, [
    { name: 'monthlySip', label: 'Monthly SIP Amount', type: 'number', defaultValue: 5000, min: 500, max: 100000, step: 500, prefix: '$', validation: [] },
    { name: 'currentAge', label: 'Starting Age', type: 'slider', defaultValue: 20, min: 15, max: 30, step: 1, suffixStr: ' years', validation: [] },
    { name: 'retireAge', label: 'Retirement Age', type: 'slider', defaultValue: 60, min: 40, max: 70, step: 1, suffixStr: ' years', validation: [] },
    defaultRateSlider(12)
  ]),

  createMoneySim('invest-lump-sum', 'What If I Invest a $10,000 Lump Sum?', 'Leaving money to grow untouched.', 1, [
    { name: 'lumpSumAmount', label: 'Lump Sum Investment', type: 'number', defaultValue: 1000000, min: 10000, max: 50000000, step: 10000, prefix: '$', validation: [] },
    defaultRateSlider(12),
    defaultYearsSlider(20)
  ]),
  createMoneySim('max-out-ppf', 'What If I Max Out My Roth IRA Yearly?', 'Safe, tax-free returns at $7,000 per year.', 1, [
    { name: 'lumpSumAmount', label: 'Yearly Roth IRA Contribution', type: 'number', defaultValue: 150000, min: 10000, max: 150000, step: 5000, prefix: '$', validation: [] },
    { name: 'rate', label: 'Fixed Roth IRA Rate', type: 'slider', defaultValue: 7.1, min: 7.1, max: 7.1, step: 0.1, suffixStr: '%', validation: [] },
    defaultYearsSlider(15)
  ], 7.1),
  createMoneySim('step-up-sip-10', 'What If I Increase SIP by 10% Yearly?', 'Combat inflation by stepping up investments.', 12, [
    { name: 'monthlySip', label: 'Initial Monthly SIP', type: 'number', defaultValue: 10000, min: 1000, max: 500000, step: 1000, prefix: '$', validation: [] },
    defaultRateSlider(12),
    defaultYearsSlider(20)
  ]),
  createMoneySim('invest-in-index', 'What If I Only Buy Index Funds?', 'Low cost, passive investing over decades.', 12, [
    { name: 'monthlySip', label: 'Monthly Investment', type: 'number', defaultValue: 20000, min: 1000, max: 1000000, step: 5000, prefix: '$', validation: [] },
    defaultRateSlider(12),
    defaultYearsSlider(25)
  ]),
  createMoneySim('delay-gratification', 'What If I Don\'t Buy That Car?', 'Investing the EMI amount instead.', 12, [
    { name: 'emiAmount', label: 'Monthly Car EMI Saved', type: 'number', defaultValue: 15000, min: 5000, max: 100000, step: 1000, prefix: '$', validation: [] },
    defaultRateSlider(12),
    defaultYearsSlider(7)
  ]),
  createMoneySim('child-education', 'What If I Invest for Child\'s Education?', 'Planning for college fees 15 years away.', 12, [
    { name: 'monthlySip', label: 'Monthly Investment', type: 'number', defaultValue: 10000, min: 1000, max: 200000, step: 1000, prefix: '$', validation: [] },
    { name: 'childAge', label: 'Current Age of Child', type: 'slider', defaultValue: 3, min: 0, max: 15, step: 1, suffixStr: ' years', validation: [] },
    { name: 'collegeAge', label: 'Target College Age', type: 'slider', defaultValue: 18, min: 16, max: 22, step: 1, suffixStr: ' years', validation: [] },
    defaultRateSlider(12)
  ]),
  createMoneySim('fire-number', 'What If I Want to Retire in 10 Years?', 'Aggressive accumulation for financial independence.', 12, [
    { name: 'monthlySip', label: 'Aggressive Monthly SIP', type: 'number', defaultValue: 100000, min: 10000, max: 1000000, step: 10000, prefix: '$', validation: [] },
    defaultRateSlider(12),
    defaultYearsSlider(10)
  ]),
  createMoneySim('coffee-money', 'What If I Invest My Daily Coffee Money?', '$200 a day instead of a latte.', 365, [
    { name: 'dailyAmount', label: 'Daily Coffee Cost', type: 'number', defaultValue: 200, min: 50, max: 1000, step: 10, prefix: '$', validation: [] },
    defaultRateSlider(12),
    defaultYearsSlider(20)
  ]),
  createMoneySim('bonus-investing', 'What If I Invest My Annual Bonus?', '$10,000 extra invested every single year.', 1, [
    { name: 'lumpSumAmount', label: 'Annual Bonus Invested', type: 'number', defaultValue: 200000, min: 50000, max: 5000000, step: 50000, prefix: '$', validation: [] },
    defaultRateSlider(12),
    defaultYearsSlider(15)
  ]),
  createMoneySim('15-15-15-rule', 'What If I Use the 15x15x15 Rule?', '$1,500 per month for 15 years at 15%.', 12, [
    { name: 'monthlySip', label: 'Monthly SIP', type: 'number', defaultValue: 15000, min: 5000, max: 100000, step: 1000, prefix: '$', validation: [] },
    defaultRateSlider(15),
    defaultYearsSlider(15)
  ]),
  createMoneySim('post-office-mis', 'What If I Use Post Office Bonds?', 'Monthly income scheme for safe returns.', 1, [
    { name: 'lumpSumAmount', label: 'Bonds Deposit Amount', type: 'number', defaultValue: 900000, min: 10000, max: 900000, step: 10000, prefix: '$', validation: [] },
    defaultFixedRate(7.4),
    defaultYearsSlider(5)
  ], 7.4),
  createMoneySim('gold-bonds', 'What If I Buy Sovereign Gold Bonds?', '2.5% extra interest on gold appreciation.', 1, [
    { name: 'lumpSumAmount', label: 'Initial Investment in Gold ETF', type: 'number', defaultValue: 50000, min: 10000, max: 5000000, step: 10000, prefix: '$', validation: [] },
    { name: 'rate', label: 'Gold Appreciation + 2.5%', type: 'slider', defaultValue: 10, min: 2.5, max: 20, step: 0.5, suffixStr: '%', validation: [] },
    defaultYearsSlider(8)
  ]),
  createMoneySim('rent-vs-buy', 'What If I Invest the Downpayment Instead?', 'Renting and investing the difference.', 1, [
    { name: 'lumpSumAmount', label: 'House Downpayment Saved', type: 'number', defaultValue: 2000000, min: 500000, max: 20000000, step: 100000, prefix: '$', validation: [] },
    defaultRateSlider(12),
    defaultYearsSlider(20)
  ]),
  createMoneySim('dividend-investing', 'What If I Reinvest All Dividends?', 'The power of dividend compounding.', 1, [
    { name: 'lumpSumAmount', label: 'Initial Portfolio Size', type: 'number', defaultValue: 50000, min: 10000, max: 10000000, step: 10000, prefix: '$', validation: [] },
    { name: 'rate', label: 'Dividend Yield + Growth', type: 'slider', defaultValue: 14, min: 5, max: 25, step: 1, suffixStr: '%', validation: [] },
    defaultYearsSlider(25)
  ]),
];
