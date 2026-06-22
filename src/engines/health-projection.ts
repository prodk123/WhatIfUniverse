import { EngineFunction } from '@/types/engine';

export const healthProjectionEngine: EngineFunction = (inputs, config) => {
  const curr = (config.currency as any) || { symbol: '₹', locale: 'en-IN' };
  const daysPerWeek = inputs.daysPerWeek || 7;
  const intensity = inputs.intensity || 1;

  const scenarioType = (config.scenarioType as string) || 'exercise';
  
  // Base configuration metrics
  const healthScoreBase = (config.healthScoreImprovement as number) || 15;
  const moneySavedPerDay = inputs.habitCost !== undefined ? inputs.habitCost : ((config.moneySavedPerDay as number) || 0);
  
  // Specific scenario metrics
  const unitPerDay = (config.unitPerDay as number) || 0; // e.g., 20 cigarettes, 3 liters, 8 hours
  const unitLabel = (config.unitLabel as string) || 'Units';
  const unitPlural = (config.unitPlural as string) || 'Units';
  
  // For exercise
  const caloriesPerUnit = (config.caloriesPerUnit as number) || 0;
  const weightLossPerWeek = (config.weightLossPerWeek as number) || 0;

  const isMonthly = inputs.months !== undefined;
  const periods = isMonthly ? inputs.months : (inputs.years || 5);

  const chartData = [];
  const milestones = [];

  const totalWeeks = isMonthly ? (periods * 4.33) : (periods * 52);
  
  let cumulativeCalories = 0;
  let cumulativeUnits = 0;
  let weightLost = 0;
  let moneySaved = 0;
  let healthScore = 50;

  for (let p = 0; p <= periods; p++) {
    const weeksThisPeriod = p === 0 ? 0 : (isMonthly ? 4.33 : 52);
    const daysThisPeriod = weeksThisPeriod * daysPerWeek;
    
    cumulativeUnits += unitPerDay * daysThisPeriod * intensity;
    cumulativeCalories += caloriesPerUnit * intensity * daysThisPeriod;
    moneySaved += moneySavedPerDay * daysThisPeriod;

    // Weight loss plateau logic
    let weightLostThisPeriod = 0;
    if (weeksThisPeriod > 0) {
      if (scenarioType === 'diet') {
        // Fast initial loss, plateaus over time
        // Month 1: 1.5x multiplier, Month 6: 0.5x, Month 12+: 0.1x
        const monthMultiplier = Math.max(0.1, 1.5 - (p * 0.15));
        weightLostThisPeriod = weightLossPerWeek * daysPerWeek * weeksThisPeriod * intensity * (1 / 7) * monthMultiplier;
      } else {
        // Linear for exercise
        weightLostThisPeriod = weightLossPerWeek * daysPerWeek * weeksThisPeriod * intensity * (1 / 7);
      }
      weightLost += weightLostThisPeriod;
    }

    const healthImprovement = Math.min(
      healthScoreBase * intensity * (daysPerWeek / 7),
      40
    );
    
    if (isMonthly) {
      healthScore = Math.min(50 + healthImprovement * Math.log2((p / 12) + 1), 95);
    } else {
      healthScore = Math.min(50 + healthImprovement * Math.log2(p + 1), 95);
    }

    const dataPoint: any = {
      healthScore: Math.round(healthScore),
    };
    
    if (isMonthly) {
      dataPoint.month = p;
    } else {
      dataPoint.year = p;
    }

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

    if (healthScore >= 80 && p > 0 && chartData[p - 1]?.healthScore < 80) {
      milestones.push({
        [isMonthly ? 'month' : 'year']: p,
        label: `Health score reaches "Excellent" (${Math.round(healthScore)})`,
        value: Math.round(healthScore),
      });
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
  const totalSessions = Math.round((daysPerWeek / 7) * totalWeeks * 7);

  const summaryEntries: Record<string, { label: string; value: string; highlight?: boolean }> = {
    healthScore: {
      label: 'Health Vitality Index',
      value: `${Math.round(healthScore)} pts`,
      highlight: true,
    },
  };

  // Dynamic Summaries based on Scenario
  if (scenarioType === 'habit_cessation') {
    summaryEntries.unitsAvoided = {
      label: `${unitPlural} Avoided`,
      value: `${formatNum(Math.round(totalUnits))}`,
    };
  } else if (scenarioType === 'exercise') {
    summaryEntries.caloriesBurned = {
      label: 'Total Calories Burned',
      value: `${formatNum(Math.round(totalCalories))} cal`,
    };
    if (totalWeightLost > 0.5) {
      summaryEntries.weightLost = {
        label: 'Potential Weight Loss',
        value: `${totalWeightLost.toFixed(1)} kg`,
      };
    }
  } else if (scenarioType === 'hydration' || scenarioType === 'sleep' || scenarioType === 'diet' || scenarioType === 'mindfulness') {
    summaryEntries.totalUnits = {
      label: `Total ${unitPlural}`,
      value: `${formatNum(Math.round(totalUnits))} ${unitLabel}`,
    };
    if (scenarioType === 'diet' && totalWeightLost > 0.5) {
      summaryEntries.weightLost = {
        label: 'Potential Weight Loss',
        value: `${totalWeightLost.toFixed(1)} kg`,
      };
    }
  }

  summaryEntries.totalSessions = {
    label: scenarioType === 'sleep' || scenarioType === 'habit_cessation' ? 'Total Days' : 'Total Sessions',
    value: `${formatNum(totalSessions)}`,
  };

  if (totalMoneySaved > 0) {
    summaryEntries.moneySaved = {
      label: `Money Saved`,
      value: `${curr.symbol}${Math.round(totalMoneySaved).toLocaleString(curr.locale)}`,
    };
  } else if (totalMoneySaved < 0) {
    summaryEntries.moneySpent = {
      label: `Est. Cost`,
      value: `${curr.symbol}${Math.abs(Math.round(totalMoneySaved)).toLocaleString(curr.locale)}`,
    };
  }

  return {
    summary: summaryEntries,
    chartData,
    milestones,
    insights: generateHealthInsights(scenarioType, periods, isMonthly, daysPerWeek, totalCalories, totalMoneySaved, totalUnits, unitPlural, intensity, curr),
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
  curr: any
): string[] {
  const insights: string[] = [];
  const durationStr = isMonthly ? `${periods} months` : `${periods} years`;

  insights.push(
    `Consistency matters more than intensity. ${daysPerWeek} days per week for ${durationStr} builds lasting habits.`
  );

  if (scenarioType === 'habit_cessation') {
    insights.push(`Your body begins repairing cellular damage within weeks of quitting. Over ${durationStr}, the risk of cardiovascular diseases drops drastically.`);
    if (totalUnits > 1000) {
      insights.push(`You will have successfully avoided putting ${formatNum(Math.round(totalUnits))} ${unitPlural.toLowerCase()} into your body.`);
    }
  }

  if (scenarioType === 'diet') {
    insights.push(`Weight loss is non-linear. You'll likely see a sharp drop initially (water weight), followed by a steady phase, and eventually a plateau as your metabolism adapts.`);
  }

  if (scenarioType === 'exercise' && totalCalories > 100000) {
    insights.push(
      `Burning ${formatNum(Math.round(totalCalories))} calories is equivalent to losing approximately ${(totalCalories / 7700).toFixed(1)} kg of body fat.`
    );
  }
  
  if (scenarioType === 'sleep') {
    insights.push(`Quality sleep is the foundation of cognitive performance. You are compounding thousands of hours of crucial brain recovery.`);
  }

  if (moneySaved > 0) {
    insights.push(
      `Beyond health benefits, you would save ${curr.symbol}${Math.round(moneySaved).toLocaleString(curr.locale)} — money that can be invested for further growth.`
    );
  }

  if (intensity >= 1.2 && scenarioType === 'exercise') {
    insights.push(
      'High intensity amplifies results but also increases injury risk. Balance push with recovery.'
    );
  }

  insights.push(
    'Studies show that habits formed over 66+ days become automatic. The first 3 months are the hardest — after that, it gets easier.'
  );

  return insights;
}

function formatNum(num: number): string {
  return num.toLocaleString('en-IN');
}
