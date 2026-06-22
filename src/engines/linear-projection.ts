import { EngineFunction } from '@/types/engine';

export const linearProjectionEngine: EngineFunction = (inputs, config) => {
  const curr = (config.currency as any) || { symbol: '₹', locale: 'en-IN' };
  const type = config.type as string;
  
  if (type === 'time') {
    // Lifestyle: Time Recovery
    let extraHoursPerDay = 0;
    if (inputs.dailyHoursSaved !== undefined) {
      extraHoursPerDay = inputs.dailyHoursSaved;
    } else {
      const currentWakeTime = inputs.currentWakeTime || 8;
      const targetWakeTime = inputs.targetWakeTime || 5;
      extraHoursPerDay = Math.max(0, currentWakeTime - targetWakeTime);
    }
    
    const productivePercent = (inputs.productivePercent || 80) / 100;
    const years = inputs.years || 5;
    
    const productiveHoursPerDay = extraHoursPerDay * productivePercent;
    
    const chartData = [];
    let totalHours = 0;
    
    for (let year = 0; year <= years; year++) {
      chartData.push({
        year,
        metric: Math.round(totalHours),
      });
      totalHours += productiveHoursPerDay * 365;
    }
    
    const totalProductiveHours = productiveHoursPerDay * 365 * years;
    const equivalentWorkWeeks = totalProductiveHours / 40;
    
    const summaryTime: Record<string, import('@/types/engine').SummaryItem> = {
      extraHours: {
        label: 'Extra Productive Hours/Year',
        value: Math.round(productiveHoursPerDay * 365).toString(),
      },
      totalHours: {
        label: `Total Hours Gained (${years}y)`,
        value: Math.round(totalProductiveHours).toString(),
        highlight: true,
      },
      workWeeks: {
        label: 'Equivalent 40-hour Work Weeks',
        value: Math.round(equivalentWorkWeeks).toString(),
      },
    };
    
    return {
      summary: summaryTime,
      chartData,
      milestones: [],
      insights: [
        `Waking up at 5 AM gives you ${extraHoursPerDay} extra hours per day before the world wakes up.`,
        `By using ${Math.round(productivePercent * 100)}% of that time productively, you gain an extra ${Math.round(equivalentWorkWeeks)} work weeks over ${years} years.`,
        `Many people use this time to build businesses, get fit, or learn skills that drastically alter their life trajectory.`,
      ],
    };
  } else {
    // Business simulations
    const unitsPerMonth = inputs.unitsPerMonth !== undefined ? inputs.unitsPerMonth : (inputs.newCustomers || 4);
    const rpm = inputs.rpm !== undefined ? inputs.rpm : (inputs.price || 150);
    const years = inputs.years || 3;
    
    const baseGrowthRate = (config.baseGrowthRate as number) || 1.5;
    const unitName = (config.unitName as string) || 'Videos';
    const audienceName = (config.audienceName as string) || 'Views';
    const platformName = (config.platformName as string) || 'YouTube';
    const isPer1000 = config.isPer1000 as boolean ?? true;
    
    const chartData = [];
    const milestones = [];
    const milestonesCrossed = new Set();
    
    let currentAudiencePerUnit = isPer1000 ? 100 : 1;
    let monthlyAudience = 0;
    let totalRevenue = 0;
    
    for (let year = 0; year <= years; year++) {
      if (year > 0) {
        currentAudiencePerUnit *= baseGrowthRate * 2; // Exponential growth
      }
      
      monthlyAudience = currentAudiencePerUnit * unitsPerMonth;
      const monthlyRevenue = isPer1000 ? (monthlyAudience / 1000) * rpm : (monthlyAudience * rpm);
      
      chartData.push({
        year,
        metric: Math.round(monthlyRevenue),
      });
      
      totalRevenue += monthlyRevenue * 12;
      
      if (monthlyRevenue >= 100000 && !milestonesCrossed.has(100000)) {
        milestonesCrossed.add(100000);
        milestones.push({
          year,
          label: `Cross ${curr.symbol}1 Lakh / month`,
          value: 100000,
        });
      }
    }
    
    const summaryBusiness: Record<string, import('@/types/engine').SummaryItem> = {
      finalRevenue: {
        label: 'Monthly Revenue',
        value: `${curr.symbol}${Math.round(isPer1000 ? (monthlyAudience / 1000) * rpm : monthlyAudience * rpm).toLocaleString(curr.locale)}`,
        highlight: true,
      },
      totalRevenue: {
        label: 'Total Accumulated Revenue',
        value: `${curr.symbol}${Math.round(totalRevenue).toLocaleString(curr.locale)}`,
      },
      totalVideos: {
        label: `Total ${unitName} Created`,
        value: (unitsPerMonth * 12 * years).toString(),
      },
    };
    
    return {
      summary: summaryBusiness,
      chartData,
      milestones,
      insights: [
        `${platformName} is a compounding game. Your early ${unitName.toLowerCase()} will get few ${audienceName.toLowerCase()}, but as your back-catalog grows, previous ${unitName.toLowerCase()} continue to generate income.`,
        `Consistency is more important than going viral. Delivering ${unitsPerMonth} ${unitName.toLowerCase()} every month builds trust with your audience.`,
      ],
    };
  }
};
