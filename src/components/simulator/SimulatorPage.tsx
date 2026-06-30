'use client';

import React, { useState, useEffect } from 'react';
import { SimulatorConfig } from '@/types/simulator';
import { CategoryConfig } from '@/types/simulator';
import { getEngine } from '@/engines';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Permutation } from '@/config/permutations';
import { InputForm } from './InputForm';
import { ResultsPanel } from './ResultsPanel';
import { ChartSection } from './ChartSection';
import { MilestoneTimeline } from './MilestoneTimeline';
import { InsightsSection } from './InsightsSection';
import { FAQSection } from './FAQSection';
import { RelatedSimulators } from './RelatedSimulators';
import { EmbedCodeWidget } from './EmbedCodeWidget';
import { EngineResult } from '@/types/engine';
import { AdSlot } from '@/components/layout/AdSlot';
import { useCurrency, currencies } from '@/context/CurrencyContext';
import { autoLinkText } from '@/lib/seo-linker';

import { getPermutationsForSimulator } from '@/config/permutations';

export function SimulatorPage({ simulator, category, permutation, isEmbed = false }: { simulator: SimulatorConfig; category: CategoryConfig; permutation?: Permutation; isEmbed?: boolean }) {
  const [inputs, setInputs] = useState<Record<string, number | string>>({});
  const [result, setResult] = useState<EngineResult | null>(null);
  const { currency, setCurrency, setLocked } = useCurrency(); // Always use global currency
  const prevCurrencyRef = React.useRef(currency);
  const lastSimulatorSlugRef = React.useRef<string | null>(null);

  const displayTitle = permutation ? permutation.h1 : simulator.title;
  const displayDescription = permutation ? permutation.description : simulator.explanation;
  
  // Get all permutations for this simulator to show as internal links
  const availableScenarios = getPermutationsForSimulator(simulator.slug).filter(p => p.permutationSlug !== permutation?.permutationSlug);

  // Auto-switch to simulator's default currency when the simulator changes
  useEffect(() => {
    setLocked(simulator.isCurrencyLocked || false);
    if (simulator.defaultCurrencyCode && lastSimulatorSlugRef.current !== simulator.slug) {
      const simBaseCurrency = currencies.find(c => c.code === simulator.defaultCurrencyCode);
      if (simBaseCurrency && simBaseCurrency.code !== currency.code) {
        setCurrency(simBaseCurrency);
      }
      lastSimulatorSlugRef.current = simulator.slug;
    }
    
    return () => setLocked(false);
  }, [simulator.defaultCurrencyCode, simulator.slug, simulator.isCurrencyLocked, currency.code, setCurrency, setLocked]);

  // Initialize defaults
  useEffect(() => {
    const initialInputs: Record<string, number | string> = {};
    const simBaseCode = simulator.defaultCurrencyCode || 'INR';
    const simBaseCurrency = currencies.find(c => c.code === simBaseCode) || currencies[0];
    
    // Scale default values from simBaseCurrency to current global currency if NOT locked
    const multiplier = simulator.isCurrencyLocked ? 1 : (simBaseCurrency.rateToBase / currency.rateToBase);

    simulator.inputs.forEach((input) => {
      let val = Number(input.defaultValue);
      
      // Override with permutation defaults if available
      if (permutation?.defaultOverrides && permutation.defaultOverrides[input.name] !== undefined) {
        val = Number(permutation.defaultOverrides[input.name]);
      }
      
      if ((input.prefix === '₹' || input.prefix === '$' || input.prefix === 'AED') && !simulator.isCurrencyLocked) {
        val = Math.round(val * multiplier);
      }
      initialInputs[input.name] = val.toString();
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInputs(initialInputs);
    prevCurrencyRef.current = currency;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simulator]); // Re-run when simulator changes
  
  // Handle currency changes after mount
  useEffect(() => {
    if (prevCurrencyRef.current.code !== currency.code) {
      const multiplier = simulator.isCurrencyLocked ? 1 : (prevCurrencyRef.current.rateToBase / currency.rateToBase);
      
      setInputs(prev => {
        const next = { ...prev };
        simulator.inputs.forEach(input => {
          if ((input.prefix === '₹' || input.prefix === '$' || input.prefix === 'AED') && !simulator.isCurrencyLocked) {
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
  }, [currency, simulator.inputs, simulator.isCurrencyLocked]);

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResult(newResult);
  }, [inputs, simulator, currency]);

  const handleInputChange = (name: string, value: number | string) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 md:px-8 max-w-6xl">
      {!isEmbed && <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: category.name, href: `/category/${category.slug}` },
          { label: simulator.title },
        ]}
        className="mb-8"
      />}

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">{displayTitle}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
          {displayDescription}
        </p>
        {simulator.notice && (
          <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg max-w-3xl">
            <p className="text-blue-800 font-medium">{simulator.notice}</p>
          </div>
        )}
      </div>

      {availableScenarios.length > 0 && !permutation && !isEmbed && (
        <div className="mb-12 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 rounded-3xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg className="w-6 h-6 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Learn Before You Calculate
          </h2>
          <div className="space-y-3">
            {availableScenarios.map(scenario => (
              <details key={scenario.permutationSlug} className="group bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm">
                <summary className="p-5 font-semibold cursor-pointer flex justify-between items-center text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                  {scenario.h1}
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="p-5 border-t border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/30">
                  <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-400">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {autoLinkText(scenario.seoContent || scenario.description)}
                    </ReactMarkdown>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
      {/* Always show ads, even in embeds! */}
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
          
          {!isEmbed && <EmbedCodeWidget simulatorSlug={simulator.slug} />}
          <AdSlot position="mid" />
        </div>
      </div>

      {!isEmbed && permutation?.seoContent && (
        <div className="prose dark:prose-invert max-w-4xl mx-auto my-12 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-slate-800">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {autoLinkText(permutation.seoContent)}
          </ReactMarkdown>
        </div>
      )}

      {!isEmbed && (
        <div className="space-y-16">
          <FAQSection faqs={simulator.faqs} />
          <RelatedSimulators slugs={simulator.relatedSlugs} currentCategory={category.slug} />
        </div>
      )}
    </div>
  );
}
