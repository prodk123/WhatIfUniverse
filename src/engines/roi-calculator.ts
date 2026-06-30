import { EngineFunction } from '@/types/engine';

export const roiCalculatorEngine: EngineFunction = (inputs, config) => {
  const curr = (config.currency as { symbol: string; locale: string }) || { symbol: '₹', locale: 'en-IN' };
  const expectedSalaryWithoutDegree = Math.max(0, Number(inputs.expectedSalaryWithoutDegree) || 0);
  const tuitionCost = Math.max(0, Number(inputs.tuitionCost) || 0);
  const postGradSalary = Math.max(0, Number(inputs.postGradSalary) || 0);
  const partTimeSalary = Math.max(0, Number(inputs.partTimeSalary) || 0);
  const years = Math.max(1, Number(inputs.years) || 10);
  
  const studyYears = Math.max(0.1, Number(inputs.studyYears) || Number(config.studyYears) || 2);
  const salaryGrowth = 0.05; // 5% annual raise
  const loanInterestRate = Math.max(0, Number(inputs.loanInterestRate) || 0) / 100;
  
  const chartData = [];
  const milestones = [];
  
  let currentWealthNoDegree = 0;
  let currentWealthWithDegree = -tuitionCost; // Start in debt for the degree
  let currentSalaryNoDegree = expectedSalaryWithoutDegree;
  let currentSalaryWithDegree = postGradSalary;
  
  let breakEvenYear = -1;

  for (let year = 0; year <= years; year++) {
    chartData.push({
      year,
      noDegreeWealth: Math.round(currentWealthNoDegree),
      degreeWealth: Math.round(currentWealthWithDegree),
    });

    if (breakEvenYear === -1 && currentWealthWithDegree > currentWealthNoDegree && year > studyYears) {
      breakEvenYear = year;
      milestones.push({
        year,
        label: 'Break-even point reached',
        value: Math.round(currentWealthWithDegree),
      });
    }

    // Advance to next year
    currentWealthNoDegree += currentSalaryNoDegree;
    currentSalaryNoDegree *= (1 + salaryGrowth);
    
    if (year >= studyYears) {
      currentWealthWithDegree += currentSalaryWithDegree;
      currentSalaryWithDegree *= (1 + salaryGrowth);
    } else {
      currentWealthWithDegree += partTimeSalary;
    }

    if (currentWealthWithDegree < 0 && loanInterestRate > 0) {
      currentWealthWithDegree -= Math.abs(currentWealthWithDegree) * loanInterestRate;
    }
  }

  const finalDiff = currentWealthWithDegree - currentWealthNoDegree;

  return {
    summary: {
      totalCost: {
        label: 'Total Investment (Tuition + Lost Salary)',
        value: `${curr.symbol}${Math.round(tuitionCost + expectedSalaryWithoutDegree * studyYears).toLocaleString(curr.locale)}`,
      },
      breakEven: {
        label: 'Break-Even Time',
        value: breakEvenYear > -1 ? `${breakEvenYear} years` : 'Over 20 years',
        highlight: breakEvenYear > -1 && breakEvenYear <= 5,
      },
      wealthDifference: {
        label: `Financial Benefit (Year ${years})`,
        value: `${finalDiff >= 0 ? '+' : ''}${curr.symbol}${Math.abs(Math.round(finalDiff)).toLocaleString(curr.locale)}`,
        highlight: finalDiff > 0,
      },
    },
    chartData,
    milestones,
    insights: [
      `A degree is a major investment. You're effectively investing ${curr.symbol}${Math.round(tuitionCost).toLocaleString(curr.locale)} upfront plus ${curr.symbol}${Math.round(expectedSalaryWithoutDegree * studyYears).toLocaleString(curr.locale)} in lost wages you could have earned while studying.`,
      breakEvenYear > -1 
        ? `Your investment pays for itself in year ${breakEvenYear}. After that, your higher salary generates pure profit compared to your path without the degree.` 
        : `At these salary levels, the degree does not pay for itself within ${years} years. Consider less expensive options or negotiate a higher starting salary.`,
    ],
  };
};

