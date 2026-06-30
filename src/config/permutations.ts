export interface Permutation {
  permutationSlug: string;
  title: string;
  description: string;
  h1: string;
  seoContent?: string;
  defaultOverrides: Record<string, number | string>;
}

export const simulatorPermutations: Record<string, Permutation[]> = {
  'start-sip-at-20': [
    {
      permutationSlug: 'what-is-sip',
      title: 'What is a SIP? | Systematic Investment Plan Calculator',
      description: 'Discover how Systematic Investment Plans (SIPs) work, understand Rupee Cost Averaging, and calculate your future wealth.',
      h1: 'What is a Systematic Investment Plan (SIP)?',
      seoContent: `
## Understanding SIPs
A **Systematic Investment Plan (SIP)** is a method of investing a fixed sum, regularly, in a mutual fund scheme. Instead of trying to time the market with a lump sum, you invest a small amount every month.

### The Power of Rupee Cost Averaging
The biggest advantage of a SIP is **Rupee Cost Averaging**. 
* When the market goes **down**, your fixed investment buys **more** units.
* When the market goes **up**, your fixed investment buys **fewer** units.
Over time, this averages out the cost of your investments and protects you from market crashes.

### The Power of Compounding
By starting early, even a small SIP of $5,000 per month can grow into Crores over 20-30 years due to the magic of compound interest.
      `,
      defaultOverrides: { monthlyInvestment: 5000, years: 20, expectedReturn: 12 }
    }
  ],
  'max-out-ppf': [
    {
      permutationSlug: 'what-is-ppf',
      title: 'What is Roth IRA? | Public Provident Fund Calculator',
      description: 'Learn about the Public Provident Fund (Roth IRA), its 15-year lock-in period, and calculate your tax-free returns.',
      h1: 'Public Provident Fund (Roth IRA) Explained',
      seoContent: `
## What is the Roth IRA?
The **Public Provident Fund (Roth IRA)** is a long-term, government-backed savings scheme in India. It comes with a mandatory 15-year lock-in period, making it ideal for retirement planning or children's education.

Like the EPF, the Roth IRA enjoys the coveted **EEE tax status**, meaning your deposits, interest, and maturity amount are entirely tax-free. The maximum you can invest in a Roth IRA account is $1.5 Lakhs per financial year.
      `,
      defaultOverrides: {}
    }
  ],
  'post-office-mis': [
    {
      permutationSlug: 'what-is-pomis',
      title: 'What is Post Office Bonds? | POMIS Calculator',
      description: 'Learn how the Post Office Monthly Income Scheme (POMIS) works, its interest rate, and calculate your monthly payouts.',
      h1: 'What is Post Office Bonds (POMIS)?',
      seoContent: `
## What is POMIS?
The **Post Office Monthly Income Scheme (POMIS)** is a government-backed savings scheme in India that allows you to invest a lump sum amount and earn a fixed interest rate, which is paid out to you every single month.

### Key Benefits
* **Guaranteed Returns:** Since it's backed by the Government of India, your capital is 100% secure.
* **Monthly Cash Flow:** It provides a reliable, fixed monthly income, making it highly popular among retirees.
* **Lock-in Period:** The scheme has a 5-year lock-in period, though premature withdrawal is allowed with a small penalty.

Use the calculator above to see exactly how much monthly income your lump sum deposit will generate.
      `,
      defaultOverrides: {}
    }
  ],
  'gold-bonds': [
    {
      permutationSlug: 'what-is-sgb',
      title: 'What are Sovereign Gold Bonds (Gold ETF)? | Gold ETF Calculator',
      description: 'Understand Sovereign Gold Bonds, how they offer 2.5% extra interest over physical gold, and their tax benefits.',
      h1: 'What are Sovereign Gold Bonds (Gold ETF)?',
      seoContent: `
## What are Sovereign Gold Bonds?
**Sovereign Gold Bonds (SGBs)** are government securities denominated in grams of gold. They are issued by the Reserve Bank of India (RBI) on behalf of the Government of India. They offer a superior alternative to holding physical gold.

### Why SGBs are Better Than Physical Gold
1. **Extra Interest:** You earn a fixed **2.5% annual interest** on the initial investment amount, paid semi-annually, on top of the capital appreciation of gold. Physical gold pays no interest.
2. **Zero Making Charges:** You don't pay the 10-15% making charges associated with gold jewelry.
3. **Tax-Free Capital Gains:** If you hold the bond until maturity (8 years), the capital gains tax on the gold appreciation is completely exempt.

Use the calculator above to compare the incredible ROI difference between buying physical gold vs investing in SGBs.
      `,
      defaultOverrides: {}
    }
  ],
  '15-15-15-rule': [
    {
      permutationSlug: 'what-is-15-15-15',
      title: '15x15x15 Mutual Fund Rule Calculator',
      description: 'See the magic of the 15x15x15 rule: Invest $15,000 per month for 15 years at 15% interest and become a Crorepati.',
      h1: '15x15x15 Rule Calculator',
      seoContent: `
## What is the 15x15x15 Rule?
The 15x15x15 rule is a famous thumb rule in personal finance for mutual fund investors. It states that if you invest **$15,000** per month, for **15 years**, at an expected return of **15%**, you will accumulate a corpus of over **$1 Crore**.

It is the perfect demonstration of the power of compounding. Use the calculator above—which we have pre-filled with the 15x15x15 numbers—to see how changing the years to 20 or 25 completely explodes your wealth.
      `,
      defaultOverrides: { rate: 15, years: 15, amount: 15000 }
    }
  ],
  'masters-in-usa': [
    {
      permutationSlug: 'stem-opt-roi',
      title: 'STEM OPT USA: What Is It & ROI Impact | ROI Calculator',
      description: 'Understand how the 3-year STEM OPT extension in the USA drastically impacts the ROI of your Master\'s degree.',
      h1: 'STEM OPT Extension ROI Calculator',
      seoContent: `
## What is STEM OPT?
**Optional Practical Training (OPT)** allows international students holding an F-1 visa to work in the United States for 12 months post-graduation. 

However, if your degree falls under the **STEM (Science, Technology, Engineering, Mathematics)** classification, you can apply for a **24-month extension**, giving you a total of **3 years** to work in the US without an H-1B work visa.

### The ROI Impact
The STEM OPT is the primary reason an MS in the USA is highly lucrative. Earning a US salary ($100k+) for 3 years allows you to easily pay off a $60k student loan, resulting in a massive positive ROI even if you return to your home country immediately after the OPT expires.
      `,
      defaultOverrides: {}
    }
  ],
  'drop-out': [
    {
      permutationSlug: 'opportunity-cost-degree',
      title: 'The Opportunity Cost of a College Degree | Dropout Calculator',
      description: 'Calculate the mathematical opportunity cost of attending college for 4 years versus entering the workforce immediately.',
      h1: 'Opportunity Cost of a College Degree',
      seoContent: `
## Understanding Opportunity Cost
When evaluating whether to go to college, most people only look at tuition. But the true cost is the **Opportunity Cost**: the income you forfeit by sitting in a classroom for 4 years instead of working.

If you could earn $40,000 a year straight out of high school, a 4-year degree costs you $160,000 in lost wages PLUS the cost of tuition. 

Does the college degree increase your lifetime earnings enough to make up for that massive initial deficit? Use the calculator above to find out.
      `,
      defaultOverrides: {}
    }
  ],
  'move-to-dubai': [
    {
      permutationSlug: 'purchasing-power-parity',
      title: 'Purchasing Power Parity (PPP): Dubai vs USA Salary Calculator',
      description: 'Understand Purchasing Power Parity (PPP) and how far your money actually goes in Dubai vs the United States.',
      h1: 'Purchasing Power Parity (PPP): Dubai vs USA',
      seoContent: `
## What is Purchasing Power Parity (PPP)?
**Purchasing Power Parity (PPP)** is an economic theory that compares different countries' currencies through a "basket of goods" approach. 

In simple terms: $100 in New York City buys you a lot less than $100 in Dubai. 

When comparing salaries internationally, you cannot just look at the exchange rate. You must compare how much housing, food, and lifestyle actually cost in the new city. The simulator above automatically factors in the cost of living and tax differences to give you your true PPP equivalent salary.
      `,
      defaultOverrides: {}
    },
    {
      permutationSlug: 'zero-tax-advantage',
      title: 'The Zero Tax Advantage: Dubai vs USA Salary Calculator',
      description: 'Calculate the mathematical advantage of living in a 0% income tax jurisdiction like Dubai compared to the USA.',
      h1: 'The Zero Tax Advantage: Dubai vs USA',
      seoContent: `
## The Power of 0% Income Tax
The United Arab Emirates (Dubai) levies a **0% personal income tax** on salaries. 

If you earn $150,000 in California, after federal, state, and payroll taxes, you might only take home $100,000. In Dubai, a $150,000 salary means you take home exactly $150,000.

This $50,000 delta, if invested annually into an index fund over 10 years, can result in over $750,000 in additional wealth simply by living in a zero-tax jurisdiction.
      `,
      defaultOverrides: {}
    }
  ],
  'quit-smoking': [
    {
      permutationSlug: 'pack-years-explained',
      title: 'What are "Pack-Years"? | Smoking Risk & Savings Calculator',
      description: 'Understand how doctors calculate your smoking risk using "Pack-Years" and calculate how much money you save by quitting.',
      h1: 'What are "Pack-Years"?',
      seoContent: `
## What is a Pack-Year?
A **pack-year** is a clinical quantification of cigarette smoking used to measure a person's exposure to tobacco. Doctors use this to assess your risk for lung cancer and other diseases.

### The Formula
**Pack-Years = (Packs smoked per day) × (Years as a smoker)**

If you smoked 1 pack a day for 10 years, that is 10 pack-years. If you smoked half a pack a day for 20 years, that is also 10 pack-years.

Use the calculator above to see not only your health recovery timeline but also the massive financial savings you generate the moment you quit.
      `,
      defaultOverrides: {}
    }
  ],
  'saas-startup': [
    {
      permutationSlug: 'what-is-bootstrapping',
      title: 'What is Bootstrapping? | Startup Funding Calculator',
      description: 'Understand the difference between bootstrapping a startup vs raising Venture Capital, and calculate founder equity.',
      h1: 'What is Bootstrapping in Startups?',
      seoContent: `
## What is Bootstrapping?
**Bootstrapping** means building a company entirely from personal finances or the operating revenues of the new company, without relying on outside investors like Venture Capitalists (VCs) or Angel Investors.

### Bootstrapping vs Venture Capital
* **Venture Capital:** You get a massive influx of cash to grow quickly, but you give up 15-30% of your company (equity) and lose total control.
* **Bootstrapping:** Growth is slower, but you retain 100% of the equity and decision-making power.

Use the simulator above to see how equity dilution from VC rounds affects your net worth in an eventual exit compared to staying bootstrapped.
      `,
      defaultOverrides: {}
    }
  ],
  'freelance-fulltime': [
    {
      permutationSlug: 'freelance-tax-deductions',
      title: 'Freelance Tax Deductions | Freelancer vs Salary Calculator',
      description: 'Learn how freelancers use business expenses and tax deductions to lower their taxable income compared to salaried employees.',
      h1: 'Freelance Tax Deductions Explained',
      seoContent: `
## The Secret Weapon of Freelancers
One of the biggest advantages of being a freelancer (or independent contractor) over a W-2 salaried employee is the ability to write off business expenses.

### Pre-Tax vs Post-Tax Spending
As an employee, you buy your laptop, internet, and office supplies with **post-tax** money. As a freelancer, these are business expenses purchased with **pre-tax** money, effectively lowering your total taxable income.

This means a $100,000 freelance income with $20,000 in valid deductions is only taxed on $80,000. Use the calculator above to compare the exact take-home pay of freelancing versus a traditional salary.
      `,
      defaultOverrides: {}
    }
  ]
};

export function getPermutationsForSimulator(baseSlug: string): Permutation[] {
  return simulatorPermutations[baseSlug] || [];
}

export function getPermutation(baseSlug: string, permutationSlug: string): Permutation | undefined {
  const perms = simulatorPermutations[baseSlug];
  if (!perms) return undefined;
  return perms.find(p => p.permutationSlug === permutationSlug);
}
