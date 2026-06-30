import { EngineFunction } from '@/types/engine';

export const linearProjectionEngine: EngineFunction = (inputs, config) => {
  const curr = (config.currency as { symbol: string; locale: string }) || { symbol: '₹', locale: 'en-IN' };
  const type = config.type as string;
  
  if (type === 'time') {
    // Lifestyle: Time Recovery
    let extraHoursPerDay = 0;
    if (inputs.dailyHoursSaved !== undefined) {
      extraHoursPerDay = Math.max(0, Number(inputs.dailyHoursSaved));
    } else {
      const currentWakeTime = Math.max(0, Number(inputs.currentWakeTime) || 8);
      const targetWakeTime = Math.max(0, Number(inputs.targetWakeTime) || 5);
      extraHoursPerDay = Math.max(0, currentWakeTime - targetWakeTime);
    }
    
    let productiveHoursPerDay = 0;
    if (inputs.productiveHours !== undefined) {
      productiveHoursPerDay = Math.min(Math.max(0, Number(inputs.productiveHours)), extraHoursPerDay);
    } else {
      const productivePercent = Math.min(100, Math.max(0, Number(inputs.productivePercent) || 80)) / 100;
      productiveHoursPerDay = extraHoursPerDay * productivePercent;
    }
    
    const calculatedPercent = extraHoursPerDay > 0 ? (productiveHoursPerDay / extraHoursPerDay) * 100 : 0;
    
    const years = Math.max(1, Number(inputs.years) || 5);
    
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
      percentProductive: {
        label: 'Effective Productivity',
        value: `${Math.round(calculatedPercent)}%`,
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
        `By using ${Math.round(calculatedPercent)}% of that time productively, you gain an extra ${Math.round(equivalentWorkWeeks)} work weeks over ${years} years.`,
        `Many people use this time to build businesses, get fit, or learn skills that drastically alter their life trajectory.`,
      ],
    };
  } else {
    // Business simulations
    const unitsPerMonth = Math.max(0, inputs.unitsPerMonth !== undefined ? Number(inputs.unitsPerMonth) : (Number(inputs.newCustomers) || 4));
    const rpm = Math.max(0, inputs.rpm !== undefined ? Number(inputs.rpm) : (Number(inputs.price) || 0));
    const audiencePerUnit = Math.max(0, inputs.audiencePerUnit !== undefined ? Number(inputs.audiencePerUnit) : 100);
    const growthRate = Math.max(0, inputs.growthRate !== undefined ? Number(inputs.growthRate) : 10) / 100;
    const years = Math.max(1, Number(inputs.years) || 3);
    const monthlyGrowth = Math.pow(1 + growthRate, 1 / 12);
    
    const unitName = (config.unitName as string) || 'Units';
    const audienceName = (config.audienceName as string) || 'Audience';
    const platformName = (config.platformName as string) || 'Business';
    const modelType = (config.modelType as string) || 'cumulative-content';
    const isPer1000 = modelType.includes('content');
    
    const chartData = [];
    const milestones = [];
    const milestonesCrossed = new Set();
    
    let totalRevenue = 0;
    let totalUnits = 0; 
    let currentAudiencePerUnit = audiencePerUnit;
    let currentUnitsPerMonth = unitsPerMonth;
    let finalMonthlyRevenue = 0;
    let finalMonthlyAudience = 0;
    
    chartData.push({ year: 0, metric: 0 });

    for (let month = 1; month <= years * 12; month++) {
      if (modelType === 'cumulative-content') {
        // e.g., YouTube, Blog: Content stays forever. Total views = library * views per piece
        totalUnits += unitsPerMonth;
        currentAudiencePerUnit *= monthlyGrowth;
        finalMonthlyAudience = totalUnits * currentAudiencePerUnit;
      } else if (modelType === 'ephemeral-content') {
        // e.g., Newsletter: Sent once. Total reads = emails sent this month * subscribers
        totalUnits += unitsPerMonth; // Track total sent just for summary
        currentAudiencePerUnit *= monthlyGrowth;
        finalMonthlyAudience = unitsPerMonth * currentAudiencePerUnit;
      } else if (modelType === 'recurring-customers') {
        // e.g., SaaS, Vending Machines: Customers stay subscribed. MRR grows with active userbase.
        currentUnitsPerMonth *= monthlyGrowth;
        totalUnits += currentUnitsPerMonth; // Track active customers
        finalMonthlyAudience = totalUnits;
      } else if (modelType === 'one-off-sales') {
        // e.g., E-commerce, Airbnb: One-off sales. Revenue depends only on sales volume this month.
        currentUnitsPerMonth *= monthlyGrowth;
        totalUnits += currentUnitsPerMonth; // Track all-time sales for summary
        finalMonthlyAudience = currentUnitsPerMonth;
      }
      
      const monthlyRevenue = isPer1000 ? (finalMonthlyAudience / 1000) * rpm : (finalMonthlyAudience * rpm);
      
      totalRevenue += monthlyRevenue;
      finalMonthlyRevenue = monthlyRevenue;
      
      if (month % 12 === 0) {
        chartData.push({
          year: month / 12,
          metric: Math.round(monthlyRevenue),
        });
      }
      
      if (monthlyRevenue >= 100000 && !milestonesCrossed.has(100000)) {
        milestonesCrossed.add(100000);
        milestones.push({
          year: month / 12,
          label: `Cross ${curr.symbol}1 Lakh / month`,
          value: 100000,
        });
      }
    }
    
    const summaryBusiness: Record<string, import('@/types/engine').SummaryItem> = {
      finalRevenue: {
        label: 'Monthly Revenue (Final Year)',
        value: `${curr.symbol}${Math.round(finalMonthlyRevenue).toLocaleString(curr.locale)}`,
        highlight: true,
      },
      totalRevenue: {
        label: 'Total Accumulated Revenue',
        value: `${curr.symbol}${Math.round(totalRevenue).toLocaleString(curr.locale)}`,
      },
      totalVideos: {
        label: `Total ${unitName} ${isPer1000 ? 'Created' : 'Acquired'}`,
        value: Math.round(totalUnits).toLocaleString(),
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
