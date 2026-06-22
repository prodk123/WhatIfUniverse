import { EngineFunction } from '@/types/engine';
import { compoundGrowthEngine } from './compound-growth';
import { salaryComparisonEngine } from './salary-comparison';
import { healthProjectionEngine } from './health-projection';
import { roiCalculatorEngine } from './roi-calculator';
import { linearProjectionEngine } from './linear-projection';

// Fallback empty engine
const fallbackEngine: EngineFunction = (inputs, config) => {
  return {
    summary: {},
    chartData: [],
    milestones: [],
    insights: [],
  };
};

export const engines: Record<string, EngineFunction> = {
  'compound-growth': compoundGrowthEngine,
  'salary-comparison': salaryComparisonEngine,
  'health-projection': healthProjectionEngine,
  'roi-calculator': roiCalculatorEngine,
  'linear-projection': linearProjectionEngine,
  'savings-projection': compoundGrowthEngine, // mapping missing ones to closest
  'break-even': salaryComparisonEngine, // mapping missing ones to closest
};

export function getEngine(name: string): EngineFunction {
  return engines[name] || fallbackEngine;
}
