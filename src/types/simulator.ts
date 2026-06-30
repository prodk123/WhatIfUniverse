// Core type definitions for the What If Universe simulator system

export type CategorySlug = 'money' | 'career' | 'health' | 'education' | 'business' | 'lifestyle';

export type EngineType =
  | 'compound-growth'
  | 'salary-comparison'
  | 'health-projection'
  | 'savings-projection'
  | 'break-even'
  | 'roi-calculator'
  | 'linear-projection';

export type InputFieldType = 'number' | 'select' | 'slider';

export interface ValidationRule {
  type: 'min' | 'max' | 'required' | 'integer';
  value?: number;
  message: string;
}

export interface InputFieldOption {
  label: string;
  value: number;
}

export interface InputField {
  name: string;
  label: string;
  type: InputFieldType;
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  prefix?: string;
  suffixStr?: string;
  options?: InputFieldOption[];
  validation: ValidationRule[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface InsightTemplate {
  text: string;
  condition?: 'always' | 'high-growth' | 'long-term' | 'short-term';
}

export interface MilestoneConfig {
  label: string;
  targetKey: string;
  targetValue: number;
}

export interface SimulatorConfig {
  slug: string;
  title: string;
  category: CategorySlug;
  description: string;
  explanation: string;
  inputs: InputField[];
  engine: EngineType;
  engineConfig: Record<string, unknown>;
  defaultCurrencyCode?: string;
  isCurrencyLocked?: boolean;
  notice?: string;
  insights: InsightTemplate[];
  faqs: FAQ[];
  relatedSlugs: string[];
  milestones?: MilestoneConfig[];
  chartType?: 'area' | 'bar' | 'line';
  chartKeys?: { xAxis: string; lines: { key: string; label: string; color: string }[] };
}

export interface CategoryConfig {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string;
  color: string;
  seoContent?: string;
  faqs?: FAQ[];
}
