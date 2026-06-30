import { EngineFunction } from '@/types/engine';

/**
 * Salary Comparison Engine
 * Used for: relocation, job switch, salary negotiation simulators
 *
 * Inputs: currentSalary, newSalary, currentExpenses, newExpenses, years
 * Config: costOfLivingMultiplier, taxRateCurrent, taxRateNew
 */
export const salaryComparisonEngine: EngineFunction = (inputs, config) => {
  const curr = (config.currency as { symbol: string; locale: string }) || { symbol: '₹', locale: 'en-IN' };
  const currentSalary = Math.max(0, Number(inputs.currentSalary) || 0);
  let newSalary = inputs.newSalary !== undefined ? Math.max(0, Number(inputs.newSalary)) : 0;
  const currentExpenses = Math.max(0, Number(inputs.currentExpenses) || 0);
  const newExpenses = inputs.newExpenses !== undefined ? Math.max(0, Number(inputs.newExpenses)) : currentExpenses;
  
  if (inputs.raisePercent !== undefined) {
    newSalary = currentSalary * (1 + Math.max(0, Number(inputs.raisePercent)) / 100);
  }
  
  const bootcampCost = Math.max(0, Number(inputs.bootcampCost) || 0);

  const years = Math.max(1, Number(inputs.years) || 5);
  const annualRaise = Math.max(0, Number(inputs.annualRaise) || 5) / 100;

  const taxRateCurrent = inputs.taxRateCurrent !== undefined ? Math.min(100, Math.max(0, Number(inputs.taxRateCurrent))) / 100 : Math.min(100, Math.max(0, Number(config.taxRateCurrent) || 30)) / 100;
  const taxRateNew = inputs.taxRateNew !== undefined ? Math.min(100, Math.max(0, Number(inputs.taxRateNew))) / 100 : Math.min(100, Math.max(0, Number(config.taxRateNew) || 0)) / 100;

  const chartData = [];
  let currentTotalSavings = 0;
  let newTotalSavings = -bootcampCost; // Deduct bootcamp cost upfront if any
  let currentMonthlySalary = currentSalary;
  let newMonthlySalary = newSalary;
  const milestones = [];
  let breakEvenMonth = -1;

  chartData.push({
    year: 0,
    currentSavings: 0,
    newSavings: Math.round(newTotalSavings),
  });

  for (let month = 1; month <= years * 12; month++) {
    const currentAfterTax = currentMonthlySalary * (1 - taxRateCurrent);
    const newAfterTax = newMonthlySalary * (1 - taxRateNew);
    const currentSaved = currentAfterTax - currentExpenses;
    const newSaved = newAfterTax - newExpenses;

    currentTotalSavings += Math.max(0, currentSaved);
    newTotalSavings += Math.max(0, newSaved);

    if (month % 12 === 0) {
      chartData.push({
        year: month / 12,
        currentSavings: Math.round(currentTotalSavings),
        newSavings: Math.round(newTotalSavings),
      });
      // Apply annual raise at the end of the year
      currentMonthlySalary *= 1 + annualRaise;
      newMonthlySalary *= 1 + annualRaise;
    }

    if (breakEvenMonth === -1 && newTotalSavings > currentTotalSavings) {
      breakEvenMonth = month;
      milestones.push({
        year: month / 12,
        label: 'New option overtakes current savings',
        value: Math.round(newTotalSavings),
      });
    }
  }

  const savingsDifference = newTotalSavings - currentTotalSavings;
  const monthlyCurrentNet = (currentSalary * (1 - taxRateCurrent) - currentExpenses);
  const monthlyNewNet = (newSalary * (1 - taxRateNew) - newExpenses);

  let breakEvenText = 'N/A';
  if (breakEvenMonth > 0) {
    if (breakEvenMonth < 12) {
      breakEvenText = `${breakEvenMonth} months`;
    } else {
      const bYears = Math.floor(breakEvenMonth / 12);
      const bMonths = breakEvenMonth % 12;
      breakEvenText = `${bYears} year${bYears > 1 ? 's' : ''}${bMonths > 0 ? ` ${bMonths} month${bMonths > 1 ? 's' : ''}` : ''}`;
    }
  }

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
        label: `Total Savings Diff (${years}y)`,
        value: `${savingsDifference >= 0 ? '+' : ''}${curr.symbol}${Math.abs(Math.round(savingsDifference)).toLocaleString(curr.locale)}`,
        highlight: true,
      },
      breakEven: {
        label: 'Break-Even Point',
        value: breakEvenText,
      },
    },
    chartData,
    milestones,
    insights: generateComparisonInsights(
      monthlyCurrentNet,
      monthlyNewNet,
      savingsDifference,
      years,
      breakEvenMonth,
      curr
    ),
  };
};

function generateComparisonInsights(
  currentNet: number,
  newNet: number,
  totalDiff: number,
  years: number,
  breakEvenMonth: number,
  curr: { symbol: string; locale: string }
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

  if (breakEvenMonth > 0) {
    if (breakEvenMonth < 12) {
      insights.push(`The new option breaks even in just ${breakEvenMonth} months. After that, you accumulate wealth faster.`);
    } else {
      const bYears = Math.floor(breakEvenMonth / 12);
      insights.push(`The new option breaks even after ${bYears} year${bYears > 1 ? 's' : ''}. After that, you accumulate wealth faster.`);
    }
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

