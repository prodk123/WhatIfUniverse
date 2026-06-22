'use client';

import React, { useState, useEffect } from 'react';
import { SimulatorConfig } from '@/types/simulator';
import { CategoryConfig } from '@/types/simulator';
import { getEngine } from '@/engines';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { InputForm } from './InputForm';
import { ResultsPanel } from './ResultsPanel';
import { ChartSection } from './ChartSection';
import { MilestoneTimeline } from './MilestoneTimeline';
import { InsightsSection } from './InsightsSection';
import { FAQSection } from './FAQSection';
import { RelatedSimulators } from './RelatedSimulators';
import { EngineResult } from '@/types/engine';
import { AdSlot } from '@/components/layout/AdSlot';
import { useCurrency, currencies } from '@/context/CurrencyContext';

export function SimulatorPage({ simulator, category }: { simulator: SimulatorConfig; category: CategoryConfig }) {
  const [inputs, setInputs] = useState<Record<string, number | string>>({});
  const [result, setResult] = useState<EngineResult | null>(null);
  const { currency, setCurrency } = useCurrency(); // Always use global currency
  const prevCurrencyRef = React.useRef(currency);
  const lastSimulatorSlugRef = React.useRef<string | null>(null);

  // Auto-switch to simulator's default currency when the simulator changes
  useEffect(() => {
    if (simulator.defaultCurrencyCode && lastSimulatorSlugRef.current !== simulator.slug) {
      const simBaseCurrency = currencies.find(c => c.code === simulator.defaultCurrencyCode);
      if (simBaseCurrency && simBaseCurrency.code !== currency.code) {
        setCurrency(simBaseCurrency);
      }
      lastSimulatorSlugRef.current = simulator.slug;
    }
  }, [simulator.defaultCurrencyCode, simulator.slug, currency.code, setCurrency]);

  // Initialize defaults
  useEffect(() => {
    const initialInputs: Record<string, number | string> = {};
    const simBaseCode = simulator.defaultCurrencyCode || 'INR';
    const simBaseCurrency = currencies.find(c => c.code === simBaseCode) || currencies[0];
    
    // Scale default values from simBaseCurrency to current global currency
    const multiplier = simBaseCurrency.rateToBase / currency.rateToBase;

    simulator.inputs.forEach((input) => {
      let val = Number(input.defaultValue);
      if (input.prefix === '₹' || input.prefix === '$' || input.prefix === 'AED') {
        val = Math.round(val * multiplier);
      }
      initialInputs[input.name] = val.toString();
    });
    setInputs(initialInputs);
    prevCurrencyRef.current = currency;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simulator]); // Re-run when simulator changes
  
  // Handle currency changes after mount
  useEffect(() => {
    if (prevCurrencyRef.current.code !== currency.code) {
      const multiplier = prevCurrencyRef.current.rateToBase / currency.rateToBase;
      
      setInputs(prev => {
        const next = { ...prev };
        simulator.inputs.forEach(input => {
          if (input.prefix === '₹' || input.prefix === '$' || input.prefix === 'AED') {
            const currentVal = Number(next[input.name]);
            if (!isNaN(currentVal) && next[input.name] !== '') {
              next[input.name] = Math.round(currentVal * multiplier).toString();
            }
          }
        });
        return next;
      });
      prevCurrencyRef.current = currency;
    }
  }, [currency, simulator.inputs]);

  // Run calculation when inputs change
  useEffect(() => {
    if (Object.keys(inputs).length === 0) return;
    
    // We need to parse inputs back to numbers before passing to engine
    const parsedInputs: Record<string, number> = {};
    for (const [k, v] of Object.entries(inputs)) {
      parsedInputs[k] = Number(v) || 0;
    }

    const engine = getEngine(simulator.engine);
    const newResult = engine(parsedInputs, { ...simulator.engineConfig, currency });
    
    // Combine engine insights with simulator specific ones if needed
    setResult(newResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs, simulator, currency]);

  const handleInputChange = (name: string, value: number | string) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 md:px-8 max-w-6xl">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: category.name, href: `/category/${category.slug}` },
          { label: simulator.title },
        ]}
        className="mb-8"
      />

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">{simulator.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
          {simulator.explanation}
        </p>
        {simulator.notice && (
          <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg max-w-3xl">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  {simulator.notice}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <AdSlot position="hero" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 mt-8">
        {/* Input Form Column */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none sticky top-24 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100 dark:border-slate-800">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-inner">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Variables</h2>
            </div>
            <InputForm 
              fields={simulator.inputs} 
              values={inputs} 
              onChange={handleInputChange} 
              currency={currency}
            />
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 space-y-10">
          {result && (
            <>
              <ResultsPanel summary={result.summary} />
              
              {result.chartData.length > 0 && simulator.chartType && simulator.chartKeys && (
                <ChartSection 
                  data={result.chartData} 
                  type={simulator.chartType}
                  config={simulator.chartKeys}
                />
              )}
              
              {result.milestones && result.milestones.length > 0 && (
                <MilestoneTimeline milestones={result.milestones} />
              )}
              
              {result.insights && result.insights.length > 0 && (
                <InsightsSection insights={result.insights} />
              )}
            </>
          )}
          
          <AdSlot position="mid" />
        </div>
      </div>

      <div className="space-y-16">
        <FAQSection faqs={simulator.faqs} />
        <RelatedSimulators slugs={simulator.relatedSlugs} currentCategory={category.slug} />
      </div>
    </div>
  );
}
