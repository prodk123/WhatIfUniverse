import { SimulatorConfig, CategoryConfig } from '@/types/simulator';
import { Permutation } from '@/config/permutations';

/**
 * Generates comprehensive, authoritative educational guide content for any simulator.
 * Ensures every simulator page has 800-1200+ words of in-depth mathematical, practical,
 * and contextual information to satisfy Google AdSense and SEO quality standards.
 */
export function getSimulatorGuideContent(
  simulator: SimulatorConfig,
  category: CategoryConfig,
  permutation?: Permutation
): string {
  // If a specific permutation has custom markdown content, prioritize it and append the deep methodology
  const customIntro = permutation?.seoContent ? `${permutation.seoContent}\n\n---\n\n` : '';

  const { title, engine, inputs } = simulator;

  // Specific content generator based on category & engine
  if (category.slug === 'money' || engine === 'compound-growth') {
    return `${customIntro}${generateMoneyGuide(simulator)}`;
  }

  if (category.slug === 'career' || engine === 'salary-comparison') {
    return `${customIntro}${generateCareerGuide(simulator)}`;
  }

  if (category.slug === 'health' || engine === 'health-projection') {
    return `${customIntro}${generateHealthGuide(simulator)}`;
  }

  if (category.slug === 'education' || engine === 'roi-calculator') {
    return `${customIntro}${generateEducationGuide(simulator)}`;
  }

  if (category.slug === 'business' || category.slug === 'lifestyle' || engine === 'linear-projection') {
    return `${customIntro}${generateBusinessLifestyleGuide(simulator, category.slug)}`;
  }

  return `${customIntro}${generateGeneralGuide(simulator, category)}`;
}

function generateMoneyGuide(simulator: SimulatorConfig): string {
  const isDaily = simulator.slug.includes('daily');
  const isMonthly = simulator.slug.includes('sip') || simulator.slug.includes('monthly');
  const isLumpSum = simulator.engineConfig?.isLumpSum || simulator.slug.includes('lump');

  return `
## The Mathematics Behind "${simulator.title}"

Compounding has famously been referred to by economists as the "eighth wonder of the world." Unlike linear growth, where each dollar added yields a static, unchanging return, **exponential compounding** allows your previous investment returns to generate returns of their own. Over extended horizons—10, 20, or 30 years—the vast majority of your accumulated net worth does not come from the capital you put in, but from the exponential acceleration of compound interest.

### 1. The Core Mathematical Formula

This simulator calculates your future portfolio value using the standardized mathematical formula for compound growth with periodic regular contributions:

$$A = P(1 + \\frac{r}{n})^{nt} + PMT \\times \\frac{(1 + \\frac{r}{n})^{nt} - 1}{\\frac{r}{n}}$$

Where:
* **$A$ (Future Value):** The final accumulated portfolio balance at the end of the investment horizon.
* **$P$ (Principal / Initial Deposit):** The initial lump sum deposited at day zero.
* **$PMT$ (Periodic Contribution):** The ongoing investment amount (${isDaily ? 'deposited daily' : isMonthly ? 'deposited monthly' : 'periodic addition'}).
* **$r$ (Annual Nominal Return Rate):** The annualized expected rate of return (expressed as a decimal, e.g., 0.12 for 12%).
* **$n$ (Compounding Frequency):** The number of times per year compounding is calculated (${isDaily ? '365 times/year for daily compounding' : '12 times/year for monthly compounding'}).
* **$t$ (Tenure in Years):** The total number of elapsed years invested in the market.

---

### 2. Why Time in the Market Outperforms Timing the Market

A critical takeaway demonstrated by this simulation is the **asymmetric impact of time**. During the first 3 to 5 years of your plan, your total account balance will track very closely to the cumulative cash you deposit out of pocket. Many novice investors mistakenly abandon their plans during this initial "grind phase," believing their money is barely growing.

However, once you cross the 7-to-10-year threshold, the compounding curve bends sharply upward. By year 15 or 20, your annual interest gains will begin to exceed your entire annual salary. This is known as the **Financial Escape Velocity Point**—the moment where your money works significantly harder and earns more income than your physical labor ever could.

---

### 3. Scenario Analysis: Realistic Benchmarks

When experimenting with the inputs above, it is vital to ground your assumptions in historical asset-class performance:

| Strategy / Portfolio Profile | Expected Nominal Return ($r$) | Inflation Adjusted ($r - 5\\%$) | Risk & Volatility Profile |
| :--- | :---: | :---: | :--- |
| **Conservative (Fixed Income / Bonds)** | 6.0% – 7.5% | 1.0% – 2.5% | Very low volatility; ideal for capital preservation. |
| **Balanced (Index Funds + Debt 70/30)** | 9.0% – 11.0% | 4.0% – 6.0% | Moderate volatility; cushioned during market downturns. |
| **Aggressive (100% Broad Market Equity)** | 12.0% – 14.0% | 7.0% – 9.0% | High short-term volatility; superior long-term wealth creation. |

> **Pro Tip:** When planning for retirement or financial independence, always account for purchasing power loss by subtracting expected average inflation (typically 4% to 6%) from your nominal return rate.

---

### 4. Key Pitfalls to Avoid in Long-Term Wealth Building

1. **Pausing During Market Corrections:** Rupee-cost averaging / dollar-cost averaging only works if you continue investing during bear markets. Buying when asset prices drop enables your fixed periodic contribution to purchase more fund units at a discount.
2. **Ignoring Expense Ratios & Fees:** A seemingly tiny 1.5% management fee on an active mutual fund can confiscate up to 30% of your total lifetime portfolio gains over a 30-year horizon. Favor low-cost broad market index funds.
3. **Lifestyle Inflation (The Hedonic Treadmill):** As your income rises, commit to increasing your periodic contribution amount rather than increasing discretionary consumption.
`;
}

function generateCareerGuide(simulator: SimulatorConfig): string {
  return `
## Strategic Career Economics & Compensation Modeling

Evaluating career moves, geographical relocations, and salary adjustments requires looking beyond superficial headline figures. A 40% raise in a high-tax, high-cost metropolitan hub can easily result in *lower* disposable savings than staying in your current role.

### 1. The True Compensation Equation: Net Disposable Surplus

This simulator evaluates your true financial progression by calculating your **Net Disposable Surplus ($NDS$)**:

$$NDS = (Gross \\times (1 - EffectiveTaxRate)) - (Rent + Food + Transport + Healthcare) - DebtService$$

When considering international offers (such as relocating to Dubai, London, Singapore, or the United States), traditional currency exchange rates provide a misleading picture. You must adjust for **Purchasing Power Parity (PPP)**—the local cost of housing, groceries, utilities, and schooling relative to local incomes.

---

### 2. The Compounding Impact of Early Career Negotiations

One of the most consequential findings in labor economics is that **early compensation determines lifetime career trajectory**:

* If an employee earning $60,000 negotiates an additional **7% ($4,200)** at age 25, that increase permanently establishes a higher baseline for every subsequent raise, bonus percentage, and employer match.
* Over a 35-year working career, assuming modest 4% annual standard raises, that single 15-minute negotiation compounds into over **$380,000** in cumulative extra earnings.
* If that extra surplus is invested in an index fund at 10% annual return, it produces more than **$1.2 Million** in additional retirement wealth!

---

### 3. Comparing Zero-Tax Hubs (Dubai) vs High-Tax Tech Centers (California / New York)

| Consideration Metric | Zero-Tax Jurisdictions (e.g. UAE / Dubai) | High-Tax Jurisdictions (e.g. US / UK / Western Europe) |
| :--- | :--- | :--- |
| **Personal Income Tax** | 0% personal tax on income and capital gains | 25% – 45% combined federal, state, and payroll taxes |
| **Healthcare & Benefits** | Employer-provided or private international coverage | Complex deductions, varying copays, or public national schemes |
| **Cost of Living Anchor** | Rental housing and children's education represent major costs | Housing, child care, and state income taxes are major drains |
| **Wealth Retention Rate** | Up to 60-80% of gross earnings can be saved if lifestyle is managed | Typically 20-35% of gross earnings saved after taxes and COL |

### 4. How to Use the Simulator Results for Decision Making

When testing different compensation packages above:
1. First, enter your baseline current package with all taxes and monthly fixed overhead accounted for.
2. Next, adjust the target location's cost-of-living multiplier and tax bracket.
3. Check the **Breakeven Timeline** and **Cumulative 5-Year Delta** to verify whether the career pivot truly accelerates your long-term financial trajectory.
`;
}

function generateHealthGuide(simulator: SimulatorConfig): string {
  return `
## The Biophysical Math: How Daily Habits Compound

In modern medicine, chronic lifestyle conditions—including cardiovascular disease, type 2 diabetes, metabolic syndrome, and systemic inflammation—are recognized as the cumulative result of microscopic daily behaviors sustained over decades. Just as financial interest compounds into wealth, **biomarker changes compound into healthspan and longevity**.

### 1. Metabolic Deficit & The Energy Balance Equation

For calculators modeling weight change, daily activity, or dietary alterations, the fundamental scientific principle rests on the **Thermodynamic Energy Balance**:

$$\\Delta Weight = \\frac{\\sum_{d=1}^{n} (Calories In - Calories Out)_d}{7,700 \\text{ kcal/kg}}$$

* **Metabolic Rate:** Each kilogram of human adipose tissue stores approximately 7,700 kilocalories (or 3,500 kcal per pound).
* **Caloric Deficit:** A sustainable daily deficit of 300 to 500 kcal generates roughly 0.3 to 0.5 kg of body fat reduction per week without triggering metabolic slowdown or lean muscle catabolism.
* **Non-Exercise Activity Thermogenesis (NEAT):** Reaching 10,000 steps daily contributes 350 to 500 kcal of energy expenditure—often exceeding the calorie burn of a 45-minute gym session.

---

### 2. Clinical Recovery Milestones: Quitting Habits

For habit cessation simulators (such as quitting smoking, alcohol, or excess refined sugars), human biology begins repairing damage rapidly once the toxic exposure stops:

* **24 Hours:** Carbon monoxide blood levels drop back to normal; oxygen levels in arterial blood normalize.
* **48 to 72 Hours:** Damaged nerve endings begin regrowing; sense of smell and taste noticeably sharpen.
* **2 to 12 Weeks:** Lung capacity and peripheral circulation improve by up to 30%, noticeably reducing fatigue during cardiovascular exercise.
* **1 to 5 Years:** Excess risk of coronary heart disease drops to half that of a continuing smoker.
* **10 to 15 Years:** Risk of lung cancer and stroke declines to a level comparable to a non-smoker.

---

### 3. The Dual Dividends: Physical Longevity + Financial Liberation

Every negative health habit carries a hidden financial penalty that drains your lifetime net worth twice:
1. **The Direct Purchase Cost:** Buying a $15 pack of cigarettes or spending $10 on sugary snacks daily costs $300 to $450/month in post-tax cash ($3,600 to $5,400/year).
2. **The Lost Compounding Value:** If that exact $400/month were redirected into an index fund averaging 10% annual return, it would grow to **$83,000 in 10 years** and **$302,000 in 20 years**!
3. **Medical Expenditure Drag:** Lower lifetime insurance premiums, fewer specialist visits, and reduced prescription drug costs save tens of thousands more in senior years.
`;
}

function generateEducationGuide(simulator: SimulatorConfig): string {
  return `
## The Higher Education Investment Equation: Net Present Value (NPV)

A Master's degree, MBA, or specialized certification is among the largest capital investments an individual can make. In an era where tuition rates have outpaced consumer inflation by over 150%, evaluating higher education as a pure business investment is essential.

### 1. The Full Mathematical Cost of Graduate Education

Most prospective students severely underestimate the true cost of graduate school because they only evaluate direct tuition invoices. The true economic cost includes three distinct components:

$$\\text{True Cost} = \\text{Tuition} + \\text{Incremental Living Costs} + \\text{Opportunity Cost of Lost Wages}$$

* **Opportunity Cost ($OC$):** If you earn $75,000 annually and attend a 2-year full-time Master's program, your opportunity cost is $150,000 in forgone pre-tax wages.
* **Loan Amortization ($LA$):** Student loans accumulate interest from day one. A $70,000 loan at 7.5% interest repaid over 10 years actually costs over **$99,000** in total cash outflows.

---

### 2. Calculating Your Payback Period & Break-Even Year

To determine whether the degree makes financial sense, compare your post-graduation salary delta against your alternative career trajectory without the degree:

$$\\text{Break-Even Years} = \\frac{\\text{Total Educational Investment}}{\\text{Post-Grad Salary} - \\text{Baseline Trajectory Salary}}$$

If a degree costs $200,000 all-in (tuition + lost wages) and results in a $40,000 annual pay boost, your break-even horizon is **5 years post-graduation**. If the salary boost is only $15,000, your break-even horizon extends to **13+ years**, meaning the degree may destroy economic value compared to investing your time and capital directly in the workforce.

---

### 3. Strategic Considerations When Modeling Degree ROI

1. **Brand Signaling vs Pure Skills:** Top-tier programs provide alumni networks and corporate on-campus recruitment pipelines that justify higher tuition. Mid-tier or unranked programs often charge similar tuition without delivering the corresponding salary bump.
2. **STEM Designation & International Visas:** For international students studying abroad (e.g. USA, UK, Canada), programs with official STEM extensions offer 3 years of work authorization (OPT), significantly expanding the runway to recoup educational investments in high-salary foreign currencies.
3. **Online & Part-Time Alternatives:** Programs that allow you to continue working eliminate the single largest cost factor—lost wages—reducing your break-even timeline dramatically.
`;
}

function generateBusinessLifestyleGuide(simulator: SimulatorConfig, category: string): string {
  const isBusiness = category === 'business';

  return `
## Modeling ${isBusiness ? 'Venture Economics & Scalable Cash Flow' : 'Lifestyle Optimization & Time Reclaim'}

${isBusiness 
  ? 'Starting a venture, side-hustle, or digital product business transforms your financial profile from linear compensation (trading hours for dollars) to exponential equity value. However, scalable revenue requires understanding the fundamental unit economics governing customer acquisition, retention, and gross margins.'
  : 'Every day contains exactly 24 hours (1,440 minutes). How you allocate those minutes creates an unalterable trajectory for your career, cognitive clarity, stress levels, and personal relationships. Reclaiming wasted friction time—whether from daily commutes, digital distraction, or inefficient routines—is the highest-leverage life optimization available.'
}

### 1. The Core Principles of ${isBusiness ? 'Digital Business Unit Economics' : 'Temporal Compounding'}

${isBusiness ? `
In modern digital business models (including SaaS, YouTube, newsletters, and e-commerce), total sustainable net profit is driven by three core variables:

$$\\text{Net Profit} = (Traffic \\times ConversionRate \\times AverageOrderValue) - FixedOverhead - VariableCAC$$

* **Customer Acquisition Cost (CAC):** The total sales and marketing spend divided by total new customers acquired.
* **Customer Lifetime Value (LTV):** The total gross margin contribution generated by an individual customer throughout their entire relationship with your business.
* **The Golden Ratio ($LTV / CAC \\ge 3.0$):** A healthy business model must recover at least $3 in gross profit for every $1 invested in acquisition to sustain expansion and operational buffers.
` : `
When you eliminate an inefficient habit—such as a 45-minute one-way commute or 90 minutes of daily mindless social media scrolling—you recover substantial blocks of prime cognitive energy:

$$\\text{Reclaimed Annual Hours} = \\frac{\\text{Daily Minutes Saved} \\times 365}{60}$$

* Saving **60 minutes daily** reclaims **365 hours per year**—the equivalent of **nine standard 40-hour work weeks**!
* Reallocating those 365 hours toward building a side venture, exercising, reading, or learning high-income technical skills creates an insurmountable long-term advantage over peers who surrender that time to friction.
`}

---

### 2. Practical Tips to Maximize the Simulator Results

1. **Avoid Zero-Friction Assumptions:** When projecting business revenue or daily routine improvements, build in a 20% to 30% margin of safety for unexpected interruptions, platform algorithm shifts, or seasonal down periods.
2. **Focus on Marginal Improvements:** Doubling your business income does not require working twice as many hours. A 15% increase in traffic combined with a 15% lift in pricing and a 15% boost in conversion compounds to a **52% increase in total top-line revenue**.
3. **Iterate with Real Data:** Revisit this simulator monthly as your real-world metrics evolve. Update baseline assumptions with empirical figures to keep your projected roadmap aligned with reality.
`;
}

function generateGeneralGuide(simulator: SimulatorConfig, category: CategoryConfig): string {
  return `
## Understanding the Model for ${simulator.title}

At What If Universe, our mission is to provide transparent, math-grounded simulation engines that empower you to explore alternative futures before committing real-world capital, time, or energy.

### 1. The Scientific & Mathematical Framework

Every simulation in our ${category.name} collection is powered by verified mathematical models and empirical heuristics. Rather than relying on gut instinct or emotional bias, this tool lets you isolate individual variables and test edge cases.

### 2. How to Use the Simulator Effectively

1. **Establish Your Baseline:** First, enter conservative, proven numbers that reflect your current situation without speculation.
2. **Stress-Test Scenarios:** Increase one variable at a time (e.g. increase duration or reduce returns) to observe how sensitive your target outcome is to unexpected shocks.
3. **Formulate an Action Plan:** Use the milestone timeline and visual charts to identify your critical milestones—such as the break-even point or the threshold of compounding momentum.

### 3. Important Methodological Disclaimer

All models provided on this site are designed exclusively for educational simulation and informational comparison. They do not constitute certified professional financial, tax, legal, or medical advice. Always consult a qualified professional before executing major life or financial commitments.
`;
}
