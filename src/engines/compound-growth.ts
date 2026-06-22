import { EngineFunction } from '@/types/engine';

/**
 * Compound Growth Engine
 * Used for: investment, SIP, savings growth simulators
 *
 * Inputs: amount, rate, years, frequency (1=daily, 12=monthly, 1=yearly)
 * Config: frequencyMultiplier (how many times per year the amount is invested)
 */
export const compoundGrowthEngine: EngineFunction = (inputs, config) => {
  const curr = (config.currency as any) || { symbol: '₹', locale: 'en-IN' };
  
  // Dynamic Amount Calculation
  let amount = inputs.amount || 0;
  if (inputs.income !== undefined && inputs.savingsRate !== undefined) {
    amount = inputs.income * (inputs.savingsRate / 100);
  } else if (inputs.dailyAmount !== undefined) {
    amount = inputs.dailyAmount;
  } else if (inputs.emiAmount !== undefined) {
    amount = inputs.emiAmount;
  } else if (inputs.lumpSumAmount !== undefined) {
    amount = inputs.lumpSumAmount;
  } else if (inputs.monthlySip !== undefined) {
    amount = inputs.monthlySip;
  }

  // Dynamic Years Calculation
  let years = inputs.years || 10;
  if (inputs.currentAge !== undefined && inputs.retireAge !== undefined) {
    years = Math.max(1, inputs.retireAge - inputs.currentAge);
  } else if (inputs.childAge !== undefined && inputs.collegeAge !== undefined) {
    years = Math.max(1, inputs.collegeAge - inputs.childAge);
  }

  const annualRate = (inputs.rate !== undefined ? inputs.rate : 12) / 100;
  const frequencyMultiplier = (config.frequencyMultiplier as number) || 12;

  const monthlyRate = annualRate / 12;
  const totalMonths = years * 12;
  const isLumpSum = config.isLumpSum === true;
  const periodicAmount = isLumpSum ? 0 : (amount * frequencyMultiplier) / 12;

  const chartData = [];
  const milestones = [];
  let currentValue = isLumpSum ? amount : 0;
  const milestoneTargets = [100000, 500000, 1000000, 5000000, 10000000, 50000000];
  const milestonesCrossed = new Set<number>();

  for (let month = 0; month <= totalMonths; month++) {
    if (month > 0) {
      currentValue = (currentValue + periodicAmount) * (1 + monthlyRate);
    }

    if (month % 12 === 0) {
      const year = month / 12;
      const totalInvested = isLumpSum ? amount : periodicAmount * month;
      chartData.push({
        year,
        invested: Math.round(totalInvested),
        value: Math.round(currentValue),
        growth: Math.round(currentValue - totalInvested),
      });

      for (const target of milestoneTargets) {
        if (currentValue >= target && !milestonesCrossed.has(target)) {
          milestonesCrossed.add(target);
          milestones.push({
            year,
            label: `Portfolio crosses ${curr.symbol}${formatCompact(target)}`,
            value: target,
          });
        }
      }
    }
  }

  const totalInvested = isLumpSum ? amount : periodicAmount * totalMonths;
  const finalValue = currentValue;
  const totalReturns = finalValue - totalInvested;
  const wealthMultiplier = totalInvested > 0 ? finalValue / totalInvested : 0;

  return {
    summary: {
      totalInvested: {
        label: 'Total Invested',
        value: `${curr.symbol}${Math.round(totalInvested).toLocaleString(curr.locale)}`,
      },
      finalValue: {
        label: 'Final Value',
        value: `${curr.symbol}${Math.round(finalValue).toLocaleString(curr.locale)}`,
        highlight: true,
      },
      totalReturns: {
        label: 'Total Returns',
        value: `${curr.symbol}${Math.round(totalReturns).toLocaleString(curr.locale)}`,
      },
      wealthMultiplier: {
        label: 'Wealth Multiplier',
        value: `${wealthMultiplier.toFixed(1)}x`,
      },
    },
    chartData,
    milestones,
    insights: generateGrowthInsights(totalInvested, finalValue, years, annualRate, curr),
  };
};

function generateGrowthInsights(
  invested: number,
  finalValue: number,
  years: number,
  rate: number,
  curr: any
): string[] {
  const insights: string[] = [];
  const returns = finalValue - invested;
  const returnsPercent = invested > 0 ? (returns / invested) * 100 : 0;

  insights.push(
    `Your money would grow ${(finalValue / invested).toFixed(1)}x over ${years} years at ${(rate * 100).toFixed(0)}% annual returns.`
  );

  if (returns > invested) {
    insights.push(
      `Your returns (${curr.symbol}${Math.round(returns).toLocaleString(curr.locale)}) would exceed your total investment — the power of compounding.`
    );
  }

  if (years >= 10) {
    insights.push(
      'Starting early is the single most powerful advantage in investing. Every year of delay significantly reduces your final corpus.'
    );
  }

  if (returnsPercent > 200) {
    insights.push(
      'With long-term compounding, most of your wealth is generated in the last few years. Patience is key.'
    );
  }

  return insights;
}

function formatIndian(num: number): string {
  const str = num.toString();
  const lastThree = str.slice(-3);
  const otherNumbers = str.slice(0, -3);
  if (otherNumbers !== '') {
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
  }
  return lastThree;
}

function formatCompact(num: number): string {
  if (num >= 10000000) return `${(num / 10000000).toFixed(0)} Cr`;
  if (num >= 100000) return `${(num / 100000).toFixed(0)} Lakh`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toString();
}
