import { EngineFunction } from '@/types/engine';

/**
 * Salary Comparison Engine
 * Used for: relocation, job switch, salary negotiation simulators
 *
 * Inputs: currentSalary, newSalary, currentExpenses, newExpenses, years
 * Config: costOfLivingMultiplier, taxRateCurrent, taxRateNew
 */
export const salaryComparisonEngine: EngineFunction = (inputs, config) => {
  const curr = (config.currency as any) || { symbol: '₹', locale: 'en-IN' };
  let currentSalary = inputs.currentSalary || 0;
  let newSalary = inputs.newSalary !== undefined ? inputs.newSalary : 0;
  let currentExpenses = inputs.currentExpenses || 0;
  let newExpenses = inputs.newExpenses !== undefined ? inputs.newExpenses : currentExpenses;
  
  if (inputs.raisePercent !== undefined) {
    newSalary = currentSalary * (1 + inputs.raisePercent / 100);
  }
  
  const bootcampCost = inputs.bootcampCost || 0;

  const years = inputs.years || 5;
  const annualRaise = (inputs.annualRaise || 5) / 100;

  const taxRateCurrent = ((config.taxRateCurrent as number) || 30) / 100;
  const taxRateNew = ((config.taxRateNew as number) || 0) / 100;

  const chartData = [];
  let currentTotalSavings = 0;
  let newTotalSavings = -bootcampCost; // Deduct bootcamp cost upfront if any
  let currentYearlySalary = currentSalary * 12;
  let newYearlySalary = newSalary * 12;
  const milestones = [];
  let breakEvenYear = -1;

  for (let year = 0; year <= years; year++) {
    if (year > 0) {
      const currentAfterTax = currentYearlySalary * (1 - taxRateCurrent);
      const newAfterTax = newYearlySalary * (1 - taxRateNew);
      const currentSaved = currentAfterTax - currentExpenses * 12;
      const newSaved = newAfterTax - newExpenses * 12;

      currentTotalSavings += Math.max(0, currentSaved);
      newTotalSavings += Math.max(0, newSaved);

      currentYearlySalary *= 1 + annualRaise;
      newYearlySalary *= 1 + annualRaise;
    }

    chartData.push({
      year,
      currentSavings: Math.round(currentTotalSavings),
      newSavings: Math.round(newTotalSavings),
    });

    if (breakEvenYear === -1 && newTotalSavings > currentTotalSavings && year > 0) {
      breakEvenYear = year;
      milestones.push({
        year,
        label: 'New option overtakes current savings',
        value: Math.round(newTotalSavings),
      });
    }
  }

  const savingsDifference = newTotalSavings - currentTotalSavings;
  const monthlyCurrentNet =
    (currentSalary * (1 - taxRateCurrent) - currentExpenses);
  const monthlyNewNet = (newSalary * (1 - taxRateNew) - newExpenses);

  return {
    summary: {
      currentNet: {
        label: 'Current Net/Month',
        value: `${curr.symbol}${Math.round(monthlyCurrentNet).toLocaleString(curr.locale)}`,
      },
      newNet: {
        label: 'New Net/Month',
        value: `${curr.symbol}${Math.round(monthlyNewNet).toLocaleString(curr.locale)}`,
        highlight: monthlyNewNet > monthlyCurrentNet,
      },
      difference: {
        label: 'Monthly Savings Diff',
        value: `${savingsDifference >= 0 ? '+' : ''}${curr.symbol}${Math.abs(Math.round(savingsDifference)).toLocaleString(curr.locale)}`,
        highlight: true,
      },
      breakEven: {
        label: 'Break-Even Point',
        value: breakEvenYear > 0 ? `Year ${breakEvenYear}` : 'N/A',
      },
    },
    chartData,
    milestones,
    insights: generateComparisonInsights(
      monthlyCurrentNet,
      monthlyNewNet,
      savingsDifference,
      years,
      breakEvenYear,
      curr
    ),
  };
};

function generateComparisonInsights(
  currentNet: number,
  newNet: number,
  totalDiff: number,
  years: number,
  breakEvenYear: number,
  curr: any
): string[] {
  const insights: string[] = [];

  if (newNet > currentNet) {
    insights.push(
      `You would save ${curr.symbol}${Math.round((newNet - currentNet) * 12).toLocaleString(curr.locale)} more per year with the new option.`
    );
  } else if (currentNet > newNet) {
    insights.push(
      `The current option saves ${curr.symbol}${Math.round((currentNet - newNet) * 12).toLocaleString(curr.locale)} more per year. Consider non-financial benefits before deciding.`
    );
  }

  if (breakEvenYear > 0) {
    insights.push(
      `The new option breaks even after ${breakEvenYear} year${breakEvenYear > 1 ? 's' : ''}. After that, you accumulate wealth faster.`
    );
  }

  if (totalDiff > 0) {
    insights.push(
      `Over ${years} years, the new option could put an additional ${curr.symbol}${Math.round(totalDiff).toLocaleString(curr.locale)} in your pocket.`
    );
  }

  insights.push(
    'Remember to factor in relocation costs, quality of life, family considerations, and career growth opportunities.'
  );

  return insights;
}

function formatNum(num: number): string {
  const absNum = Math.abs(num);
  const str = absNum.toString();
  const lastThree = str.slice(-3);
  const otherNumbers = str.slice(0, -3);
  const formatted =
    otherNumbers !== ''
      ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree
      : lastThree;
  return num < 0 ? `-${formatted}` : formatted;
}
