import { SimulatorConfig } from '@/types/simulator';

const createHealthSim = (
  slug: string,
  title: string,
  desc: string,
  scenarioType: 'exercise' | 'habit_cessation' | 'hydration' | 'sleep' | 'diet' | 'mindfulness',
  cals: number,
  healthImp: number,
  moneySaved: number, // Default money saved (can be overridden by inputs.habitCost)
  unitPerDay: number,
  unitLabel: string,
  unitPlural: string,
  weightLossPerWeek: number = 0
): SimulatorConfig => {
  const chartLines = [
    { key: 'healthScore', label: 'Health Vitality Index', color: '#8b5cf6' }
  ];

  let customInputs: any[] = [];

  if (scenarioType === 'habit_cessation') {
    chartLines.push({ key: 'cumulativeUnits', label: `${unitPlural} Avoided`, color: '#ef4444' });
    if (moneySaved > 0) chartLines.push({ key: 'moneySaved', label: 'Money Saved', color: '#10b981' });
    
    customInputs = [
      { name: 'years', label: 'Duration', type: 'slider', defaultValue: 5, min: 1, max: 20, step: 1, suffixStr: ' years', validation: [] },
      { name: 'habitCost', label: `Daily Spent on Habit`, type: 'slider', defaultValue: moneySaved, min: 0, max: 1000, step: 10, prefixStr: '₹', validation: [] }
    ];
  } else if (scenarioType === 'exercise') {
    if (cals > 0) chartLines.push({ key: 'caloriesBurned', label: 'Calories Burned', color: '#f59e0b' });
    
    customInputs = [
      { name: 'daysPerWeek', label: 'Days Per Week', type: 'slider', defaultValue: 5, min: 1, max: 7, step: 1, suffixStr: ' days', validation: [] },
      { name: 'years', label: 'Duration', type: 'slider', defaultValue: 5, min: 1, max: 20, step: 1, suffixStr: ' years', validation: [] },
      { 
        name: 'intensity', 
        label: 'Pace / Effort Level', 
        type: 'select', 
        defaultValue: 1, 
        options: [
          { label: 'Light / Casual', value: 0.8 },
          { label: 'Moderate / Standard', value: 1.0 },
          { label: 'Vigorous / Strict', value: 1.2 },
        ], 
        validation: [] 
      },
    ];
  } else if (scenarioType === 'sleep') {
    chartLines.push({ key: 'cumulativeUnits', label: `Total ${unitPlural}`, color: '#3b82f6' });
    
    customInputs = [
      { name: 'years', label: 'Duration', type: 'slider', defaultValue: 5, min: 1, max: 20, step: 1, suffixStr: ' years', validation: [] },
    ];
  } else if (scenarioType === 'diet') {
    chartLines.push({ key: 'cumulativeUnits', label: `Total ${unitPlural}`, color: '#3b82f6' });
    if (weightLossPerWeek > 0) chartLines.push({ key: 'weightChange', label: 'Weight Loss (kg)', color: '#f59e0b' });
    
    customInputs = [
      { name: 'daysPerWeek', label: 'Days Per Week', type: 'slider', defaultValue: 7, min: 1, max: 7, step: 1, suffixStr: ' days', validation: [] },
      { name: 'months', label: 'Duration', type: 'slider', defaultValue: 6, min: 1, max: 24, step: 1, suffixStr: ' months', validation: [] },
      { 
        name: 'intensity', 
        label: 'Diet Strictness', 
        type: 'select', 
        defaultValue: 1, 
        options: [
          { label: '70% Adherence (Cheat Weekends)', value: 0.8 },
          { label: '85% Adherence (Standard)', value: 1.0 },
          { label: '100% Adherence (Very Strict)', value: 1.2 },
        ], 
        validation: [] 
      },
    ];
  } else {
    // Default (hydration, mindfulness)
    chartLines.push({ key: 'cumulativeUnits', label: `Total ${unitPlural}`, color: '#3b82f6' });
    
    customInputs = [
      { name: 'daysPerWeek', label: 'Days Per Week', type: 'slider', defaultValue: 7, min: 1, max: 7, step: 1, suffixStr: ' days', validation: [] },
      { name: 'years', label: 'Duration', type: 'slider', defaultValue: 5, min: 1, max: 20, step: 1, suffixStr: ' years', validation: [] },
    ];
  }

  return {
    slug,
    title,
    category: 'health',
    description: desc,
    explanation: `Explore the compound effect of ${title.toLowerCase()}. Consistency over years leads to massive health and financial benefits.`,
    inputs: customInputs,
    engine: 'health-projection',
    engineConfig: { 
      scenarioType,
      caloriesPerUnit: cals, 
      healthScoreImprovement: healthImp, 
      moneySavedPerDay: moneySaved,
      unitPerDay,
      unitLabel,
      unitPlural,
      weightLossPerWeek
    },
    chartType: 'line',
    chartKeys: {
      xAxis: scenarioType === 'diet' ? 'month' : 'year',
      lines: chartLines,
    },
    insights: [],
    faqs: [
      { question: 'What is the Health Vitality Index?', answer: 'The Health Vitality Index (out of 100) is a proprietary compound metric representing your overall cardiovascular health, metabolic function, and recovery rate. 50 is an average baseline, and 90+ represents peak biological optimization based on consistency.' },
    ],
    relatedSlugs: [],
  };
};

export const healthSimulators: SimulatorConfig[] = [
  createHealthSim('walk-10000-steps', 'What If I Walk 10,000 Steps Daily?', 'The compound effect of daily walking.', 'exercise', 400, 20, 0, 10000, 'Step', 'Steps', 0.2),
  createHealthSim('quit-smoking', 'What If I Quit Smoking?', 'Health recovery and money saved from cigarettes.', 'habit_cessation', 0, 40, 250, 15, 'Cigarette', 'Cigarettes', 0),
  createHealthSim('run-5k-daily', 'What If I Run 5K Every Day?', 'High-intensity cardiovascular improvement.', 'exercise', 350, 25, 0, 5, 'km', 'km', 0.3),
  createHealthSim('drink-water', 'What If I Drink 3L of Water Daily?', 'Hydration benefits for skin and energy.', 'hydration', 0, 10, 0, 3, 'Liter', 'Liters', 0),
  createHealthSim('sleep-8-hours', 'What If I Sleep 8 Hours a Night?', 'Recovery and cognitive performance gains.', 'sleep', 0, 30, 0, 2, 'Extra Hour', 'Extra Hours', 0),
  createHealthSim('intermittent-fasting', 'What If I Fast for 16 Hours Daily?', 'Metabolic health and fat loss.', 'diet', 200, 15, 0, 16, 'Hour Fasted', 'Hours Fasted', 0.2),
  createHealthSim('weight-lifting', 'What If I Lift Weights 4x a Week?', 'Muscle mass and bone density gains.', 'exercise', 300, 25, 0, 1, 'Session', 'Sessions', 0.1),
  createHealthSim('yoga-daily', 'What If I Do Yoga Every Morning?', 'Flexibility and stress reduction.', 'mindfulness', 150, 20, 0, 1, 'Session', 'Sessions', 0),
  createHealthSim('cut-sugar', 'What If I Cut Out Added Sugar?', 'Insulin sensitivity and fat loss.', 'diet', 300, 35, 100, 50, 'Gram', 'Grams', 0.3),
  createHealthSim('eat-more-protein', 'What If I Eat 150g of Protein Daily?', 'Muscle preservation and satiety.', 'diet', 0, 15, -50, 150, 'Gram', 'Grams', 0),
  createHealthSim('meditate-daily', 'What If I Meditate for 20 Minutes?', 'Mental health and stress reduction.', 'mindfulness', 0, 25, 0, 20, 'Minute', 'Minutes', 0),
  createHealthSim('home-cooked-meals', 'What If I Stop Eating Out?', 'Financial savings and calorie control.', 'habit_cessation', 500, 20, 500, 1, 'Meal', 'Meals', 0.2),
  createHealthSim('quit-alcohol', 'What If I Quit Drinking Alcohol?', 'Liver health, better sleep, and huge savings.', 'habit_cessation', 300, 30, 300, 2, 'Drink', 'Drinks', 0.1),
  createHealthSim('cycle-to-work', 'What If I Cycle to Work?', 'Active commute vs driving.', 'exercise', 400, 25, 150, 10, 'km', 'km', 0.2),
  createHealthSim('stand-at-work', 'What If I Use a Standing Desk?', 'Posture improvement and NEAT calories.', 'exercise', 100, 10, 0, 4, 'Hour', 'Hours', 0.05),
  createHealthSim('cold-showers', 'What If I Take Cold Showers?', 'Immunity and dopamine baseline increases.', 'habit_cessation', 0, 10, 0, 1, 'Shower', 'Showers', 0),
  createHealthSim('plant-based-diet', 'What If I Go Vegan?', 'Environmental impact and cardiovascular health.', 'diet', 100, 15, 50, 1, 'Day', 'Days', 0.1),
  createHealthSim('stretching', 'What If I Stretch for 10 Mins Daily?', 'Mobility and injury prevention.', 'exercise', 50, 15, 0, 10, 'Minute', 'Minutes', 0),
  createHealthSim('no-screens-before-bed', 'What If I Stop Screens Before Bed?', 'Better REM sleep and recovery.', 'sleep', 0, 20, 0, 1, 'Hour', 'Hours', 0),
  createHealthSim('take-vitamins', 'What If I Take Daily Supplements?', 'Fixing deficiencies.', 'diet', 0, 10, -20, 1, 'Dose', 'Doses', 0),
];
