import { EngineFunction } from '@/types/engine';

export const healthProjectionEngine: EngineFunction = (inputs, config) => {
  const curr = (config.currency as { symbol: string; locale: string }) || { symbol: '₹', locale: 'en-IN' };
  const daysPerWeek = Math.max(1, Math.min(7, Number(inputs.daysPerWeek) || 7));
  const intensity = Math.max(0.1, Number(inputs.intensity) || 1);

  const scenarioType = (config.scenarioType as string) || 'exercise';
  
  // Base configuration metrics
  const moneySavedPerDay = inputs.habitCost !== undefined ? Math.max(0, Number(inputs.habitCost)) : Math.max(0, Number(config.moneySavedPerDay) || 0);
  const healthScoreBase = Number(config.healthScoreImprovement) || 15;
  
  // Specific scenario metrics
  const unitPerDay = inputs.dailyAmount !== undefined ? Math.max(0, Number(inputs.dailyAmount)) : Math.max(0, Number(config.unitPerDay) || 0);
  const unitLabel = String(config.unitLabel) || 'Units';
  const unitPlural = String(config.unitPlural) || 'Units';
  
  // For exercise
  const caloriesPerUnit = Math.max(0, Number(config.caloriesPerUnit) || 0);
  const weightLossPerWeek = Math.max(0, Number(config.weightLossPerWeek) || 0);

  const isMonthly = inputs.months !== undefined;
  const periods = isMonthly ? Math.max(1, Number(inputs.months)) : Math.max(1, Number(inputs.years) || 5);

  const chartData = [];
  const milestones = [];
  
  let cumulativeCalories = 0;
  let cumulativeUnits = 0;
  let weightLost = 0;
  let moneySaved = 0;

  for (let p = 0; p <= periods; p++) {
    const weeksThisPeriod = p === 0 ? 0 : (isMonthly ? 4.33 : 52);
    const daysThisPeriod = weeksThisPeriod * daysPerWeek;
    
    cumulativeUnits += unitPerDay * daysThisPeriod * intensity;
    cumulativeCalories += (caloriesPerUnit * unitPerDay) * intensity * daysThisPeriod;
    moneySaved += moneySavedPerDay * daysThisPeriod;

    // Weight loss plateau logic for explicit diet weight loss
    let weightLostThisPeriod = 0;
    if (weeksThisPeriod > 0 && scenarioType === 'diet') {
      const monthMultiplier = Math.max(0.1, 1.5 - (p * 0.15));
      weightLostThisPeriod = weightLossPerWeek * daysPerWeek * weeksThisPeriod * intensity * (1 / 7) * monthMultiplier;
      weightLost += weightLostThisPeriod;
    }

    const dataPoint: Record<string, number> = {
      [isMonthly ? 'month' : 'year']: p,
    };

    if (moneySaved > 0) dataPoint.moneySaved = Math.round(moneySaved);
    if (cumulativeCalories > 0) dataPoint.caloriesBurned = Math.round(cumulativeCalories);
    if (weightLost > 0) dataPoint.weightChange = Math.round(weightLost * 10) / 10;
    if (cumulativeUnits > 0) dataPoint.cumulativeUnits = Math.round(cumulativeUnits);

    chartData.push(dataPoint);

    // Milestones logic
    if (p === 1 && !isMonthly) {
      if (scenarioType === 'habit_cessation') {
        milestones.push({ year: 1, label: `One year smoke/drink free!`, value: 1 });
      } else if (scenarioType === 'exercise') {
        milestones.push({ year: 1, label: `First year: ${formatNum(Math.round(cumulativeCalories))} calories burned`, value: Math.round(cumulativeCalories) });
      } else {
        milestones.push({ year: 1, label: `First year of consistent habits completed!`, value: 1 });
      }
    } else if (p === 1 && isMonthly) {
      milestones.push({ month: 1, label: `Month 1 completed! Initial adaptation phase.`, value: 1 });
    }

    if (scenarioType === 'habit_cessation' && moneySaved > 100000 && chartData[p - 1]?.moneySaved < 100000) {
      milestones.push({
        [isMonthly ? 'month' : 'year']: p,
        label: `Saved over ${curr.symbol}1 Lakh from quitting!`,
        value: 100000,
      });
    }
  }

  const totalCalories = cumulativeCalories;
  const totalWeightLost = weightLost;
  const totalMoneySaved = moneySaved;
  const totalUnits = cumulativeUnits;

  // Distance calculations
  let totalDistanceKm = 0;
  if (unitLabel === 'Step') {
    totalDistanceKm = totalUnits * 0.0008; // 10,000 steps ~ 8km
  } else if (unitLabel === 'km') {
    totalDistanceKm = totalUnits;
  }

  // Heart Health Improvement Calculation
  const timeFactor = isMonthly ? (periods / 12) : periods;
  const healthImprovementPct = Math.min(Math.round(healthScoreBase * intensity * (daysPerWeek / 7) * Math.log2(timeFactor + 1)), 85);

  const summaryEntries: Record<string, import('@/types/engine').SummaryItem> = {};

  // Primary metric: Heart Health Improvement
  if (healthImprovementPct > 0) {
    summaryEntries.heartHealth = {
      label: scenarioType === 'exercise' ? 'Cardiovascular Improvement' 
           : scenarioType === 'diet' ? 'Metabolic Health Improvement'
           : scenarioType === 'sleep' ? 'Recovery & Cognitive Improvement'
           : scenarioType === 'habit_cessation' ? 'Health Recovery'
           : 'Wellness Improvement',
      value: `+${healthImprovementPct}%`,
      highlight: true,
    };
  }

  if (scenarioType === 'exercise') {
    summaryEntries.caloriesBurned = {
      label: 'Total Calories Burned',
      value: `${formatNum(Math.round(totalCalories))} kcal`,
      highlight: false,
    };
    
    if (totalDistanceKm > 0) {
      summaryEntries.distance = {
        label: 'Total Distance',
        value: `~${formatNum(Math.round(totalDistanceKm))} km`,
      };
      summaryEntries.marathons = {
        label: 'Equivalent Marathons',
        value: `${formatNum(Math.round(totalDistanceKm / 42.195))} 🏃`,
      };
    }

    if (totalCalories > 0) {
      const weightLossKg = (totalCalories / 7700) * 0.5; // Realistic 50% net loss after metabolic adaptation
      summaryEntries.weightEquivalent = {
        label: 'Potential Weight Loss',
        value: `~${weightLossKg > 10 ? Math.round(weightLossKg) : weightLossKg.toFixed(1)} kg`,
      };
    }
  } else if (scenarioType === 'habit_cessation') {
    summaryEntries.unitsAvoided = {
      label: `${unitPlural} Avoided`,
      value: `${formatNum(Math.round(totalUnits))}`,
      highlight: false,
    };
  } else if (scenarioType === 'diet') {
    summaryEntries.totalUnits = {
      label: `Total ${unitPlural}`,
      value: `${formatNum(Math.round(totalUnits))} ${unitLabel}`,
      highlight: false,
    };
    if (totalWeightLost > 0.5) {
      summaryEntries.weightLost = {
        label: 'Potential Weight Loss',
        value: `~${totalWeightLost > 10 ? Math.round(totalWeightLost) : totalWeightLost.toFixed(1)} kg`,
      };
    } else if (totalCalories > 0) {
      const weightLossKg = (totalCalories / 7700) * 0.5;
      summaryEntries.weightEquivalent = {
        label: 'Potential Weight Loss',
        value: `~${weightLossKg > 10 ? Math.round(weightLossKg) : weightLossKg.toFixed(1)} kg`,
      };
    }
  } else {
    summaryEntries.totalUnits = {
      label: `Total ${unitPlural}`,
      value: `${formatNum(Math.round(totalUnits))} ${unitLabel}`,
      highlight: false,
    };
  }

  // Removed redundant totalSessions assignment since totalUnits already covers the primary metric

  if (totalMoneySaved > 0) {
    summaryEntries.moneySaved = {
      label: `Money Saved`,
      value: `${curr.symbol}${Math.round(totalMoneySaved).toLocaleString(curr.locale)}`,
      highlight: scenarioType === 'habit_cessation',
    };
  } else if (totalMoneySaved < 0) {
    summaryEntries.moneySpent = {
      label: `Est. Additional Cost`,
      value: `${curr.symbol}${Math.abs(Math.round(totalMoneySaved)).toLocaleString(curr.locale)}`,
    };
  }

  return {
    summary: summaryEntries,
    chartData,
    milestones,
    insights: generateHealthInsights(scenarioType, periods, isMonthly, daysPerWeek, totalCalories, totalMoneySaved, totalUnits, unitPlural, intensity, curr, totalDistanceKm),
  };
};

function generateHealthInsights(
  scenarioType: string,
  periods: number,
  isMonthly: boolean,
  daysPerWeek: number,
  totalCalories: number,
  moneySaved: number,
  totalUnits: number,
  unitPlural: string,
  intensity: number,
  curr: { symbol: string; locale: string },
  totalDistanceKm: number
): string[] {
  const insights: string[] = [];
  const durationStr = isMonthly ? `${periods} months` : `${periods} years`;

  insights.push(`Consistency matters more than intensity. ${daysPerWeek} days per week for ${durationStr} builds lasting habits.`);

  if (scenarioType === 'habit_cessation') {
    insights.push(`Your body begins repairing cellular damage within weeks of quitting. Over ${durationStr}, the risk of cardiovascular diseases drops drastically.`);
    if (totalUnits > 1000) {
      insights.push(`You will have successfully avoided putting ${formatNum(Math.round(totalUnits))} ${unitPlural.toLowerCase()} into your body.`);
    }
  }

  if (scenarioType === 'exercise') {
    if (totalDistanceKm > 1000) {
      insights.push(`You will have covered ${formatNum(Math.round(totalDistanceKm))} km, which is roughly equivalent to running ${Math.round(totalDistanceKm / 42.195)} marathons!`);
    }
    if (totalCalories > 50000) {
      const maxWeightKg = totalCalories / 7700;
      insights.push(`Burning ${formatNum(Math.round(totalCalories))} calories represents an energy expenditure equivalent to ${Math.round(maxWeightKg)} kg of fat. Note that actual weight loss is affected by diet and metabolic adaptation.`);
    }
  }
  
  if (scenarioType === 'sleep') {
    insights.push(`Quality sleep is the foundation of cognitive performance. You are compounding thousands of hours of crucial brain recovery.`);
  }

  if (moneySaved > 0) {
    insights.push(`Beyond health benefits, you would save ${curr.symbol}${Math.round(moneySaved).toLocaleString(curr.locale)} — money that can be invested for further growth.`);
  }

  insights.push('Studies show that habits formed over 66+ days become automatic. The first 3 months are the hardest — after that, it gets easier.');

  return insights;
}

function formatNum(num: number): string {
  return num.toLocaleString('en-IN');
}
