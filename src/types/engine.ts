// Engine input/output type definitions

export interface ChartDataPoint {
  year?: number;
  month?: number;
  [key: string]: number | undefined;
}

export interface Milestone {
  year?: number;
  month?: number;
  label: string;
  value: number;
}

export interface SummaryItem {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface EngineResult {
  summary: Record<string, SummaryItem>;
  chartData: ChartDataPoint[];
  milestones: Milestone[];
  insights: string[];
}

export type EngineFunction = (
  inputs: Record<string, number>,
  config: Record<string, unknown>
) => EngineResult;
